'use client';

import { useState } from 'react';
import { Building2, Globe2, Mail, MapPin, Phone, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function SupplierRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    contactName: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    location: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    toast.success('Supplier application received! Our onboarding team will reach out within 24 hours.');
    setTimeout(() => {
      router.push('/supplier/login');
    }, 800);
  };

  return (
    <div className="gradient-hero min-h-screen py-16">
      <div className="max-w-4xl mx-auto bg-white/95 rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-regal-blue-900 mb-3">Become an Airavat supplier</h1>
        <p className="text-gray-600 mb-10">
          Showcase your manufacturing strengths to thousands of Indian buyers. Complete this quick application to unlock catalog tools, RFQ alerts, and trade services.
        </p>
        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Contact name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Full name"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Business email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Phone number</label>
            <div className="relative">
              <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 90000 00000"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Company name</label>
            <div className="relative">
              <Building2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Business legal name"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Website / catalog link</label>
            <div className="relative">
              <Globe2 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Primary production location</label>
            <div className="relative">
              <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
                className="input-field pl-10"
                required
              />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-4 rounded-2xl bg-teal-50 p-6 text-sm text-teal-900">
            <p className="font-semibold">What happens next?</p>
            <ol className="list-decimal space-y-2 pl-4">
              <li>Airavat onboarding expert reviews your application within 24 hours.</li>
              <li>We schedule a video verification and product catalog audit.</li>
              <li>Publish your storefront and start receiving RFQ alerts instantly.</li>
            </ol>
          </div>

          <button type="submit" className="md:col-span-2 btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit application'}
          </button>
        </form>
      </div>
    </div>
  );
}
