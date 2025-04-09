
import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AdminDiscussions from '../components/AdminDiscussions';
import StudentDiscussions from '../components/StudentDiscussions';
import EventOrganizerDiscussions from '../components/EventOrganizerDiscussions';

// Enum for user roles
export enum UserRole {
  ADMIN = "admin",
  STUDENT = "student",
  EVENT_ORGANIZER = "eventOrganizer"
}

const Discussions = () => {
  // In a real app, this would come from authentication context
  // For demo purposes, we'll use state to switch between roles
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);

  // For demo purposes: Allow switching roles using localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole as UserRole);
    }
  }, []);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  return (
    <Layout>
      {/* Role switcher for demonstration purposes */}
      <div className="max-w-4xl mx-auto mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="font-medium mb-2">Demo: Change User Role</p>
        <div className="flex space-x-4">
          <button
            onClick={() => handleRoleChange(UserRole.ADMIN)}
            className={`px-4 py-2 rounded ${userRole === UserRole.ADMIN ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Admin
          </button>
          <button
            onClick={() => handleRoleChange(UserRole.STUDENT)}
            className={`px-4 py-2 rounded ${userRole === UserRole.STUDENT ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Student
          </button>
          <button
            onClick={() => handleRoleChange(UserRole.EVENT_ORGANIZER)}
            className={`px-4 py-2 rounded ${userRole === UserRole.EVENT_ORGANIZER ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Event Organizer
          </button>
        </div>
      </div>
      
      {/* Render the appropriate component based on user role */}
      {userRole === UserRole.ADMIN && <AdminDiscussions />}
      {userRole === UserRole.STUDENT && <StudentDiscussions />}
      {userRole === UserRole.EVENT_ORGANIZER && <EventOrganizerDiscussions />}
    </Layout>
  );
};

export default Discussions;
