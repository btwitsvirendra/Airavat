'use client';

import { MessageSquare, Search } from 'lucide-react';
import { useState } from 'react';

export default function MessagesPanel() {
  const [searchQuery, setSearchQuery] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'TechLight Industries',
      lastMessage: 'Thank you for your inquiry. We can provide...',
      time: '2h ago',
      unread: 2,
      avatar: 'TL',
    },
    {
      id: '2',
      name: 'Organic Farms Co',
      lastMessage: 'The shipment has been dispatched...',
      time: '5h ago',
      unread: 0,
      avatar: 'OF',
    },
    {
      id: '3',
      name: 'Textile Solutions Ltd',
      lastMessage: 'We have the fabric samples ready...',
      time: '1d ago',
      unread: 1,
      avatar: 'TS',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#03C4CB] focus:bg-white"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#03C4CB] to-[#04D4DD] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {conversation.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-semibold text-gray-900 truncate">{conversation.name}</h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{conversation.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-600 truncate flex-1">{conversation.lastMessage}</p>
                  {conversation.unread > 0 && (
                    <span className="bg-[#03C4CB] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {conversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No messages yet</p>
          </div>
        </div>
      )}
    </div>
  );
}

