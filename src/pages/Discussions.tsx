
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
  const [userRole, setUserRole] = useState<UserRole>(UserRole.STUDENT);

  // Get user role from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      setUserRole(savedRole as UserRole);
    }
  }, []);

  return (
    <Layout>
      {/* Render the appropriate component based on user role */}
      {userRole === UserRole.ADMIN && <AdminDiscussions />}
      {userRole === UserRole.STUDENT && <StudentDiscussions />}
      {userRole === UserRole.EVENT_ORGANIZER && <EventOrganizerDiscussions />}
    </Layout>
  );
};

export default Discussions;
