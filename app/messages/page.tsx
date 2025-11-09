'use client';

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Search,
  ArrowLeft,
  CheckCheck,
  Image as ImageIcon,
  FileText,
  Star,
  Award,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useStore } from '@/lib/store';

type SupplierProfile = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  rating: number;
  reviews: number;
};

type ConversationSummary = {
  id: string;
  supplier: SupplierProfile;
  lastMessage: string;
  timestamp: string;
  unread: number;
  placement: 'organic' | 'sponsored';
};

type Message = {
  id: string;
  senderId: 'buyer' | 'supplier';
  type: 'text' | 'image' | 'document';
  message?: string;
  attachmentUrl?: string;
  attachmentName?: string;
  timestamp: string;
  read: boolean;
};

type AttachmentDraft = {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document';
  sizeLabel: string;
};

const initialConversations: ConversationSummary[] = [
  {
    id: '1',
    supplier: {
      id: 's1',
      name: 'TechLight Industries',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
      online: true,
      rating: 4.8,
      reviews: 342,
    },
    lastMessage: 'Yes, we can provide samples. Please share your delivery address.',
    timestamp: '10:30 AM',
    unread: 2,
    placement: 'sponsored',
  },
  {
    id: '2',
    supplier: {
      id: 's2',
      name: 'Textile Hub',
      avatar: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?w=100',
      online: false,
      rating: 4.9,
      reviews: 518,
    },
    lastMessage: 'The minimum order quantity is 500 meters.',
    timestamp: 'Yesterday',
    unread: 0,
    placement: 'organic',
  },
  {
    id: '3',
    supplier: {
      id: 's3',
      name: 'MachineWorks Ltd',
      avatar: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100',
      online: true,
      rating: 4.7,
      reviews: 189,
    },
    lastMessage: 'Payment link has been generated.',
    timestamp: '2 days ago',
    unread: 0,
    placement: 'sponsored',
  },
];

const initialMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      senderId: 'buyer',
      type: 'text',
      message: 'Hi, I am interested in your Industrial LED Light 100W. Can you provide samples?',
      timestamp: '10:25 AM',
      read: true,
    },
    {
      id: '2',
      senderId: 'supplier',
      type: 'text',
      message: 'Hello! Thank you for your interest. Yes, we can provide samples.',
      timestamp: '10:27 AM',
      read: true,
    },
    {
      id: '3',
      senderId: 'supplier',
      type: 'text',
      message: 'Please share your delivery address and we will send you a quote including sample costs.',
      timestamp: '10:28 AM',
      read: true,
    },
    {
      id: '4',
      senderId: 'buyer',
      type: 'text',
      message: 'Address: 123 Industrial Area, Sector 18, Gurugram, Haryana - 122015',
      timestamp: '10:29 AM',
      read: true,
    },
    {
      id: '5',
      senderId: 'supplier',
      type: 'text',
      message: 'Perfect! Let me prepare a quote for you. Will share payment link shortly.',
      timestamp: '10:30 AM',
      read: false,
    },
  ],
  '2': [
    {
      id: '6',
      senderId: 'buyer',
      type: 'text',
      message: 'Hi! We are planning a new garment line. Can you customise dyes?',
      timestamp: '09:12 AM',
      read: true,
    },
  ],
  '3': [
    {
      id: '7',
      senderId: 'supplier',
      type: 'text',
      message: 'Payment link has been shared on your mail as well.',
      timestamp: '11:40 AM',
      read: true,
    },
  ],
};

export default function MessagesPage() {
  return (
    <Suspense fallback={<MessagesLoading />}>
      <MessagesPageContent />
    </Suspense>
  );
}

function MessagesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setActiveConversationId = useStore((state) => state.setActiveConversationId);

  const [conversations, setConversations] = useState(initialConversations);
  const [messagesByConversation, setMessagesByConversation] = useState(initialMessages);
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [attachmentDrafts, setAttachmentDrafts] = useState<AttachmentDraft[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const draftsRef = useRef<AttachmentDraft[]>([]);

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedConversation) ?? null,
    [conversations, selectedConversation]
  );

  const activeMessages = useMemo(
    () => (selectedConversation ? messagesByConversation[selectedConversation] ?? [] : []),
    [messagesByConversation, selectedConversation]
  );

  useEffect(() => {
    const supplierParam = searchParams.get('supplier');
    if (!supplierParam) return;
    const matching = conversations.find((conversation) => conversation.supplier.id === supplierParam);
    if (matching) {
      setSelectedConversation(matching.id);
      setActiveConversationId(matching.id);
    }
  }, [searchParams, conversations, setActiveConversationId]);

  useEffect(() => {
    if (selectedConversation) {
      setActiveConversationId(selectedConversation);
    }
  }, [selectedConversation, setActiveConversationId]);

  useEffect(() => {
    draftsRef.current = attachmentDrafts;
  }, [attachmentDrafts]);

  useEffect(() => {
    return () => {
      draftsRef.current.forEach((attachment) => URL.revokeObjectURL(attachment.url));
    };
  }, []);

  useEffect(() => {
    if (!selectedConversation) return;
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedConversation
          ? { ...conversation, unread: 0 }
          : conversation
      )
    );
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!selectedConversation) return;
    if (!messageInput.trim() && attachmentDrafts.length === 0) return;

    const timestamp = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const outgoingMessages: Message[] = [];

    if (messageInput.trim()) {
      outgoingMessages.push({
        id: `msg-${Date.now()}`,
        senderId: 'buyer',
        type: 'text',
        message: messageInput.trim(),
        timestamp,
        read: true,
      });
    }

    attachmentDrafts.forEach((attachment, index) => {
      outgoingMessages.push({
        id: `msg-${Date.now()}-${index}`,
        senderId: 'buyer',
        type: attachment.type,
        message:
          attachment.type === 'image'
            ? 'Shared product reference image'
            : 'Shared specification document',
        attachmentUrl: attachment.url,
        attachmentName: attachment.name,
        timestamp,
        read: true,
      });
    });

    setMessagesByConversation((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] ?? []), ...outgoingMessages],
    }));

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedConversation
          ? {
              ...conversation,
              lastMessage:
                attachmentDrafts.length > 0 && !messageInput.trim()
                  ? attachmentDrafts[0].type === 'image'
                    ? 'Shared product references'
                    : 'Shared order documents'
                  : messageInput.trim() || conversation.lastMessage,
              timestamp: 'Just now',
              unread: 0,
            }
          : conversation
      )
    );

    setAttachmentDrafts([]);
    setMessageInput('');
    toast.success('Message delivered to supplier');
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const attachments = files.map((file) => {
      const inferredType: AttachmentDraft['type'] = file.type.startsWith('image/') ? 'image' : 'document';
      return {
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        url: URL.createObjectURL(file),
        type: inferredType,
        sizeLabel: `${(file.size / 1024).toFixed(1)} KB`,
      } satisfies AttachmentDraft;
    });

    setAttachmentDrafts((prev) => [...prev, ...attachments]);
    event.target.value = '';
  };

  const removeAttachment = (attachmentId: string) => {
    setAttachmentDrafts((prev) => {
      const toRemove = prev.find((attachment) => attachment.id === attachmentId);
      if (toRemove) {
        URL.revokeObjectURL(toRemove.url);
      }
      return prev.filter((attachment) => attachment.id !== attachmentId);
    });
  };

  const openAttachmentPicker = () => {
    fileInputRef.current?.click();
  };

  const handleQuickMessage = (template: string) => {
    setMessageInput(template);
  };

  const handleBookLogistics = () => {
    if (!activeConversation) return;
    router.push(`/logistics?orderId=RFQ-${activeConversation.id}&supplier=${encodeURIComponent(activeConversation.supplier.name)}`);
    toast.success('Opened logistics booking pre-filled with supplier details');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex h-full">
          <div className="w-full md:w-96 bg-white border-r flex flex-col">
            <div className="p-4 border-b space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
                <div className="flex items-center gap-2 text-xs text-teal-600">
                  <Award size={16} />
                  Sponsored suppliers are pinned
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

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
                      <div>
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                          {conversation.supplier.name}
                          {conversation.placement === 'sponsored' && (
                            <span className="rounded-full bg-regal-gold-100 px-2 py-0.5 text-[10px] font-semibold text-regal-blue-900">
                              Sponsored
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Star size={12} className="text-yellow-500" />
                          <span>{conversation.supplier.rating.toFixed(1)}</span>
                          <span>· {conversation.supplier.reviews} reviews</span>
                        </div>
                      </div>
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

          {selectedConversation && activeConversation ? (
            <div className="flex-1 flex flex-col bg-white">
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button className="md:hidden" onClick={() => setSelectedConversation(null)}>
                    <ArrowLeft size={24} />
                  </button>
                  <img
                    src={activeConversation.supplier.avatar}
                    alt={activeConversation.supplier.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                      {activeConversation.supplier.name}
                      {activeConversation.placement === 'sponsored' && (
                        <span className="rounded-full bg-regal-gold-100 px-2 py-0.5 text-[10px] font-semibold text-regal-blue-900">
                          Top placement
                        </span>
                      )}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {activeConversation.supplier.online ? 'Online now' : 'Typically replies within 2 hours'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="Voice call">
                    <Phone size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="Video call">
                    <Video size={20} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg" title="More actions">
                    <MoreVertical size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {activeMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.senderId === 'buyer' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.senderId === 'buyer'
                          ? 'bg-teal-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {message.type === 'text' && <p>{message.message}</p>}
                      {message.type !== 'text' && (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold">{message.message}</p>
                          {message.type === 'image' ? (
                            <img
                              src={message.attachmentUrl}
                              alt={message.attachmentName}
                              className="max-h-48 rounded-lg border border-white/30"
                            />
                          ) : (
                            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm">
                              <FileText size={16} />
                              <span>{message.attachmentName}</span>
                            </div>
                          )}
                        </div>
                      )}
                      <div
                        className={`mt-2 flex items-center gap-1 text-xs ${
                          message.senderId === 'buyer' ? 'text-teal-100' : 'text-gray-500'
                        }`}
                      >
                        <span>{message.timestamp}</span>
                        {message.senderId === 'buyer' && (
                          <CheckCheck size={14} className={message.read ? 'text-blue-300' : ''} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {attachmentDrafts.length > 0 && (
                  <div className="ml-auto max-w-md rounded-2xl bg-white p-3 shadow-sm">
                    <p className="text-xs font-semibold text-gray-500 mb-2">Attachments ready to send</p>
                    <div className="space-y-2">
                      {attachmentDrafts.map((attachment) => (
                        <div
                          key={attachment.id}
                          className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3 py-2"
                        >
                          <div className="flex items-center gap-2 text-sm">
                            {attachment.type === 'image' ? (
                              <ImageIcon size={16} className="text-teal-600" />
                            ) : (
                              <FileText size={16} className="text-teal-600" />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.sizeLabel}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeAttachment(attachment.id)}
                            className="text-xs font-semibold text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 border-t bg-gray-50 space-y-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition"
                    onClick={() => handleQuickMessage('Please share your best price for 500 units with GST split.')}
                  >
                    Request Quote
                  </button>
                  <button
                    className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition"
                    onClick={() => handleQuickMessage('Kindly raise a milestone payment link as per the shared schedule.')}
                  >
                    Request Payment Link
                  </button>
                  <button
                    className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition"
                    onClick={handleBookLogistics}
                  >
                    Book Transport
                  </button>
                  <button
                    className="px-4 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 transition"
                    onClick={openAttachmentPicker}
                  >
                    Share Product References
                  </button>
                </div>
              </div>

              <div className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <button className="p-3 hover:bg-gray-100 rounded-lg" onClick={openAttachmentPicker}>
                    <Paperclip size={20} className="text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(event) => setMessageInput(event.target.value)}
                    onKeyDown={(event) => event.key === 'Enter' && !event.shiftKey && (event.preventDefault(), handleSendMessage())}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 transition"
                  >
                    <Send size={20} />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,application/pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
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

function MessagesLoading() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center">
      <p className="text-sm text-gray-500">Loading conversations…</p>
    </div>
  );
}
