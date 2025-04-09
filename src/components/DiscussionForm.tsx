
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface DiscussionFormProps {
  onSubmit: (message: string) => void;
}

const DiscussionForm = ({ onSubmit }: DiscussionFormProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    onSubmit(message);
    setMessage("");
    toast.success("Message posted successfully");
  };

  return (
    <Card className="mb-6">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h3 className="font-semibold text-lg">Post a Message</h3>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[100px]"
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Post Message</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default DiscussionForm;
