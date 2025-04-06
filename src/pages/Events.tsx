
import { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      date: "24-03-25",
      title: "Event 1",
      location: "OAT",
      startTime: "6:00 PM",
      endTime: "10:00 PM"
    },
    {
      id: 2,
      date: "12-04-25",
      title: "Event 2",
      location: "Auditorium",
      startTime: "6:00 PM",
      endTime: "10:00 PM"
    }
  ]);

  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    date: "",
    title: "",
    location: "",
    startTime: "",
    endTime: ""
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleCreateEvent = () => {
    if (!newEvent.date || !newEvent.title || !newEvent.location || !newEvent.startTime || !newEvent.endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    const event = {
      id: events.length + 1,
      ...newEvent
    };

    setEvents([...events, event]);
    setNewEvent({
      date: "",
      title: "",
      location: "",
      startTime: "",
      endTime: ""
    });
    setIsOpen(false);
    toast.success("Event created successfully");
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      date: event.date,
      title: event.title,
      location: event.location,
      startTime: event.startTime,
      endTime: event.endTime
    });
    setIsOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    
    const updatedEvents = events.map(event => 
      event.id === editingEvent.id ? { ...event, ...newEvent } : event
    );
    
    setEvents(updatedEvents);
    setNewEvent({
      date: "",
      title: "",
      location: "",
      startTime: "",
      endTime: ""
    });
    setEditingEvent(null);
    setIsOpen(false);
    toast.success("Event updated successfully");
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast.success("Event deleted successfully");
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-eventhub-green p-6 rounded text-center mb-10">
          <Button 
            className="bg-transparent hover:bg-transparent text-black text-xl font-medium flex items-center gap-2"
            onClick={() => {
              setEditingEvent(null);
              setNewEvent({
                date: "",
                title: "",
                location: "",
                startTime: "",
                endTime: ""
              });
              setIsOpen(true);
            }}
          >
            <Plus size={24} /> Create New Event
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input
                  id="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="col-span-3"
                  placeholder="DD-MM-YY"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location" className="text-right">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startTime" className="text-right">Start Time</Label>
                <Input
                  id="startTime"
                  value={newEvent.startTime}
                  onChange={(e) => setNewEvent({...newEvent, startTime: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g. 6:00 PM"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endTime" className="text-right">End Time</Label>
                <Input
                  id="endTime"
                  value={newEvent.endTime}
                  onChange={(e) => setNewEvent({...newEvent, endTime: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g. 10:00 PM"
                />
              </div>
            </div>
            <Button onClick={editingEvent ? handleUpdateEvent : handleCreateEvent} className="w-full">
              {editingEvent ? "Update Event" : "Create Event"}
            </Button>
          </DialogContent>
        </Dialog>

        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="bg-eventhub-gray p-6 rounded flex justify-between items-center">
              <div className="w-1/5">
                <p className="text-lg">{event.date}</p>
                <Button 
                  variant="outline" 
                  className="mt-2 bg-eventhub-yellow hover:bg-eventhub-yellow/90 text-black border-none"
                  onClick={() => handleEditEvent(event)}
                >
                  Edit
                </Button>
              </div>
              <div className="w-2/5 text-center">
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-lg">{event.location}</p>
              </div>
              <div className="w-2/5 flex justify-between items-center">
                <p className="text-lg">{event.startTime} - {event.endTime}</p>
                <Button 
                  variant="outline" 
                  className="bg-eventhub-red hover:bg-eventhub-red/90 text-white border-none"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Events;
