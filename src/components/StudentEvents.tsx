
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Event {
  id: number;
  date: string;
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  status?: 'pending' | 'approved' | 'rejected';
}

interface StudentEventsProps {
  events: Event[];
}

const StudentEvents = ({ events }: StudentEventsProps) => {
  const navigate = useNavigate();

  // Filter to only show approved events to students
  const approvedEvents = events.filter(event => 
    event.status === 'approved' || event.status === undefined
  );

  return (
    <div className="space-y-6">
      {approvedEvents.length === 0 ? (
        <div className="p-6 text-center bg-eventhub-gray rounded">
          <p className="text-lg">No events available at the moment.</p>
        </div>
      ) : (
        approvedEvents.map((event) => (
          <div key={event.id} className="bg-eventhub-gray p-6 rounded flex justify-between items-center">
            <div className="w-1/5">
              <p className="text-lg">{event.date}</p>
            </div>
            <div className="w-2/5 text-center">
              <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
              <p className="text-lg">{event.location}</p>
            </div>
            <div className="w-2/5">
              <p className="text-lg">{event.startTime} - {event.endTime}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default StudentEvents;
