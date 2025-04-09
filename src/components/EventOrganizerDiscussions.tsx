
import { useState } from "react";
import DiscussionMessage from "./DiscussionMessage";
import DiscussionForm from "./DiscussionForm";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface Message {
  id: number;
  event: string;
  user: string;
  comment: string;
  timestamp: string;
}

const EventOrganizerDiscussions = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      event: "TechFest 2025",
      user: "John Doe",
      comment: "Looking forward to this event!",
      timestamp: "2025-03-24 14:30"
    },
    {
      id: 2,
      event: "AI Workshop",
      user: "Jane Smith",
      comment: "This sounds interesting!",
      timestamp: "2025-03-25 09:15"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmitMessage = (message: string) => {
    const newMessage = {
      id: messages.length + 1,
      event: "General Discussion",
      user: "Current Organizer", // In a real app, this would be the logged-in user
      comment: message,
      timestamp: new Date().toLocaleString()
    };

    setMessages([newMessage, ...messages]);
  };

  const filteredMessages = searchTerm 
    ? messages.filter(msg => 
        msg.event.toLowerCase().includes(searchTerm.toLowerCase()) || 
        msg.comment.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : messages;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Event Discussions</h1>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          type="text"
          placeholder="Search discussions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <DiscussionForm onSubmit={handleSubmitMessage} />
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Discussions</h2>
        
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message) => (
            <DiscussionMessage
              key={message.id}
              id={message.id}
              event={message.event}
              user={message.user}
              comment={message.comment}
              timestamp={message.timestamp}
              userRole="eventOrganizer"
            />
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No discussions found. Be the first to start a conversation!</p>
        )}
      </div>
    </div>
  );
};

export default EventOrganizerDiscussions;
