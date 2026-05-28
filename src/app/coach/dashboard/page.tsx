'use client';

import GlassCard from '@/components/ui/GlassCard';
import Navbar from '@/components/layout/Navbar';
import { Calendar, User, Phone, Clipboard, CheckCircle2 } from 'lucide-react';

export default function CoachDashboardPage() {
  const sessions = [
    {
      id: 'session-1',
      clientName: 'Rahul Sharma',
      time: '28 May 2026, 4:00 PM',
      phone: '+91 98765 43210',
      topic: 'Introductory Consultation & Bio Audit',
      notes: 'Wants to optimizeShaadi.com profile. Needs to make first photo look more casual.',
    },
    {
      id: 'session-2',
      clientName: 'Aman Patel',
      time: '30 May 2026, 11:30 AM',
      phone: '+91 99887 76655',
      topic: 'Opener Games & Chat Rescue coaching',
      notes: 'Struggling with Tinder matches. Text replies fizzle out after 4-5 exchanges.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      {/* Header navbar for coach */}
      <div className="w-full py-6 px-6 bg-[#0f0f18] border-b border-white/5 flex items-center justify-between z-30">
        <span className="font-heading text-lg font-bold text-white">
          Smooth<span className="text-purple">Coach</span> Dashboard
        </span>
        <div className="text-xs font-semibold text-muted-foreground">
          Assigned Coach Profile: <span className="text-purple-300">Senior Dating Specialist</span>
        </div>
      </div>

      <main className="flex-grow max-w-4xl w-full mx-auto p-6 space-y-8 text-left">
        
        {/* Intro */}
        <div className="flex flex-col space-y-1">
          <h1 className="font-heading text-2xl font-extrabold text-white">
            Scheduled Coaching Sessions
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Conduct 1-on-1 private video calls. Set compatibility boundaries, evaluate text openers, and take session logs below.
          </p>
        </div>

        {/* Sessions list */}
        <div className="grid grid-cols-1 gap-6">
          {sessions.map((session) => (
            <GlassCard
              key={session.id}
              className="p-6 rounded-2xl border border-white/5 flex flex-col space-y-4 text-xs sm:text-sm text-left"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5 pb-3">
                <div className="flex items-center space-x-2">
                  <User size={18} className="text-purple-300" />
                  <span className="font-bold text-white text-sm sm:text-base">
                    {session.clientName}
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 text-muted-foreground font-semibold">
                  <Calendar size={14} />
                  <span>{session.time}</span>
                </div>
              </div>

              {/* Call details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground font-semibold">Coaching Topic:</span>
                  <span className="text-white/95 font-medium">{session.topic}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-muted-foreground font-semibold">Contact:</span>
                  <span className="text-white/95 flex items-center gap-1">
                    <Phone size={12} /> {session.phone}
                  </span>
                </div>
              </div>

              {/* Notes */}
              <div className="flex flex-col space-y-1 p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-muted-foreground font-bold flex items-center gap-1">
                  <Clipboard size={12} /> Prep Notes
                </span>
                <p className="text-white/80 leading-relaxed italic">
                  "{session.notes}"
                </p>
              </div>

              {/* Launch Call Button */}
              <button className="px-4 py-2 border border-purple-500/20 hover:border-purple-500/30 bg-purple-500/5 hover:bg-purple-500/10 text-purple-300 font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 self-start cursor-pointer focus:outline-none">
                <CheckCircle2 size={14} />
                <span>Launch Google Meet Session</span>
              </button>

            </GlassCard>
          ))}
        </div>

      </main>
    </div>
  );
}
