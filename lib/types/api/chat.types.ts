export interface Conversation {
  id: string;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConversationParticipant {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: 'buyer' | 'supplier';
  online: boolean;
  lastSeen?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: MessageType;
  attachments?: MessageAttachment[];
  quotedMessage?: QuotedMessage;
  read: boolean;
  createdAt: string;
}

export type MessageType = 'text' | 'image' | 'file' | 'product' | 'quote' | 'system';

export interface MessageAttachment {
  id: string;
  type: 'image' | 'document' | 'video';
  url: string;
  name: string;
  size: number;
}

export interface QuotedMessage {
  id: string;
  content: string;
  senderName: string;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  type?: MessageType;
  attachments?: File[];
  quotedMessageId?: string;
}

export interface CreateConversationRequest {
  participantId: string;
  initialMessage?: string;
}

// Real-time events
export interface TypingEvent {
  conversationId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface MessageReadEvent {
  conversationId: string;
  messageId: string;
  userId: string;
}

export interface UserPresenceEvent {
  userId: string;
  online: boolean;
  lastSeen?: string;
}
