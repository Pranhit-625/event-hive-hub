
import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF7F7]">
      <Navbar />
      <main className="flex-1 container mx-auto py-8 px-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;
