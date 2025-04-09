
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import StudentEvents from '../components/StudentEvents';
import OrganizerEvents from '../components/OrganizerEvents';
import AdminEvents from '../components/AdminEvents';
import { UserRole } from './Discussions';
import { toast } from 'sonner';

interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  status?: 'pending' | 'approved' | 'rejected';
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      date: "24-03-25",
      title: "Annual Cultural Fest",
      location: "OAT",
      startTime: "6:00 PM",
      endTime: "10:00 PM",
      status: "approved"
    },
    {
      id: 2,
      date: "12-04-25",
      title: "Technical Symposium",
      location: "Auditorium",
      startTime: "6:00 PM",
      endTime: "10:00 PM",
      status: "pending"
    }
  ]);

  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole") as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleCreateEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      id: events.length + 1,
      ...eventData,
      status: 'pending'
    };
    setEvents([...events, newEvent]);
  };

  const handleUpdateEvent = (updatedEvent: Event) => {
    // Mark as pending when updated
    const eventToUpdate: Event = { ...updatedEvent, status: 'pending' };
    const updatedEvents: Event[] = events.map(event => 
      event.id === eventToUpdate.id ? eventToUpdate : event
    );
    setEvents(updatedEvents);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success("Event deleted successfully");
  };

  const handleApproveEvent = (id: number) => {
    const updatedEvents: Event[] = events.map(event => 
      event.id === id ? { ...event, status: 'approved' } : event
    );
    setEvents(updatedEvents);
  };

  const handleRejectEvent = (id: number) => {
    const updatedEvents: Event[] = events.map(event => 
      event.id === id ? { ...event, status: 'rejected' } : event
    );
    setEvents(updatedEvents);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {userRole === UserRole.STUDENT && (
          <StudentEvents events={events} />
        )}
        
        {userRole === UserRole.EVENT_ORGANIZER && (
          <OrganizerEvents 
            events={events} 
            onCreateEvent={handleCreateEvent}
            onUpdateEvent={handleUpdateEvent}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
        
        {userRole === UserRole.ADMIN && (
          <AdminEvents 
            events={events} 
            onApproveEvent={handleApproveEvent} 
            onRejectEvent={handleRejectEvent} 
          />
        )}
      </div>
    </Layout>
  );
};

export default Events;
