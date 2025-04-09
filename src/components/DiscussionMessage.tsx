
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { TrashIcon, Flag } from "lucide-react";

interface DiscussionMessageProps {
  id: number;
  event: string;
  user: string;
  comment: string;
  timestamp: string;
  userRole: "admin" | "student" | "eventOrganizer";
  onDelete?: (id: number) => void;
  onFlag?: (id: number) => void;
}

const DiscussionMessage = ({
  id,
  event,
  user,
  comment,
  timestamp,
  userRole,
  onDelete,
  onFlag,
}: DiscussionMessageProps) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg">{event}</h3>
          <span className="text-sm text-gray-500">{timestamp}</span>
        </div>
        <p className="text-sm text-gray-600">Posted by: {user}</p>
      </CardHeader>
      <CardContent>
        <p>{comment}</p>
      </CardContent>
      {userRole === "admin" && (
        <CardFooter className="pt-0 flex justify-end gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete && onDelete(id)}
            className="flex items-center gap-1"
          >
            <TrashIcon size={16} />
            Delete
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onFlag && onFlag(id)}
            className="flex items-center gap-1"
          >
            <Flag size={16} />
            Flag
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default DiscussionMessage;
