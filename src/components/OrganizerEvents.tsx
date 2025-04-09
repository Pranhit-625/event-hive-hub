
import { useState } from 'react';
import { Edit, Trash, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
  status?: 'pending' | 'approved' | 'rejected';
}

interface OrganizerEventsProps {
  events: Event[];
  onCreateEvent: (event: Omit<Event, 'id'>) => void;
  onUpdateEvent: (event: Event) => void;
  onDeleteEvent: (id: number) => void;
}

const OrganizerEvents = ({ events, onCreateEvent, onUpdateEvent, onDeleteEvent }: OrganizerEventsProps) => {
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    date: "",
    title: "",
    location: "",
    startTime: "",
    endTime: "",
    status: "pending"
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleCreateEvent = () => {
    if (!newEvent.date || !newEvent.title || !newEvent.location || !newEvent.startTime || !newEvent.endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    onCreateEvent(newEvent);
    setNewEvent({
      date: "",
      title: "",
      location: "",
      startTime: "",
      endTime: "",
      status: "pending"
    });
    setIsOpen(false);
    toast.success("Event proposal submitted for approval");
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setNewEvent({
      date: event.date,
      title: event.title,
      location: event.location,
      startTime: event.startTime,
      endTime: event.endTime,
      status: "pending" // Reset to pending when edited
    });
    setIsOpen(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent) return;
    
    onUpdateEvent({ ...editingEvent, ...newEvent });
    setNewEvent({
      date: "",
      title: "",
      location: "",
      startTime: "",
      endTime: "",
      status: "pending"
    });
    setEditingEvent(null);
    setIsOpen(false);
    toast.success("Event updated and submitted for approval");
  };

  return (
    <>
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
              endTime: "",
              status: "pending"
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
            {editingEvent ? "Update Event Proposal" : "Create Event Proposal"}
          </Button>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="p-6 text-center bg-eventhub-gray rounded">
            <p className="text-lg">No events created yet. Create your first event!</p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-eventhub-gray p-6 rounded flex justify-between items-center">
              <div className="w-1/5">
                <p className="text-lg">{event.date}</p>
                <Button 
                  variant="outline" 
                  className="mt-2 bg-eventhub-yellow hover:bg-eventhub-yellow/90 text-black border-none"
                  onClick={() => handleEditEvent(event)}
                >
                  <Edit size={16} className="mr-2" /> Edit
                </Button>
              </div>
              <div className="w-2/5 text-center">
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-lg">{event.location}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 ${
                  event.status === 'approved' ? 'bg-green-200 text-green-800' : 
                  event.status === 'rejected' ? 'bg-red-200 text-red-800' : 
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {event.status || 'pending'}
                </span>
              </div>
              <div className="w-2/5 flex justify-between items-center">
                <p className="text-lg">{event.startTime} - {event.endTime}</p>
                <Button 
                  variant="outline" 
                  className="bg-eventhub-red hover:bg-eventhub-red/90 text-white border-none"
                  onClick={() => onDeleteEvent(event.id)}
                >
                  <Trash size={16} className="mr-2" /> Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OrganizerEvents;
