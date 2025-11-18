'use client';

import { useState } from 'react';
import {
  Plus,
  Archive,
  Users,
  MessageSquare,
  Send,
  Image as ImageIcon,
  Phone,
  Video,
  FileText,
  MapPin,
  User,
  Smile,
  Trash2,
} from 'lucide-react';
import AnimatedTooltipButton from './AnimatedTooltipButton';
import BurgerButton from './BurgerButton';
import CustomCheckbox from './CustomCheckbox';
import AnimatedDeleteButton from './AnimatedDeleteButton';

interface Message {
  id: string;
  contactName: string;
  company: string;
  lastMessage: string;
  date: string;
  unread: number;
  avatar: string;
}

const initialMessages: Message[] = [
  {
    id: '1',
    contactName: 'Virendra',
    company: 'Company',
    lastMessage: 'Message starting text',
    date: 'Date & Time',
    unread: 1,
    avatar: 'V',
  },
  {
    id: '2',
    contactName: 'Virendra',
    company: 'Company',
    lastMessage: 'Message starting text',
    date: 'Date & Time',
    unread: 0,
    avatar: 'V',
  },
  {
    id: '3',
    contactName: 'Virendra',
    company: 'Company',
    lastMessage: 'Message starting text',
    date: 'Date & Time',
    unread: 0,
    avatar: 'V',
  },
  {
    id: '4',
    contactName: 'Virendra',
    company: 'Company',
    lastMessage: 'Message starting text',
    date: 'Date & Time',
    unread: 1,
    avatar: 'V',
  },
];

export default function MessagesView() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [archivedMessages, setArchivedMessages] = useState<Message[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>('1');
  const [messageText, setMessageText] = useState('');
  const [selectMode, setSelectMode] = useState(false);
  const [selectedChats, setSelectedChats] = useState<Set<string>>(new Set());
  const [isArchiveView, setIsArchiveView] = useState(false);

  // Determine which messages to display based on archive view
  const messagesToDisplay = isArchiveView ? archivedMessages : messages;
  
  const filteredMessages = messagesToDisplay.filter((msg) => {
    if (selectedTab === 'unread' && msg.unread === 0) return false;
    return true;
  });

  const selectedMsg = messagesToDisplay.find((m) => m.id === selectedMessage);

  // Handle delete functionality
  const handleDelete = () => {
    if (selectedChats.size === 0) return;
    
    if (isArchiveView) {
      setArchivedMessages((prev) => prev.filter((msg) => !selectedChats.has(msg.id)));
    } else {
      setMessages((prev) => prev.filter((msg) => !selectedChats.has(msg.id)));
    }
    
    setSelectedChats(new Set());
    setSelectMode(false);
    
    // If deleted message was selected, clear selection
    if (selectedMessage && selectedChats.has(selectedMessage)) {
      setSelectedMessage(null);
    }
  };

  // Handle archive functionality
  const handleArchive = () => {
    if (selectedChats.size === 0) return;
    
    if (isArchiveView) {
      // Unarchive: move from archive back to messages
      const chatsToUnarchive = archivedMessages.filter((msg) => selectedChats.has(msg.id));
      setMessages((prev) => [...prev, ...chatsToUnarchive]);
      setArchivedMessages((prev) => prev.filter((msg) => !selectedChats.has(msg.id)));
    } else {
      // Archive: move from messages to archive
      const chatsToArchive = messages.filter((msg) => selectedChats.has(msg.id));
      setArchivedMessages((prev) => [...prev, ...chatsToArchive]);
      setMessages((prev) => prev.filter((msg) => !selectedChats.has(msg.id)));
    }
    
    setSelectedChats(new Set());
    setSelectMode(false);
    
    // If archived/unarchived message was selected, clear selection
    if (selectedMessage && selectedChats.has(selectedMessage)) {
      setSelectedMessage(null);
    }
  };

  // Handle read functionality
  const handleRead = () => {
    if (selectedChats.size > 0) {
      // Mark selected chats as read
      if (isArchiveView) {
        setArchivedMessages((prev) =>
          prev.map((msg) =>
            selectedChats.has(msg.id) ? { ...msg, unread: 0 } : msg
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((msg) =>
            selectedChats.has(msg.id) ? { ...msg, unread: 0 } : msg
          )
        );
      }
      setSelectedChats(new Set());
      setSelectMode(false);
    } else {
      // Mark all chats as read
      if (isArchiveView) {
        setArchivedMessages((prev) => prev.map((msg) => ({ ...msg, unread: 0 })));
      } else {
        setMessages((prev) => prev.map((msg) => ({ ...msg, unread: 0 })));
      }
    }
  };

  return (
    <div className="h-screen flex bg-white">
      {/* Left Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col relative">
        {/* Top Navigation Buttons */}
        <div className="pt-20 pb-4 px-4 border-b border-gray-200 relative overflow-visible">
          <div className="flex items-center justify-center gap-4">
            <button className="flex flex-col items-center gap-1.5 p-2 hover:bg-gray-50 rounded-lg transition group">
              <Users size={20} className="text-gray-600 group-hover:text-[#9A79FF]" />
              <span className="text-xs text-gray-600 group-hover:text-[#9A79FF]">Group Chat</span>
            </button>
            <div className="flex flex-col items-center gap-1.5 relative">
              <AnimatedTooltipButton 
                tooltipText="New Chat" 
                placeholder="Enter contact name..."
                onInputSubmit={(value) => {
                  // Handle new chat creation
                  console.log('New chat:', value);
                }}
              />
              <span className="text-xs text-gray-600 mt-2">New Chat</span>
            </div>
            <button 
              onClick={() => {
                setIsArchiveView(!isArchiveView);
                setSelectedMessage(null);
                setSelectedChats(new Set());
                setSelectMode(false);
              }}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition group ${
                isArchiveView 
                  ? 'bg-[rgba(154,121,255,0.1)]' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Archive size={20} className={`${
                isArchiveView 
                  ? 'text-[#9A79FF]' 
                  : 'text-gray-600 group-hover:text-[#9A79FF]'
              }`} />
              <span className={`text-xs ${
                isArchiveView 
                  ? 'text-[#9A79FF]' 
                  : 'text-gray-600 group-hover:text-[#9A79FF]'
              }`}>
                {isArchiveView ? 'Inbox' : 'Archive'}
              </span>
            </button>
          </div>
        </div>

        {/* Chat Filters */}
        <div className="px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <button
                onClick={() => setSelectedTab('all')}
                className={`text-sm font-medium transition ${
                  selectedTab === 'all'
                    ? 'text-[#9A79FF] underline decoration-2 underline-offset-4'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedTab('unread')}
                className={`text-sm font-medium transition ${
                  selectedTab === 'unread'
                    ? 'text-[#9A79FF] underline decoration-2 underline-offset-4'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Unread
              </button>
            </div>
            <BurgerButton 
              isChecked={selectMode}
              onSelectChat={() => {
                setSelectMode(!selectMode);
                if (selectMode) {
                  // Clear selections when exiting select mode
                  setSelectedChats(new Set());
                }
              }} 
            />
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto relative pb-20">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`group relative w-full border-b border-gray-100 overflow-hidden transition-all ${
                selectedMessage === message.id 
                  ? 'bg-[rgba(154,121,255,0.1)]' 
                  : 'bg-[rgba(154,121,255,0.1)]/30 hover:bg-[rgba(154,121,255,0.1)]'
              }`}
              style={{ transitionDuration: '350ms' }}
            >
              {/* Teal light animation on right side - Fixed for selected */}
              {selectedMessage === message.id && (
                <div 
                  className="absolute right-0 top-0 w-1 h-full bg-[#9A79FF] z-20 shadow-[0_0_10px_rgba(154,121,255,0.8)]"
                  style={{ 
                    boxShadow: '0 0 15px rgba(154, 121, 255, 0.9), 0 0 30px rgba(154, 121, 255, 0.5)'
                  }}
                />
              )}
              
              {/* Teal line animation on hover (only when not selected) */}
              {selectedMessage !== message.id && (
                <>
                  {/* Teal line - moves horizontally along outline from left to right */}
                  <div 
                    className="absolute top-0 left-0 w-0 h-1 bg-[#9A79FF] z-0 opacity-0 group-hover:opacity-100 group-hover:animate-tealLineMoveRight"
                  />
                  {/* Gray background (::after) - follows teal line */}
                  <div 
                    className="absolute left-0 top-0 w-0 h-[6%] bg-gray-100 z-0 group-hover:w-[95%] group-hover:h-full" 
                    style={{ transition: 'width 350ms linear 175ms, height 350ms linear 650ms' }}
                  />
                </>
              )}
              
              <button
                onClick={() => {
                  if (!selectMode) {
                    setSelectedMessage(message.id);
                  }
                }}
                className="w-full p-4 text-left flex items-start gap-3 relative z-10"
              >
                {selectMode && (
                  <div className="flex-shrink-0 relative z-20 -ml-2">
                    <CustomCheckbox
                      id={`chat-${message.id}`}
                      checked={selectedChats.has(message.id)}
                      onChange={(checked) => {
                        const newSelected = new Set(selectedChats);
                        if (checked) {
                          newSelected.add(message.id);
                        } else {
                          newSelected.delete(message.id);
                        }
                        setSelectedChats(newSelected);
                      }}
                    />
                  </div>
                )}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 
                      className={`text-sm font-semibold truncate ${
                        selectedMessage === message.id 
                          ? 'text-[#9A79FF]' 
                          : 'text-gray-900 group-hover:text-[#9A79FF]'
                      }`}
                      style={{ transition: 'color 350ms linear 650ms' }}
                    >
                      {message.contactName}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{message.date}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate mb-1">{message.company}</p>
                  <p className="text-xs text-gray-500 truncate">{message.lastMessage}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
        
        {/* Bottom Action Bar - appears when selectMode is active */}
        {selectMode && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8 z-30">
            {/* Archive/Unarchive Button */}
            <button
              onClick={handleArchive}
              disabled={selectedChats.size === 0}
              className={`flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                selectedChats.size === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={isArchiveView ? "Unarchive" : "Archive"}
            >
              <Archive className="w-6 h-6 text-gray-700 hover:text-gray-900" />
            </button>
            
            {/* Read All / Read Button */}
            <button
              onClick={handleRead}
              className="flex items-center justify-center transition-all duration-200 hover:scale-110 min-w-[50px]"
              title={selectedChats.size > 0 ? "Read selected" : "Read all"}
            >
              <span className="text-[10px] font-medium text-gray-700 hover:text-gray-900 text-center whitespace-nowrap">
                {selectedChats.size > 0 ? 'Read' : 'Read all'}
              </span>
            </button>
            
            {/* Delete Button */}
            <div className="flex items-center justify-center">
              <AnimatedDeleteButton
                onClick={handleDelete}
                disabled={selectedChats.size === 0}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 bg-gray-50 flex flex-col">
        {selectedMsg ? (
          <>
            {/* Chat Header */}
            <div className="px-6 py-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{selectedMsg.contactName}</h3>
                  <p className="text-sm text-gray-500">{selectedMsg.company}</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {/* Incoming Message */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
                <div className="bg-white rounded-lg px-4 py-3 max-w-md shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-900"></p>
                </div>
              </div>

              {/* Outgoing Message */}
              <div className="flex items-start gap-3 justify-end">
                <div className="bg-white rounded-lg px-4 py-3 max-w-md shadow-sm border border-gray-200">
                  <p className="text-sm text-gray-900"></p>
                </div>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-3 bg-white border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                  Review Supplier
                </button>
                <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                  Business Card
                </button>
                <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                  Product List
                </button>
                <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                  Transport
                </button>
                <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                  Custom Request
                </button>
                <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                  File a complaint
                </button>
              </div>
            </div>

            {/* Attachment Icons */}
            <div className="px-6 py-3 bg-white border-t border-gray-200">
              <div className="flex items-center gap-4">
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <Smile size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <ImageIcon size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <FileText size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <FileText size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <MapPin size={20} />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-[#9A79FF] rounded-lg transition">
                  <User size={20} />
                </button>
              </div>
            </div>

            {/* Message Input */}
            <div className="px-6 py-4 bg-white border-t border-gray-200">
              <div className="flex items-end gap-3">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Please Type message here"
                  rows={3}
                  className="flex-1 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#9A79FF] focus:bg-white resize-none border border-gray-200"
                />
                <button className="bg-[#9A79FF] hover:bg-[#8A69EF] text-white px-6 py-3 rounded-lg font-medium transition shadow-sm whitespace-nowrap">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
