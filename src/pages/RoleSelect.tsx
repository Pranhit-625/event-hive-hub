
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRole } from "./Discussions";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Users, Shield } from "lucide-react";

const RoleSelect = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    localStorage.setItem("userRole", role);
    
    // Redirect based on role
    switch (role) {
      case UserRole.ADMIN:
        navigate("/admin-home");
        break;
      case UserRole.EVENT_ORGANIZER:
        navigate("/organizer-home");
        break;
      case UserRole.STUDENT:
      default:
        navigate("/student-home");
        break;
    }

    toast.success(`Logged in successfully as ${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F7] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-eventhub-purple">Select Your Role</CardTitle>
          <CardDescription>Choose how you want to access the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex justify-start p-6 hover:bg-gray-100"
              onClick={() => handleRoleSelect(UserRole.STUDENT)}
            >
              <User className="mr-4 h-6 w-6 text-blue-500" />
              <div className="text-left">
                <h3 className="font-medium">Student</h3>
                <p className="text-sm text-gray-500">Browse events and participate in discussions</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex justify-start p-6 hover:bg-gray-100"
              onClick={() => handleRoleSelect(UserRole.EVENT_ORGANIZER)}
            >
              <Users className="mr-4 h-6 w-6 text-green-500" />
              <div className="text-left">
                <h3 className="font-medium">Event Organizer</h3>
                <p className="text-sm text-gray-500">Create and manage campus events</p>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="h-20 flex justify-start p-6 hover:bg-gray-100"
              onClick={() => handleRoleSelect(UserRole.ADMIN)}
            >
              <Shield className="mr-4 h-6 w-6 text-red-500" />
              <div className="text-left">
                <h3 className="font-medium">Administrator</h3>
                <p className="text-sm text-gray-500">Oversee all platform activities</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleSelect;
