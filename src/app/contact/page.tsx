'use client';

import { useState, FormEvent } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import GradientButton from '@/components/ui/GradientButton';
import GlowOrb from '@/components/ui/GlowOrb';
import { saveContactMessage } from '@/lib/firestore';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('General question');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const reasons = [
    'General question',
    'User support',
    'Reviewer application',
    'Partnership',
    'Feedback',
    'Privacy/deletion request',
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    setErrorMsg(null);
    setLoading(true);
    try {
      await saveContactMessage({
        name,
        email,
        reason,
        message,
      });
      setSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      setErrorMsg('Failed to send message. Please try again or contact via email directly.');
      console.error('Contact submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f] text-foreground overflow-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative px-6 flex items-center justify-center">
        {/* Glow Decorators */}
        <GlowOrb color="purple" size={400} className="top-10 left-10 opacity-20" />
        <GlowOrb color="blue" size={350} className="bottom-10 right-10 opacity-20" />

        <div className="w-full max-w-[550px] relative z-10 flex flex-col space-y-8">
          
          {/* Header */}
          <div className="text-center flex flex-col space-y-2">
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              Get in Touch
            </h1>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Have questions, feedback, or need account support? Send us a message and we'll reply within 24 hours.
            </p>
          </div>

          {/* Form Card */}
          <GlassCard className="p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="font-heading text-xl font-bold text-white">
                  Message Sent!
                </h2>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Thanks for reaching out. We received your message and will review it shortly.
                </p>
                <GradientButton
                  onClick={() => setSubmitted(false)}
                  variant="secondary"
                  className="mt-4 px-6"
                >
                  Send Another Message
                </GradientButton>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                
                {errorMsg && (
                  <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl text-center leading-relaxed">
                    {errorMsg}
                  </div>
                )}

                {/* Name */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Rahul Sharma"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-sm"
                    disabled={loading}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul@example.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-sm"
                    disabled={loading}
                  />
                </div>

                {/* Reason Dropdown */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                    Reason for Contact
                  </label>
                  <select
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-sm py-3 px-4 focus:border-purple focus:outline-none cursor-pointer"
                    disabled={loading}
                  >
                    {reasons.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground ml-1 mb-1">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    required
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl text-sm py-3 px-4 focus:border-purple resize-none focus:outline-none"
                    disabled={loading}
                  />
                </div>

                {/* Submit Button */}
                <GradientButton
                  type="submit"
                  variant="primary"
                  fullWidth
                  loading={loading}
                  className="py-3 mt-2"
                >
                  Send Message
                </GradientButton>

              </form>
            )}
          </GlassCard>

          {/* Email fallback section */}
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Mail size={16} />
            <span>Or email us at:</span>
            <a
              href="mailto:smoothoperation.info@gmail.com"
              className="text-purple hover:underline hover:text-purple/80 transition-colors font-semibold"
            >
              smoothoperation.info@gmail.com
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
