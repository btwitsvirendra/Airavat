'use client';

import { useMemo, useState } from 'react';
import { Calendar, MapPin, PlayCircle, Video } from 'lucide-react';

const events = [
  {
    id: 'expo-mumbai',
    title: 'Airavat Global Manufacturing Expo',
    date: '12 Dec 2024',
    mode: 'In-person',
    location: 'NESCO, Mumbai',
    description: 'Meet 250+ machinery suppliers, book plant visits, and run on-spot RFQs with Airavat experts.',
  },
  {
    id: 'webinar-logistics',
    title: 'Cracking multimodal logistics for exports',
    date: '20 Nov 2024',
    mode: 'Virtual',
    location: 'Zoom Webinar',
    description: 'Logistics leads from DP World and Maersk share strategies to control freight costs for SMEs.',
  },
  {
    id: 'supplier-masterclass',
    title: 'Supplier masterclass: Winning RFQs in 2025',
    date: '6 Jan 2025',
    mode: 'Hybrid',
    location: 'Bengaluru + Live stream',
    description: 'Airavat supplier success coaches break down winning proposals, negotiation tactics, and product positioning.',
  },
];

const filters = ['All', 'In-person', 'Virtual', 'Hybrid'];

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return events;
    return events.filter((event) => event.mode === activeFilter);
  }, [activeFilter]);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-regal-blue-900 mb-2">Events & Webinars</h1>
          <p className="text-gray-600">
            Join Airavat community sessions to sharpen your sourcing playbooks, network with suppliers, and learn from industry veterans.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                activeFilter === filter ? 'bg-teal-500 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-teal-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <article key={event.id} className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-regal-blue-900">{event.title}</h2>
                  <p className="mt-2 text-sm text-gray-600">{event.description}</p>
                </div>
                <div className="flex flex-col items-start gap-2 md:items-end">
                  <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                    {event.mode === 'Virtual' ? <Video size={16} /> : <Calendar size={16} />} {event.mode}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} /> {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin size={16} /> {event.location}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <button className="btn-primary text-sm">Reserve seat</button>
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:border-teal-300 hover:text-teal-600">
                  <PlayCircle size={16} /> View agenda
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
