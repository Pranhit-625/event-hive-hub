
import Layout from '../components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, MessageSquare, BarChart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-eventhub-purple mb-8">Welcome, Admin!</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5 text-blue-500" />
                Event Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Review and approve event proposals
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/events")}
              >
                Manage Events
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                Moderate Discussions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Monitor and moderate user discussions
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/discussions")}
              >
                View Discussions
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-amber-500" />
                Feedback Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                View all feedback and event analytics
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/feedback")}
              >
                View Reports
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium flex items-center">
                <Users className="mr-2 h-5 w-5 text-purple-500" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Manage students and event organizers
              </p>
              <Button 
                variant="default" 
                className="w-full"
                onClick={() => navigate("/discussions")}
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
