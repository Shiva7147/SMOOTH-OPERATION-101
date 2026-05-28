'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  MessageSquare,
  Send,
  History,
  Settings,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import AuthGuard from '@/components/layout/AuthGuard';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, profile, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: <Home size={18} /> },
    { label: 'AI Chat', href: '/dashboard/chat', icon: <MessageSquare size={18} /> },
    { label: 'New Review', href: '/dashboard/review-request', icon: <Send size={18} /> },
    { label: 'Review History', href: '/dashboard/reviews', icon: <History size={18} /> },
    { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={18} /> },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between py-6 px-4">
      {/* Header Profile Info */}
      <div className="flex flex-col space-y-6">
        <Link href="/" className="px-2">
          <span className="font-heading text-xl font-bold text-white">
            Smooth<span className="gradient-text font-black">Operator</span>
          </span>
        </Link>

        {/* User Card */}
        <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-2xl border border-white/5">
          {profile?.photoURL || user?.photoURL ? (
            <img
              src={profile?.photoURL || user?.photoURL || ''}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple font-bold">
              {profile?.name?.charAt(0) || user?.displayName?.charAt(0) || 'U'}
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">
              {profile?.name || user?.displayName || 'Operator'}
            </span>
            <span className="text-[10px] text-muted-foreground capitalize">
              {profile?.role || 'user'}
            </span>
          </div>
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex flex-col space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative overflow-hidden ${
                  isActive
                    ? 'text-white bg-purple-500/10 border border-purple-500/25'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                {/* Active gradient slide bar */}
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-purple"
                    transition={{ type: 'spring', damping: 30, stiffness: 250 }}
                  />
                )}
                <span className={isActive ? 'text-purple' : 'text-inherit'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Footer Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium text-rose-400 hover:text-rose-300 rounded-xl hover:bg-rose-500/10 transition-colors text-left focus:outline-none"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#0a0a0f] text-foreground flex flex-col md:flex-row relative">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 h-screen sticky top-0 bg-[#0f0f18] border-r border-white/5">
          {sidebarContent}
        </aside>

        {/* Main Workspace Frame */}
        <div className="flex-grow flex flex-col min-h-screen">
          
          {/* Main Content Area */}
          <main className="flex-grow p-6 md:p-8 pb-24 md:pb-8 max-w-5xl w-full mx-auto">
            {children}
          </main>

          {/* Mobile Bottom Tab Bar */}
          <nav className="fixed bottom-0 left-0 w-full glass border-t border-white/10 px-4 py-2 flex items-center justify-around z-30 md:hidden shadow-2xl backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all relative ${
                    isActive ? 'text-purple' : 'text-muted-foreground'
                  }`}
                >
                  {item.icon}
                  <span className="text-[10px] mt-1 font-semibold">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
        </div>
      </div>
    </AuthGuard>
  );
}
