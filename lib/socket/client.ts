import { io, Socket } from 'socket.io-client';

class SocketClient {
  private socket: Socket | null = null;

  connect() {
    if (this.socket?.connected) return this.socket;

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:8000';
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

    this.socket = io(socketUrl, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket?.id);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    if (!this.socket || !this.socket.connected) {
      return this.connect();
    }
    return this.socket;
  }

  emit(event: string, data: unknown) {
    this.getSocket().emit(event, data);
  }

  on(event: string, callback: (...args: unknown[]) => void) {
    this.getSocket().on(event, callback);
  }

  off(event: string, callback?: (...args: unknown[]) => void) {
    this.getSocket().off(event, callback);
  }
}

export const socketClient = new SocketClient();
