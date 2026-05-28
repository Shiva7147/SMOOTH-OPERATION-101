'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import GradientButton from '@/components/ui/GradientButton';
import type { User, UserRole } from '@/types';
import type { User as FirebaseUser } from 'firebase/auth';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  navLinks: Array<{ label: string; href: string }>;
  user: FirebaseUser | null;
  profile: User | null;
  signOut: () => Promise<void>;
}

export function MobileNav({
  open,
  onClose,
  navLinks,
  user,
  profile,
  signOut,
}: MobileNavProps) {
  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full w-[300px] bg-background border-l border-white/10 z-50 shadow-2xl p-6 flex flex-col justify-between md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-heading text-xl font-bold text-white">
                  Menu
                </span>
                <button
                  onClick={onClose}
                  className="p-2 text-muted-foreground hover:text-white rounded-lg hover:bg-white/5 transition-colors focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onClose}
                    className="text-lg font-medium text-muted-foreground hover:text-white py-2 border-b border-white/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Auth / Profile Area */}
            <div className="mt-auto pt-6 border-t border-white/10">
              {user ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-xl border border-white/5">
                    {profile?.photoURL || user.photoURL ? (
                      <img
                        src={profile?.photoURL || user.photoURL || ''}
                        alt="User Profile"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300 font-bold">
                        {profile?.name?.charAt(0) || user.displayName?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-white truncate">
                        {profile?.name || user.displayName || 'Smooth User'}
                      </span>
                      <span className="text-xs text-muted-foreground capitalize">
                        {profile?.role || 'user'}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={onClose}
                    className="flex items-center space-x-2 w-full p-3 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>

                  {profile?.role === 'admin' && (
                    <Link
                      href="/admin/dashboard"
                      onClick={onClose}
                      className="flex items-center space-x-2 w-full p-3 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                    >
                      <Settings size={18} />
                      <span>Admin Dashboard</span>
                    </Link>
                  )}

                  {profile?.role === 'reviewer' && (
                    <Link
                      href="/reviewer/dashboard"
                      onClick={onClose}
                      className="flex items-center space-x-2 w-full p-3 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                    >
                      <LayoutDashboard size={18} />
                      <span>Reviewer Dashboard</span>
                    </Link>
                  )}

                  <Link
                    href="/dashboard/settings"
                    onClick={onClose}
                    className="flex items-center space-x-2 w-full p-3 text-sm font-medium text-white/80 hover:text-white rounded-xl hover:bg-white/5 transition-all"
                  >
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>

                  <button
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="flex items-center space-x-2 w-full p-3 text-sm font-medium text-rose-400 hover:text-rose-300 rounded-xl hover:bg-rose-500/10 transition-all text-left"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/login"
                    onClick={onClose}
                    className="w-full text-center py-3 text-sm font-medium text-white border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    Sign In
                  </Link>
                  <GradientButton
                    href="/quiz"
                    onClick={onClose}
                    variant="primary"
                    fullWidth
                  >
                    Get My Smooth Score
                  </GradientButton>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileNav;
