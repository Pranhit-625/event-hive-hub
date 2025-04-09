
import { useState } from "react";
import DiscussionMessage from "./DiscussionMessage";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: number;
  event: string;
  user: string;
  comment: string;
  timestamp: string;
  flagged?: boolean;
  flagReason?: string;
}

const AdminDiscussions = () => {
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
    },
    {
      id: 3,
      event: "Music Night",
      user: "Mike Ross",
      comment: "This is a terrible event!",
      timestamp: "2025-03-26 16:45",
      flagged: true,
      flagReason: "Inappropriate Language"
    }
  ]);

  const handleDelete = (id: number) => {
    setMessages(messages.filter(message => message.id !== id));
    toast.success("Message deleted successfully");
  };

  const handleFlag = (id: number) => {
    setMessages(messages.map(message => 
      message.id === id 
        ? { ...message, flagged: !message.flagged } 
        : message
    ));
    toast.success("Message flag status updated");
  };

  const regularMessages = messages.filter(message => !message.flagged);
  const flaggedMessages = messages.filter(message => message.flagged);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Discussion Management</h1>
      
      <Tabs defaultValue="all">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="all" className="flex-1">All Discussions</TabsTrigger>
          <TabsTrigger value="flagged" className="flex-1">Flagged Comments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="p-3 text-left border">Event</th>
                    <th className="p-3 text-left border">User</th>
                    <th className="p-3 text-left border">Comment</th>
                    <th className="p-3 text-left border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {regularMessages.map((message) => (
                    <tr key={message.id} className="border-b">
                      <td className="p-3 border">{message.event}</td>
                      <td className="p-3 border">{message.user}</td>
                      <td className="p-3 border">{message.comment}</td>
                      <td className="p-3 border">
                        <div className="flex gap-2">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(message.id)}
                          >
                            Delete
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleFlag(message.id)}
                          >
                            Flag
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="flagged">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-red-100">
                    <th className="p-3 text-left border">Event</th>
                    <th className="p-3 text-left border">User</th>
                    <th className="p-3 text-left border">Comment</th>
                    <th className="p-3 text-left border">Reason</th>
                    <th className="p-3 text-left border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {flaggedMessages.map((message) => (
                    <tr key={message.id} className="border-b">
                      <td className="p-3 border">{message.event}</td>
                      <td className="p-3 border">{message.user}</td>
                      <td className="p-3 border">{message.comment}</td>
                      <td className="p-3 border">{message.flagReason || "Flagged"}</td>
                      <td className="p-3 border">
                        <div className="flex gap-2">
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDelete(message.id)}
                          >
                            Delete
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleFlag(message.id)}
                          >
                            Unflag
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDiscussions;
