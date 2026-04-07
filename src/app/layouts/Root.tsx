import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BottomNav } from '../components/BottomNav';
import { Toaster } from 'sonner';

export function Root() {
  return (
    <div className="min-h-screen flex flex-col font-['Inter']">
      <Navbar />
      <main className="flex-1 pt-20 pb-32 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <Toaster position="top-right" richColors />
    </div>
  );
}
