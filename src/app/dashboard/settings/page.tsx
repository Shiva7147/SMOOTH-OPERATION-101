'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { updateUserProfile, saveContactMessage } from '@/lib/firestore';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { User, Phone, MapPin, Mail, ShieldAlert, LogOut, CheckCircle2, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { user, profile, isDemo } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Deletion state
  const [deleting, setDeleting] = useState(false);
  const [deleteRequested, setDeleteRequested] = useState(false);

  // Initialize fields
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setPhone(profile.phone || '');
      setCity(profile.city || '');
    } else if (user) {
      setName(user.displayName || '');
      setPhone(user.phoneNumber || '');
      setCity('');
    }
  }, [profile, user]);

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setErrorMsg(null);
    setSuccess(false);
    setLoading(true);

    try {
      if (isDemo) {
        await new Promise((r) => setTimeout(r, 800));
        setErrorMsg('Settings cannot be saved in Demo Mode. Please create an account to customize your profile.');
      } else {
        // Save in Firestore users collection
        await updateUserProfile(user.uid, {
          name,
          phone,
          city,
        });

        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Settings save error:', err);
      setErrorMsg('Failed to update profile details.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    if (!user) return;

    if (isDemo) {
      alert('Account deletion is not applicable in Demo Mode.');
      return;
    }

    const confirmDelete = window.confirm(
      'Are you sure you want to request data deletion? This will wipe your profile audits, messages, and files permanently within 48 hours.'
    );
    if (!confirmDelete) return;

    setDeleting(true);
    try {
      // Submit a contact deletion request to contact_messages
      await saveContactMessage({
        name: profile?.name || user.displayName || 'Smooth User',
        email: user.email || 'deleted@smoothoperator.com',
        reason: 'Privacy/deletion request',
        message: `DELETION REQUEST: Please delete all data and details relating to User UID: ${user.uid}`,
      });
      setDeleteRequested(true);
    } catch (err) {
      console.error('Deletion request error:', err);
      alert('Failed to request deletion. Please email support directly.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8 max-w-2xl mx-auto text-left">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          Account Settings
          {isDemo && (
            <span className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-300 border border-amber-500/25 rounded-md font-semibold uppercase tracking-wider">
              Demo Mode
            </span>
          )}
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm">
          Update your profile context, review your subscription billing tier, or manage data.
        </p>
      </div>

      {isDemo && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-center text-xs text-amber-300 font-semibold flex items-center justify-center gap-2">
          <Sparkles size={14} />
          <span>You are exploring settings in Demo Mode. To save your information, please <Link href="/signup" className="underline hover:text-white">Sign Up</Link>.</span>
        </div>
      )}

      <div className="flex flex-col space-y-6">
        
        {/* Profile Card */}
        <GlassCard className="p-6 md:p-8 rounded-3xl border-white/5 flex flex-col space-y-6">
          <h2 className="font-heading text-lg font-bold text-white flex items-center space-x-2">
            <User size={18} className="text-purple-300" />
            <span>Profile Details</span>
          </h2>

          <form onSubmit={handleProfileSave} className="flex flex-col space-y-4">
            
            {success && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs rounded-xl text-center leading-relaxed flex items-center justify-center space-x-1.5">
                <CheckCircle2 size={16} />
                <span>Profile updated successfully!</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center leading-relaxed">
                {errorMsg}
              </div>
            )}

            {/* Name */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                Display Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Rahul Sharma"
                  required
                  className="w-full pl-10 bg-white/5 border border-white/10 rounded-xl text-sm"
                  disabled={loading}
                />
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Email (Read-only) */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                Email Address (Linked)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={user?.email || 'N/A'}
                  disabled
                  className="w-full pl-10 bg-white/[0.02] border border-white/5 rounded-xl text-sm text-muted-foreground cursor-not-allowed"
                />
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Phone */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 99999 99999"
                  className="w-full pl-10 bg-white/5 border border-white/10 rounded-xl text-sm"
                  disabled={loading}
                />
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                City / Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Mumbai, India"
                  className="w-full pl-10 bg-white/5 border border-white/10 rounded-xl text-sm"
                  disabled={loading}
                />
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Submit */}
            <GradientButton
              type="submit"
              variant="primary"
              loading={loading}
              className="py-3 self-end"
            >
              Save Profile Changes
            </GradientButton>

          </form>
        </GlassCard>

        {/* Plan Info Card */}
        <GlassCard className="p-6 md:p-8 rounded-3xl border-white/5 flex flex-col space-y-4">
          <h2 className="font-heading text-lg font-bold text-white flex items-center space-x-2">
            <User size={18} className="text-purple-300" />
            <span>Active Billing Tier</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">
                First Impression Review Plan
              </span>
              <span className="text-xs text-muted-foreground">
                Renews automatically. ₹399/month.
              </span>
            </div>
            <GradientButton href="/pricing" variant="outline" size="sm" className="whitespace-nowrap">
              Manage / Upgrade
            </GradientButton>
          </div>
        </GlassCard>

        {/* Privacy & Danger Card */}
        <GlassCard className="p-6 md:p-8 rounded-3xl border-white/5 flex flex-col space-y-4">
          <h2 className="font-heading text-lg font-bold text-rose-300 flex items-center space-x-2">
            <ShieldAlert size={18} className="text-rose-400" />
            <span>Data Management & Deletion</span>
          </h2>
          <p className="text-muted-foreground text-xs leading-relaxed">
            By clicking "Request Account Deletion", we will submit a deletion request. All your uploaded images, chat records, quiz scores, and reviews will be permanently purged from our databases within 48 hours.
          </p>
          
          {deleteRequested ? (
            <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center font-bold">
              ✓ Deletion Request Submitted successfully.
            </div>
          ) : (
            <button
              onClick={handleDeleteRequest}
              disabled={deleting}
              className="w-full sm:w-auto text-center py-2.5 px-6 border border-rose-500/20 hover:border-rose-500/30 bg-rose-500/5 hover:bg-rose-500/10 text-rose-400 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50 self-start cursor-pointer focus:outline-none"
            >
              {deleting ? 'Submitting...' : 'Request Account Deletion'}
            </button>
          )}
        </GlassCard>

      </div>
    </div>
  );
}
