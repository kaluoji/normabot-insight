import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Theme Store
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeState>()((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
}));

// Language Store
interface LanguageState {
  language: 'es' | 'en';
  setLanguage: (language: 'es' | 'en') => void;
}

export const useLanguageStore = create<LanguageState>()((set) => ({
  language: 'es',
  setLanguage: (language) => set({ language }),
}));

// Auth Store
interface AuthState {
  user: {
    id: string;
    email: string;
    role: 'admin' | 'compliance_expert' | 'analyst' | 'viewer';
    name: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: AuthState['user'], token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
  logout: () => set({ user: null, token: null, isAuthenticated: false }),
}));

// Sidebar Store
interface SidebarState {
  isOpen: boolean;
  activeConversation: string | null;
  toggleSidebar: () => void;
  setActiveConversation: (id: string | null) => void;
}

export const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen: true,
  activeConversation: null,
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setActiveConversation: (id) => set({ activeConversation: id }),
}));

// Chat Store for conversation management
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: {
    source: string;
    url: string;
    score: number;
  }[];
  createdAt: Date;
  tokens?: number;
}

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  tags: string[];
  updatedAt: Date;
  isPinned: boolean;
}

interface ChatState {
  conversations: Conversation[];
  activeConversation: string | null;
  isLoading: boolean;
  addConversation: (conversation: Conversation) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  deleteConversation: (id: string) => void;
  setActiveConversation: (id: string | null) => void;
  addMessage: (conversationId: string, message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>()((set, get) => ({
  conversations: [],
  activeConversation: null,
  isLoading: false,
  addConversation: (conversation) => 
    set((state) => ({ 
      conversations: [conversation, ...state.conversations] 
    })),
  updateConversation: (id, updates) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === id ? { ...conv, ...updates } : conv
      ),
    })),
  deleteConversation: (id) =>
    set((state) => ({
      conversations: state.conversations.filter((conv) => conv.id !== id),
      activeConversation: state.activeConversation === id ? null : state.activeConversation,
    })),
  setActiveConversation: (id) => set({ activeConversation: id }),
  addMessage: (conversationId, message) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { 
              ...conv, 
              messages: [...conv.messages, message],
              updatedAt: new Date()
            }
          : conv
      ),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
}));