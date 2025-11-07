import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatService } from '../services/chat.service';
import { SendMessageRequest, CreateConversationRequest } from '@/lib/types/api/chat.types';
import { PaginationParams } from '@/lib/types/api/common.types';
import toast from 'react-hot-toast';

export const useConversations = (params?: PaginationParams) => {
  return useQuery({
    queryKey: ['conversations', params],
    queryFn: () => chatService.getConversations(params),
    refetchInterval: 10000, // Refetch every 10 seconds
  });
};

export const useConversation = (id: string) => {
  return useQuery({
    queryKey: ['conversations', id],
    queryFn: () => chatService.getConversationById(id),
    enabled: !!id,
  });
};

export const useMessages = (conversationId: string, params?: PaginationParams) => {
  return useQuery({
    queryKey: ['conversations', conversationId, 'messages', params],
    queryFn: () => chatService.getMessages(conversationId, params),
    enabled: !!conversationId,
    refetchInterval: 5000, // Refetch every 5 seconds (will be replaced by Socket.IO)
  });
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: ['conversations', 'unread'],
    queryFn: chatService.getUnreadCount,
    refetchInterval: 10000,
  });
};

export const useCreateConversation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateConversationRequest) => chatService.createConversation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      toast.success('Conversation started!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create conversation');
    },
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageRequest) => chatService.sendMessage(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['conversations', variables.conversationId, 'messages'],
      });
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to send message');
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => chatService.markConversationAsRead(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] });
      queryClient.invalidateQueries({ queryKey: ['conversations', 'unread'] });
    },
  });
};
