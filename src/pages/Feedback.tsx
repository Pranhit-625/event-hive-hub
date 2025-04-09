
import Layout from '../components/Layout';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { UserRole } from './Discussions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, StarHalf } from 'lucide-react';

interface FeedbackItem {
  id: number;
  eventId: number;
  eventTitle: string;
  comment: string;
  rating: number;
  studentName: string;
  createdAt: string;
}

interface EventRating {
  eventId: number;
  eventTitle: string;
  averageRating: number;
  totalFeedbacks: number;
}

const Feedback = () => {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);
  const [feedback, setFeedback] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [events, setEvents] = useState<Array<{id: number, title: string}>>([
    { id: 1, title: "Annual Cultural Fest" },
    { id: 2, title: "Technical Symposium" }
  ]);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([
    {
      id: 1,
      eventId: 1,
      eventTitle: "Annual Cultural Fest",
      comment: "It was a fantastic event with great performances!",
      rating: 5,
      studentName: "Alice Johnson",
      createdAt: "2025-03-26"
    },
    {
      id: 2,
      eventId: 1,
      eventTitle: "Annual Cultural Fest",
      comment: "Enjoyed most of the performances, but timing was an issue.",
      rating: 4,
      studentName: "Bob Smith",
      createdAt: "2025-03-25"
    },
    {
      id: 3,
      eventId: 2,
      eventTitle: "Technical Symposium",
      comment: "Very informative sessions and great networking opportunities.",
      rating: 4.5,
      studentName: "Claire Davis",
      createdAt: "2025-03-26"
    }
  ]);

  useEffect(() => {
    // Get user role from localStorage
    const storedRole = localStorage.getItem("userRole") as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) {
      toast.error('Please enter your feedback');
      return;
    }
    
    if (selectedRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    
    if (selectedEvent === null) {
      toast.error('Please select an event');
      return;
    }
    
    // Add new feedback to the list
    const eventTitle = events.find(e => e.id === selectedEvent)?.title || '';
    const newFeedback: FeedbackItem = {
      id: feedbacks.length + 1,
      eventId: selectedEvent,
      eventTitle,
      comment: feedback,
      rating: selectedRating,
      studentName: "Current User",
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setFeedbacks([...feedbacks, newFeedback]);
    toast.success('Thank you for your feedback!');
    setFeedback('');
    setSelectedRating(0);
    setSelectedEvent(null);
  };

  // Calculate average ratings for each event
  const eventRatings: EventRating[] = events.map(event => {
    const eventFeedbacks = feedbacks.filter(f => f.eventId === event.id);
    const totalRating = eventFeedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    const averageRating = eventFeedbacks.length > 0 ? totalRating / eventFeedbacks.length : 0;
    
    return {
      eventId: event.id,
      eventTitle: event.title,
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalFeedbacks: eventFeedbacks.length
    };
  });

  // Filter feedbacks for event organizers (in a real app, would filter by organizer's events)
  const organizerEvents = [1]; // Assuming the organizer created event with id 1
  const organizerFeedbacks = feedbacks.filter(f => organizerEvents.includes(f.eventId));
  const organizerEventRatings = eventRatings.filter(r => organizerEvents.includes(r.eventId));

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="fill-yellow-400 stroke-yellow-400 h-5 w-5" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="fill-yellow-400 stroke-yellow-400 h-5 w-5" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="stroke-gray-300 h-5 w-5" />);
    }
    
    return <div className="flex">{stars}</div>;
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Feedback</h1>
        
        {userRole === UserRole.STUDENT && (
          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Share Your Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Select Event</label>
                    <select 
                      className="w-full rounded-md border border-gray-300 p-2"
                      value={selectedEvent || ''}
                      onChange={(e) => setSelectedEvent(Number(e.target.value))}
                    >
                      <option value="">-- Select an event --</option>
                      {events.map(event => (
                        <option key={event.id} value={event.id}>{event.title}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex space-x-2">
                      {[1, 2, 3, 4, 5].map(rating => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setSelectedRating(rating)}
                          className="p-1 focus:outline-none"
                        >
                          <Star 
                            className={`h-8 w-8 ${selectedRating >= rating ? 'fill-yellow-400 stroke-yellow-400' : 'stroke-gray-300'}`} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Comments
                    </label>
                    <Textarea
                      placeholder="Share your thoughts about the event..."
                      className="min-h-[150px]"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Feedback</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
        
        {userRole === UserRole.EVENT_ORGANIZER && (
          <div>
            <Tabs defaultValue="ratings">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="ratings" className="flex-1">Event Ratings</TabsTrigger>
                <TabsTrigger value="comments" className="flex-1">Feedback Comments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ratings">
                <div className="grid gap-4">
                  {organizerEventRatings.map(event => (
                    <Card key={event.eventId}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">{event.eventTitle}</h3>
                          <div className="flex items-center">
                            <span className="font-bold text-xl mr-2">{event.averageRating}</span>
                            {renderStars(event.averageRating)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Based on {event.totalFeedbacks} {event.totalFeedbacks === 1 ? 'review' : 'reviews'}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="comments">
                <div className="grid gap-4">
                  {organizerFeedbacks.map(feedback => (
                    <Card key={feedback.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{feedback.eventTitle}</h3>
                          <div className="flex items-center">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                        <p className="mb-2">{feedback.comment}</p>
                        <div className="text-sm text-gray-500 flex justify-between">
                          <span>{feedback.studentName}</span>
                          <span>{feedback.createdAt}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {userRole === UserRole.ADMIN && (
          <div>
            <Tabs defaultValue="all-ratings">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="all-ratings" className="flex-1">Event Ratings Summary</TabsTrigger>
                <TabsTrigger value="all-feedbacks" className="flex-1">All Feedbacks</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all-ratings">
                <div className="overflow-hidden rounded-lg border">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Event</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Average Rating</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total Reviews</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {eventRatings.map(event => (
                        <tr key={event.eventId} className="bg-white">
                          <td className="px-4 py-3 text-sm">{event.eventTitle}</td>
                          <td className="px-4 py-3 text-sm flex items-center">
                            <span className="font-bold mr-2">{event.averageRating}</span>
                            {renderStars(event.averageRating)}
                          </td>
                          <td className="px-4 py-3 text-sm">{event.totalFeedbacks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="all-feedbacks">
                <div className="grid gap-4">
                  {feedbacks.map(feedback => (
                    <Card key={feedback.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{feedback.eventTitle}</h3>
                          <div className="flex items-center">
                            {renderStars(feedback.rating)}
                          </div>
                        </div>
                        <p className="mb-2">{feedback.comment}</p>
                        <div className="text-sm text-gray-500 flex justify-between">
                          <span>{feedback.studentName}</span>
                          <span>{feedback.createdAt}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Feedback;
