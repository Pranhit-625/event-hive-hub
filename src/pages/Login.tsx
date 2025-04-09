
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { UserRole } from "./Discussions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    // In a real app, you would authenticate the user here
    // For now, we'll just set the role and redirect
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

  const handleGoogleLogin = () => {
    // In a real app, you would implement Google authentication
    // For demo purposes, we'll just set the role and redirect
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

    toast.success(`Logged in with Google as ${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF7F7] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-eventhub-purple">Campus Event & Activity Hub</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password" 
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Select your role</Label>
              <RadioGroup 
                value={role} 
                onValueChange={(value) => setRole(value as UserRole)}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={UserRole.STUDENT} id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={UserRole.EVENT_ORGANIZER} id="organizer" />
                  <Label htmlFor="organizer">Event Organizer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={UserRole.ADMIN} id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            type="button" 
            className="w-full" 
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="mr-2 h-5 w-5" />
            Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
