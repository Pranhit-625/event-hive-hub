
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RoleSelect from "./pages/RoleSelect";
import Events from "./pages/Events";
import Discussions from "./pages/Discussions";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";
import StudentHome from "./pages/StudentHome";
import OrganizerHome from "./pages/OrganizerHome";
import AdminHome from "./pages/AdminHome";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/student-home" element={<StudentHome />} />
          <Route path="/organizer-home" element={<OrganizerHome />} />
          <Route path="/admin-home" element={<AdminHome />} />
          <Route path="/events" element={<Events />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
