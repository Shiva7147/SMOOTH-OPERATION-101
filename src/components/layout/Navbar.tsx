'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User as UserIcon, LogOut, LayoutDashboard, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import GradientButton from '@/components/ui/GradientButton';
import MobileNav from '@/components/layout/MobileNav';

export function Navbar() {
  const { user, profile, logout, isDemo } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Handle client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener to toggle glass backdrop state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page transition
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const toggleMobileNav = () => setMobileOpen(!mobileOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = async () => {
    await logout();
  };

  const navLinks = [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'About', href: '/about' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          scrolled
            ? 'glass py-4 shadow-lg border-b border-white/5'
            : 'bg-transparent py-6'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo & Demo Badge */}
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2.5 group select-none">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 group-hover:shadow-purple-500/35 transition-all duration-300">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 9C7 7.34 8.34 6 10 6H14C15.66 6 17 7.34 17 9V11C17 12.1 16.1 13 15 13H9C7.9 13 7 13.9 7 15V17C7 18.66 8.34 20 10 20H14C15.66 20 17 18.66 17 17"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-heading text-xl font-medium tracking-tight text-white/95 group-hover:text-white transition-colors">
                Smooth<span className="text-purple-400 font-black tracking-tight ml-0.5">Operator</span>
              </span>
            </Link>

            {mounted && isDemo && (
              <div className="flex items-center space-x-1 px-2.5 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-300 text-[9px] font-bold uppercase tracking-wider animate-pulse">
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                <span>Demo Mode</span>
              </div>
            )}
          </div>
 
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
 
          {/* Desktop CTA / Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {mounted && user ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 p-1 rounded-full border border-white/10 hover:border-white/20 bg-white/5 backdrop-blur-md transition-all focus:outline-none"
                >
                  {profile?.photoURL || user.photoURL ? (
                    <img
                      src={profile?.photoURL || user.photoURL || ''}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-300">
                      <UserIcon size={16} />
                    </div>
                  )}
                  <span className="text-sm font-medium pr-2 text-white/90">
                    {profile?.name || user.displayName || 'Profile'}
                  </span>
                </button>
 
                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 rounded-xl glass border border-white/10 p-2 shadow-2xl backdrop-blur-xl z-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        href="/dashboard"
                        className="flex items-center space-x-2 w-full p-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                      </Link>
                      {profile?.role === 'admin' && (
                        <Link
                          href="/admin/dashboard"
                          className="flex items-center space-x-2 w-full p-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <Settings size={16} />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      {profile?.role === 'reviewer' && (
                        <Link
                          href="/reviewer/dashboard"
                          className="flex items-center space-x-2 w-full p-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <LayoutDashboard size={16} />
                          <span>Reviewer Panel</span>
                        </Link>
                      )}
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center space-x-2 w-full p-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </Link>
                      <hr className="my-1 border-white/10" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full p-2 text-sm text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-white hover:text-purple-300 transition-colors"
                >
                  Sign In
                </Link>
                <GradientButton href="/signup" variant="primary" size="sm">
                  Get Started
                </GradientButton>
              </>
            )}
          </div>
 
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileNav}
              className="p-2 text-muted-foreground hover:text-white focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>
 
      {/* Mobile Nav Drawer */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        user={mounted ? user : null}
        profile={mounted ? profile : null}
        signOut={handleLogout}
      />
    </>
  );
}

export default Navbar;
