
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
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

interface AdminEventsProps {
  events: Event[];
  onApproveEvent: (id: number) => void;
  onRejectEvent: (id: number) => void;
}

const AdminEvents = ({ events, onApproveEvent, onRejectEvent }: AdminEventsProps) => {
  // Filter to show pending events first, then others
  const sortedEvents = [...events].sort((a, b) => {
    if ((a.status === 'pending' || !a.status) && (b.status !== 'pending' && b.status)) return -1;
    if ((a.status !== 'pending' && a.status) && (b.status === 'pending' || !b.status)) return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Event Proposals</h2>
      
      {sortedEvents.length === 0 ? (
        <div className="p-6 text-center bg-eventhub-gray rounded">
          <p className="text-lg">No event proposals to review.</p>
        </div>
      ) : (
        sortedEvents.map((event) => (
          <div key={event.id} className="bg-eventhub-gray p-6 rounded">
            <div className="flex justify-between items-center mb-4">
              <div className="w-1/5">
                <p className="text-lg">{event.date}</p>
              </div>
              <div className="w-2/5 text-center">
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-lg">{event.location}</p>
              </div>
              <div className="w-2/5 text-right">
                <p className="text-lg">{event.startTime} - {event.endTime}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  event.status === 'approved' ? 'bg-green-200 text-green-800' : 
                  event.status === 'rejected' ? 'bg-red-200 text-red-800' : 
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {event.status || 'pending'}
                </span>
              </div>
              
              {(event.status === 'pending' || !event.status) && (
                <div className="flex space-x-4">
                  <Button 
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() => {
                      onApproveEvent(event.id);
                      toast.success(`Event "${event.title}" approved`);
                    }}
                  >
                    <Check size={16} className="mr-2" /> Approve
                  </Button>
                  <Button 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => {
                      onRejectEvent(event.id);
                      toast.error(`Event "${event.title}" rejected`);
                    }}
                  >
                    <X size={16} className="mr-2" /> Reject
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminEvents;
