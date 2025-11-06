'use client';

import { useState } from 'react';
import { Send, Paperclip, Phone, Video, MoreVertical, Search, ArrowLeft, CheckCheck } from 'lucide-react';

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');

  // Mock data
  const conversations = [
    {
      id: '1',
      supplier: {
        name: 'TechLight Industries',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
        online: true,
      },
      lastMessage: 'Yes, we can provide samples. Please share your delivery address.',
      timestamp: '10:30 AM',
      unread: 2,
    },
    {
      id: '2',
      supplier: {
        name: 'Textile Hub',
        avatar: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=100',
        online: false,
      },
      lastMessage: 'The minimum order quantity is 500 meters.',
      timestamp: 'Yesterday',
      unread: 0,
    },
    {
      id: '3',
      supplier: {
        name: 'MachineWorks Ltd',
        avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100',
        online: true,
      },
      lastMessage: 'Payment link has been generated.',
      timestamp: '2 days ago',
      unread: 0,
    },
  ];

  const messages = [
    {
      id: '1',
      senderId: 'buyer',
      message: 'Hi, I am interested in your Industrial LED Light 100W. Can you provide samples?',
      timestamp: '10:25 AM',
      read: true,
    },
    {
      id: '2',
      senderId: 'supplier',
      message: 'Hello! Thank you for your interest. Yes, we can provide samples.',
      timestamp: '10:27 AM',
      read: true,
    },
    {
      id: '3',
      senderId: 'supplier',
      message: 'Please share your delivery address and we will send you a quote including sample costs.',
      timestamp: '10:28 AM',
      read: true,
    },
    {
      id: '4',
      senderId: 'buyer',
      message: 'Address: 123 Industrial Area, Sector 18, Gurugram, Haryana - 122015',
      timestamp: '10:29 AM',
      read: true,
    },
    {
      id: '5',
      senderId: 'supplier',
      message: 'Perfect! Let me prepare a quote for you. Will share payment link shortly.',
      timestamp: '10:30 AM',
      read: false,
    },
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // Handle send message logic
      setMessageInput('');
    }
  };

  const activeConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div className="h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex h-full">
          {/* Conversations List */}
          <div className="w-full md:w-96 bg-white border-r flex flex-col">
            {/* Search Header */}
            <div className="p-4 border-b">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  className={`w-full p-4 flex gap-3 hover:bg-gray-50 transition ${
                    selectedConversation === conversation.id ? 'bg-teal-50 border-l-4 border-teal-600' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={conversation.supplier.avatar}
                      alt={conversation.supplier.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.supplier.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-800">{conversation.supplier.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <span className="ml-2 bg-teal-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          {selectedConversation && activeConversation ? (
            <div className="flex-1 flex flex-col bg-white">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="md:hidden">
                    <ArrowLeft size={24} />
                  </button>
                  <img
                    src={activeConversation.supplier.avatar}
                    alt={activeConversation.supplier.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">{activeConversation.supplier.name}</h2>
                    <p className="text-sm text-gray-500">
                      {activeConversation.supplier.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'buyer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.senderId === 'buyer'
                          ? 'bg-teal-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p>{message.message}</p>
                      <div className={`flex items-center gap-1 mt-1 text-xs ${
                        message.senderId === 'buyer' ? 'text-teal-100' : 'text-gray-500'
                      }`}>
                        <span>{message.timestamp}</span>
                        {message.senderId === 'buyer' && (
                          <CheckCheck size={14} className={message.read ? 'text-blue-300' : ''} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="p-3 border-t bg-gray-50">
                <div className="flex gap-2 mb-2">
                  <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition">
                    Request Quote
                  </button>
                  <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition">
                    Request Payment Link
                  </button>
                  <button className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition">
                    Book Transport
                  </button>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <button className="p-3 hover:bg-gray-100 rounded-lg">
                    <Paperclip size={20} className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center text-gray-500">
                <p className="text-lg">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
