import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { profileData } from '../../data/profile';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EASING } from '../../lib/animation';

interface FormData {
  name: string;
  email: string;
  topic: string;
  message: string;
  _gotcha: string;
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  topic: 'Internship',
  message: '',
  _gotcha: '',
};

export const ContactForm: React.FC = () => {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID;
  const prefersReduced = useReducedMotion();

  // If no Formspree ID is configured, hide form completely
  if (!formspreeId) {
    return null;
  }

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [cooldown, setCooldown] = useState<number>(0);
  const cooldownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    };
  }, []);

  const startCooldown = () => {
    setCooldown(10);
    if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
    cooldownTimerRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          if (cooldownTimerRef.current) clearInterval(cooldownTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!form.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!emailRegex.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) {
      errs.message = 'Please enter a message.';
    } else if (form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    } else if (form.message.length > 2000) {
      errs.message = 'Message cannot exceed 2000 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting' || cooldown > 0) return;

    if (!validate()) return;

    // Honeypot check
    if (form._gotcha) {
      // Fake success for bots
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.topic,
          message: form.message.trim(),
          _gotcha: form._gotcha,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        startCooldown();
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(
          data?.error ||
            `Unable to deliver message. You can reach out directly via ${profileData.email}`
        );
      }
    } catch {
      setStatus('error');
      setErrorMessage(
        `Network error. You can reach out directly via ${profileData.email}`
      );
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setErrors({});
    setErrorMessage('');
  };

  return (
    <div className="w-full mt-12 pt-12 border-t border-warm-border text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Short text */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-mono text-burnt-orange tracking-wider uppercase">
            Direct Inquiry
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-charcoal">
            Send a quick note.
          </h3>
          <p className="text-muted-grey text-sm leading-relaxed">
            Have a project in mind, want to discuss an internship, or just say hello?
            Fill out the form and I’ll get back to you promptly.
          </p>
          <div className="pt-2 text-xs font-mono text-muted-grey">
            Typically responds within 24 hours.
          </div>
        </div>

        {/* Right column: Form Card */}
        <div className="lg:col-span-7 bg-card-surface border border-warm-border rounded-lg p-6 sm:p-8 shadow-sm">
          {/* Live announcement region */}
          <div className="sr-only" role="status" aria-live="polite">
            {status === 'submitting' && 'Sending your message...'}
            {status === 'success' && 'Message sent successfully.'}
            {status === 'error' && `Error: ${errorMessage}`}
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <m.div
                key="success"
                initial={prefersReduced ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASING }}
                className="py-8 text-center space-y-4"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-charcoal">
                  Thanks, I'll get back to you!
                </h4>
                <p className="text-muted-grey text-sm max-w-md mx-auto">
                  Your note has been delivered. I appreciate you reaching out and will reply as soon as possible.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-mono font-medium text-burnt-orange hover:text-light-orange underline underline-offset-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 rounded"
                  >
                    Send another message
                  </button>
                </div>
              </m.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field for bot protection */}
                <input
                  type="text"
                  name="_gotcha"
                  value={form._gotcha}
                  onChange={(e) => setForm({ ...form, _gotcha: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-xs font-mono text-charcoal/80 mb-1.5"
                    >
                      Name <span className="text-burnt-orange">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      placeholder="Jane Doe"
                      className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-ivory text-charcoal rounded-[5px] border border-warm-border hover:border-burnt-orange/50 focus:border-burnt-orange focus:outline-none focus:ring-2 focus:ring-burnt-orange/30 transition-colors placeholder:text-muted-grey/60"
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-xs text-rose-500 font-mono">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-xs font-mono text-charcoal/80 mb-1.5"
                    >
                      Email <span className="text-burnt-orange">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="jane@example.com"
                      className="w-full min-h-[44px] px-3.5 py-2 text-sm bg-ivory text-charcoal rounded-[5px] border border-warm-border hover:border-burnt-orange/50 focus:border-burnt-orange focus:outline-none focus:ring-2 focus:ring-burnt-orange/30 transition-colors placeholder:text-muted-grey/60"
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-xs text-rose-500 font-mono">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Topic Select */}
                <div>
                  <label
                    htmlFor="form-topic"
                    className="block text-xs font-mono text-charcoal/80 mb-1.5"
                  >
                    What is this about?
                  </label>
                  <select
                    id="form-topic"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full min-h-[44px] px-3 py-2 text-sm bg-ivory text-charcoal rounded-[5px] border border-warm-border hover:border-burnt-orange/50 focus:border-burnt-orange focus:outline-none focus:ring-2 focus:ring-burnt-orange/30 transition-colors cursor-pointer"
                  >
                    <option value="Internship">Internship opportunity</option>
                    <option value="Full-time role">Full-time role</option>
                    <option value="Freelance project">Freelance project</option>
                    <option value="Just saying hi">Just saying hi</option>
                  </select>
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="form-message"
                      className="block text-xs font-mono text-charcoal/80"
                    >
                      Message <span className="text-burnt-orange">*</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono ${
                        form.message.length > 2000
                          ? 'text-rose-500 font-bold'
                          : 'text-muted-grey'
                      }`}
                      aria-live="polite"
                    >
                      {form.message.length} / 2000
                    </span>
                  </div>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    placeholder="Tell me about your idea, timeline, or opportunity..."
                    className="w-full px-3.5 py-2.5 text-sm bg-ivory text-charcoal rounded-[5px] border border-warm-border hover:border-burnt-orange/50 focus:border-burnt-orange focus:outline-none focus:ring-2 focus:ring-burnt-orange/30 transition-colors placeholder:text-muted-grey/60 resize-y min-h-[100px]"
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-xs text-rose-500 font-mono">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error Banner */}
                {status === 'error' && (
                  <div className="flex items-start gap-2 p-3 rounded bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <span>{errorMessage} </span>
                      <a
                        href={`mailto:${profileData.email}`}
                        className="underline font-mono"
                      >
                        {profileData.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={status === 'submitting' || cooldown > 0}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium text-[var(--on-accent)] bg-burnt-orange hover:bg-light-orange disabled:opacity-50 disabled:cursor-not-allowed rounded-[5px] shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-burnt-orange/50 active:scale-[0.99]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : cooldown > 0 ? (
                      <span>Wait {cooldown}s</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send message</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-muted-grey">
                    Encrypted submission
                  </span>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

