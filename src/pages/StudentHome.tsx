
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, MessageSquare, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StudentHome = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eventhub-purple mb-8">Welcome, Student!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <CalendarDays className="mr-2 h-5 w-5 text-blue-500" />
                Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Browse upcoming events and activities on campus
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/events")}
              >
                View Events
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                Discussions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Join conversations about events and activities
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/discussions")}
              >
                Join Discussions
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <ThumbsUp className="mr-2 h-5 w-5 text-amber-500" />
                Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Provide ratings and feedback for events you attended
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/feedback")}
              >
                Give Feedback
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-500" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Connect with other students and event organizers
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/discussions")}
              >
                View Community
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default StudentHome;
