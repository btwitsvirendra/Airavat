'use client';

import { useState } from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface WorkInProgressProps {
  title: string;
  description: string;
  suggestions?: string[];
  ctaLabel?: string;
}

export default function WorkInProgress({
  title,
  description,
  suggestions = [],
  ctaLabel = 'Notify me when this launches',
}: WorkInProgressProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error('Enter your email so we can keep you posted.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('Thanks! We will alert you as soon as this section goes live.');
      setEmail('');
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="max-w-3xl w-full px-6 py-16 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <Sparkles size={28} />
        </div>
        <h1 className="text-4xl font-bold text-regal-blue-900 mb-4">{title}</h1>
        <p className="text-lg text-gray-600 mb-8">{description}</p>

        {suggestions.length > 0 && (
          <div className="mb-8 rounded-2xl border border-gray-100 bg-gray-50 p-6 text-left">
            <p className="mb-4 text-sm font-semibold text-regal-blue-800 uppercase tracking-[0.2em]">
              Meanwhile, you can
            </p>
            <ul className="space-y-3 text-gray-600">
              {suggestions.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight size={18} className="mt-1 text-teal-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-md flex-col gap-3 rounded-2xl border border-teal-100 bg-white p-5 shadow-lg"
        >
          <label className="text-left text-sm font-medium text-gray-700">Get early access updates</label>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <Mail size={18} className="text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@business.com"
              className="flex-1 bg-transparent text-sm outline-none"
              aria-label="Email"
            />
          </div>
          <button
            type="submit"
            className="btn-primary flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : ctaLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
