
import { useLocation, Link } from 'react-router-dom';
import { User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-eventhub-dark text-white py-6 px-12">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-16">
          <Link to="/" className="relative">
            Home
            {isActive('/') && (
              <div className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white" />
            )}
          </Link>
          <Link to="/events" className="relative">
            Events
            {isActive('/events') && (
              <div className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white" />
            )}
          </Link>
          <Link to="/discussions" className="relative">
            Discussions
            {isActive('/discussions') && (
              <div className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white" />
            )}
          </Link>
          <Link to="/feedback" className="relative">
            Feedback
            {isActive('/feedback') && (
              <div className="absolute bottom-[-6px] left-0 w-full h-0.5 bg-white" />
            )}
          </Link>
        </div>
        <div>
          <User size={24} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
