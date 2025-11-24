'use client';

import { useState, useRef, useEffect } from 'react';
import {
    Search,
    Plus,
    FileText,
    Trash2,
    Filter,
    MessageSquare,
    Send,
    Paperclip,
    Smile,
    MoreVertical,
    CheckCircle2,
    Phone,
    Video,
    Briefcase,
    DollarSign,
    Image as ImageIcon,
    X,
    ChevronRight,
    MapPin,
    Users,
    Archive,
    User
} from 'lucide-react';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// --- Types ---
type MessageType = 'text' | 'business-card' | 'custom-offer' | 'payment-link' | 'image';

interface Message {
    id: string;
    type: MessageType;
    content: string | any;
    sender: 'me' | 'them';
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
}

interface Contact {
    id: string;
    contactName: string;
    company: string;
    lastMessage: string;
    date: string;
    unread: number;
    avatar: string;
    isVerified: boolean;
    online: boolean;
}

// --- Mock Data ---
const mockContacts: Contact[] = [
    {
        id: '1',
        contactName: 'Jenny Li',
        company: 'Hisida (Xuzhou) Technology Co., Ltd',
        lastMessage: 'Sent a payment link',
        date: '10:30 AM',
        unread: 1,
        avatar: 'J',
        isVerified: true,
        online: true,
    },
    {
        id: '2',
        contactName: 'Sally Lee',
        company: 'TechLight Industries',
        lastMessage: 'Thank you for your inquiry',
        date: 'Yesterday',
        unread: 0,
        avatar: 'S',
        isVerified: true,
        online: false,
    },
    {
        id: '3',
        contactName: 'Grace Ma',
        company: 'Textile Hub Global',
        lastMessage: 'We can provide samples',
        date: 'Sep 5',
        unread: 2,
        avatar: 'G',
        isVerified: false,
        online: true,
    },
];

const initialMessages: Message[] = [
    {
        id: '1',
        type: 'text',
        content: 'Hello, I am interested in your products. Can you provide more details?',
        sender: 'them',
        timestamp: '10:00 AM',
        status: 'read',
    },
    {
        id: '2',
        type: 'text',
        content: 'Sure! Here is my business card for your records.',
        sender: 'me',
        timestamp: '10:05 AM',
        status: 'read',
    },
    {
        id: '3',
        type: 'business-card',
        content: {
            name: 'Vikram Singh',
            role: 'Procurement Manager',
            company: 'Airavat Global Trading',
            email: 'vikram@airavat.com',
            phone: '+91 98765 43210',
            address: 'Mumbai, India'
        },
        sender: 'me',
        timestamp: '10:05 AM',
        status: 'read',
    },
    {
        id: '4',
        type: 'text',
        content: 'Thanks Vikram. I have prepared a custom offer for the 500 units you requested.',
        sender: 'them',
        timestamp: '10:10 AM',
        status: 'read',
    },
    {
        id: '5',
        type: 'custom-offer',
        content: {
            title: 'Bulk Order - Industrial LED Lights',
            quantity: 500,
            unitPrice: 450,
            total: 225000,
            currency: 'INR',
            validUntil: '2025-10-05',
            specifications: ['IP65 Rated', '5 Year Warranty', 'Cool White 6500K']
        },
        sender: 'them',
        timestamp: '10:11 AM',
        status: 'read',
    },
    {
        id: '6',
        type: 'text',
        content: 'The offer looks good. Please send the payment link.',
        sender: 'me',
        timestamp: '10:15 AM',
        status: 'read',
    },
    {
        id: '7',
        type: 'payment-link',
        content: {
            amount: 225000,
            currency: 'INR',
            description: 'Advance payment for Order #ORD-2025-001',
            status: 'pending',
            link: '/payment/checkout?id=123'
        },
        sender: 'them',
        timestamp: '10:16 AM',
        status: 'read',
    }
];

export default function ChatInterface() {
    const { user } = useStore();
    const [selectedTab, setSelectedTab] = useState<'all' | 'unread'>('all');
    const [selectedContactId, setSelectedContactId] = useState<string | null>('1');
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputText, setInputText] = useState('');
    const [showActions, setShowActions] = useState(true); // Default to true to show buttons
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const selectedContact = mockContacts.find(c => c.id === selectedContactId) || mockContacts[0];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            type: 'text',
            content: inputText,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent',
        };

        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const sendSpecialMessage = (type: MessageType) => {
        let content;
        if (type === 'business-card') {
            content = {
                name: user?.name || 'User',
                role: 'Buyer',
                company: 'My Company Ltd',
                email: user?.email || 'user@example.com',
                phone: '+91 98765 43210'
            };
        } else if (type === 'custom-offer') {
            content = {
                title: 'Sample Order Offer',
                quantity: 100,
                unitPrice: 50,
                total: 5000,
                currency: 'USD',
                validUntil: '2025-10-10',
                specifications: ['Standard Quality', 'Immediate Dispatch']
            };
        } else if (type === 'payment-link') {
            content = {
                amount: 5000,
                currency: 'USD',
                description: 'Payment for Sample Order',
                status: 'pending',
                link: '#'
            };
        }

        const newMessage: Message = {
            id: Date.now().toString(),
            type,
            content,
            sender: 'me',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent',
        };

        setMessages([...messages, newMessage]);
        setShowActions(false);
    };

    // --- Render Components ---

    const renderBusinessCard = (content: any, isMe: boolean) => (
        <div className={`p-4 rounded-xl border ${isMe ? 'bg-blue-50 border-blue-100' : 'bg-white border-gray-200'} shadow-sm w-72`}>
            <div className="flex items-center gap-3 mb-3 border-b border-gray-200 pb-3">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold">
                    {content.name[0]}
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">{content.name}</h4>
                    <p className="text-xs text-gray-500">{content.role}</p>
                </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <Briefcase size={14} />
                    <span>{content.company}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Phone size={14} />
                    <span>{content.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{content.address || 'Location'}</span>
                </div>
            </div>
            <button className="mt-3 w-full py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition">
                Save Contact
            </button>
        </div>
    );

    const renderCustomOffer = (content: any, isMe: boolean) => (
        <div className="w-80 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 text-white">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider">Custom Offer</span>
                    <FileText size={16} />
                </div>
                <h3 className="font-bold mt-1">{content.title}</h3>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <p className="text-xs text-gray-500">Total Amount</p>
                        <p className="text-xl font-bold text-gray-900">
                            {content.currency === 'INR' ? '₹' : '$'}{content.total.toLocaleString()}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500">{content.quantity} Units</p>
                        <p className="text-sm font-medium">@{content.unitPrice}/{content.currency}</p>
                    </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs text-gray-600 space-y-1">
                    {content.specifications.map((spec: string, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-green-500" />
                            <span>{spec}</span>
                        </div>
                    ))}
                </div>
                {!isMe && (
                    <div className="flex gap-2">
                        <button className="flex-1 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition">
                            Accept Offer
                        </button>
                        <button className="flex-1 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                            Negotiate
                        </button>
                    </div>
                )}
                {isMe && (
                    <div className="text-center text-xs text-gray-500 italic">
                        Waiting for buyer response...
                    </div>
                )}
            </div>
        </div>
    );

    const renderPaymentLink = (content: any, isMe: boolean) => (
        <div className="w-72 bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden">
            <div className="p-4 text-center border-b border-gray-100">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <DollarSign size={24} />
                </div>
                <p className="text-sm text-gray-500 mb-1">Payment Request</p>
                <h3 className="text-2xl font-bold text-gray-900">
                    {content.currency === 'INR' ? '₹' : '$'}{content.amount.toLocaleString()}
                </h3>
                <p className="text-xs text-gray-400 mt-2">{content.description}</p>
            </div>
            <div className="p-3 bg-gray-50">
                {!isMe ? (
                    <Link href={content.link || '#'} className="block w-full">
                        <button className="w-full py-2.5 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition shadow-sm flex items-center justify-center gap-2">
                            Pay Now <ChevronRight size={16} />
                        </button>
                    </Link>
                ) : (
                    <button className="w-full py-2 text-gray-500 text-xs font-medium cursor-default">
                        Payment Pending
                    </button>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Chat List Sidebar */}
            <div className="w-80 flex-shrink-0 border-r border-gray-200 flex flex-col">
                {/* Sidebar Header with Actions */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-around mb-4 text-gray-600">
                        <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition">
                            <Users size={20} />
                            <span className="text-[10px] font-medium">Group Chat</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 text-blue-600">
                            <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-700 transition">
                                <Plus size={24} />
                            </div>
                            <span className="text-[10px] font-medium">New Chat</span>
                        </button>
                        <button className="flex flex-col items-center gap-1 hover:text-blue-600 transition">
                            <Archive size={20} />
                            <span className="text-[10px] font-medium">Archive</span>
                        </button>
                    </div>

                    {/* Search & Tabs */}
                    <div className="space-y-3">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-4 border-b border-gray-100">
                            <button
                                onClick={() => setSelectedTab('all')}
                                className={`pb-2 text-sm font-medium transition relative ${selectedTab === 'all' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                All
                                {selectedTab === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                            </button>
                            <button
                                onClick={() => setSelectedTab('unread')}
                                className={`pb-2 text-sm font-medium transition relative ${selectedTab === 'unread' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Unread
                                {selectedTab === 'unread' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Contact List */}
                <div className="flex-1 overflow-y-auto">
                    {mockContacts.map((contact) => (
                        <button
                            key={contact.id}
                            onClick={() => setSelectedContactId(contact.id)}
                            className={`w-full p-4 border-b border-gray-50 transition text-left flex gap-3 relative ${selectedContactId === contact.id ? 'bg-[#F0F7FF]' : 'bg-white hover:bg-gray-50'
                                }`}
                        >
                            {selectedContactId === contact.id && (
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#3373FF]" />
                            )}
                            <div className="relative">
                                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg overflow-hidden">
                                    {contact.avatar}
                                </div>
                                {contact.online && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1">
                                    <h3 className={`font-semibold truncate text-sm ${selectedContactId === contact.id ? 'text-[#3373FF]' : 'text-gray-900'}`}>
                                        {contact.contactName}
                                    </h3>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{contact.date}</span>
                                </div>
                                <p className="text-xs text-gray-500 truncate mb-1">{contact.company}</p>
                                <p className={`text-xs truncate ${contact.unread > 0 ? 'font-semibold text-gray-900' : 'text-gray-400'}`}>
                                    {contact.lastMessage}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                            {selectedContact.avatar}
                        </div>
                        <div>
                            <h2 className="font-bold text-gray-900 text-sm">{selectedContact.contactName}</h2>
                            <p className="text-xs text-gray-500">{selectedContact.company}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Header Actions if needed */}
                    </div>
                </div>

                {/* Messages Scroll Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                    {messages.map((msg) => {
                        const isMe = msg.sender === 'me';
                        return (
                            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-3 max-w-[70%] ${isMe ? 'flex-row-reverse' : ''}`}>
                                    {!isMe && (
                                        <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold bg-gray-200 text-gray-600">
                                            {selectedContact.avatar}
                                        </div>
                                    )}

                                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        {msg.type === 'text' && (
                                            <div className={`px-4 py-2 rounded-2xl text-sm ${isMe
                                                ? 'bg-blue-600 text-white rounded-tr-none'
                                                : 'bg-gray-100 text-gray-800 rounded-tl-none'
                                                }`}>
                                                {msg.content}
                                            </div>
                                        )}

                                        {msg.type === 'business-card' && renderBusinessCard(msg.content, isMe)}
                                        {msg.type === 'custom-offer' && renderCustomOffer(msg.content, isMe)}
                                        {msg.type === 'payment-link' && renderPaymentLink(msg.content, isMe)}

                                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Footer / Input Area */}
                <div className="border-t border-gray-200 bg-white">
                    {/* Action Buttons Row */}
                    <div className="flex items-center gap-2 p-3 overflow-x-auto no-scrollbar border-b border-gray-100">
                        {['Review Supplier', 'Business Card', 'Product List', 'Transport', 'Custom Request', 'File a complaint'].map((action) => (
                            <button
                                key={action}
                                onClick={() => {
                                    if (action === 'Business Card') sendSpecialMessage('business-card');
                                    else if (action === 'Custom Request') sendSpecialMessage('custom-offer');
                                    else if (action === 'Review Supplier') console.log('Review Supplier clicked');
                                    else if (action === 'Product List') console.log('Product List clicked');
                                    else if (action === 'Transport') console.log('Transport clicked');
                                    else if (action === 'File a complaint') console.log('File a complaint clicked');
                                }}
                                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition whitespace-nowrap shadow-sm"
                            >
                                {action}
                            </button>
                        ))}
                    </div>

                    {/* Icons Row */}
                    <div className="flex items-center gap-4 px-4 py-2 text-gray-400">
                        <button className="hover:text-blue-600 transition"><Smile size={20} /></button>
                        <button className="hover:text-blue-600 transition"><ImageIcon size={20} /></button>
                        <button className="hover:text-blue-600 transition"><Phone size={20} /></button>
                        <button className="hover:text-blue-600 transition"><Video size={20} /></button>
                        <button className="hover:text-blue-600 transition"><FileText size={20} /></button>
                        <button className="hover:text-blue-600 transition"><MapPin size={20} /></button>
                        <button className="hover:text-blue-600 transition"><User size={20} /></button>
                    </div>

                    {/* Input Field */}
                    <div className="px-4 pb-4">
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            <button
                                onClick={() => handleSendMessage()}
                                disabled={!inputText.trim()}
                                className={`p-2.5 rounded-lg transition ${inputText.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-100 text-gray-400'}`}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
