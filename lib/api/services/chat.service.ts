import apiClient from '../client';
import {
  Conversation,
  Message,
  SendMessageRequest,
  CreateConversationRequest,
} from '@/lib/types/api/chat.types';
import { ApiResponse, PaginatedResponse, PaginationParams } from '@/lib/types/api/common.types';

export const chatService = {
  // Get all conversations
  getConversations: async (params?: PaginationParams): Promise<PaginatedResponse<Conversation>> => {
    const response = await apiClient.get<PaginatedResponse<Conversation>>('/conversations', {
      params,
    });
    return response.data;
  },

  // Get conversation by ID
  getConversationById: async (id: string): Promise<Conversation> => {
    const response = await apiClient.get<ApiResponse<Conversation>>(`/conversations/${id}`);
    return response.data.data;
  },

  // Create new conversation
  createConversation: async (data: CreateConversationRequest): Promise<Conversation> => {
    const response = await apiClient.post<ApiResponse<Conversation>>('/conversations', data);
    return response.data.data;
  },

  // Get messages for conversation
  getMessages: async (
    conversationId: string,
    params?: PaginationParams
  ): Promise<PaginatedResponse<Message>> => {
    const response = await apiClient.get<PaginatedResponse<Message>>(
      `/conversations/${conversationId}/messages`,
      { params }
    );
    return response.data;
  },

  // Send message
  sendMessage: async (data: SendMessageRequest): Promise<Message> => {
    const formData = new FormData();
    formData.append('conversationId', data.conversationId);
    formData.append('content', data.content);
    if (data.type) formData.append('type', data.type);
    if (data.quotedMessageId) formData.append('quotedMessageId', data.quotedMessageId);
    if (data.attachments) {
      data.attachments.forEach((file) => {
        formData.append('attachments', file);
      });
    }

    const response = await apiClient.post<ApiResponse<Message>>('/messages', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Mark message as read
  markMessageAsRead: async (messageId: string): Promise<void> => {
    await apiClient.patch(`/messages/${messageId}/read`);
  },

  // Mark all messages in conversation as read
  markConversationAsRead: async (conversationId: string): Promise<void> => {
    await apiClient.patch(`/conversations/${conversationId}/read`);
  },

  // Delete message
  deleteMessage: async (messageId: string): Promise<void> => {
    await apiClient.delete(`/messages/${messageId}`);
  },

  // Get unread count
  getUnreadCount: async (): Promise<number> => {
    const response = await apiClient.get<ApiResponse<{ count: number }>>('/conversations/unread');
    return response.data.data.count;
  },
};
