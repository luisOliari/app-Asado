export interface GroupProfile {
  id: string;
  name: string;
  motto: string;
  membersCount: number;
  imageUrl: string;
  availability: string;
  vibe: VibeStats;
  location: string;
}

export interface VibeStats {
  party: number; // 0-100
  foodie: number; // 0-100
  chill: number; // 0-100
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  isSystem?: boolean;
}

export interface Match {
  id: string;
  group: GroupProfile;
  lastMessage?: string;
}

export interface AsadoItem {
  id: string;
  name: string;
  category: 'Fuego' | 'Carne' | 'Bebida' | 'Varios';
  checked: boolean;
  assignedTo?: string;
}

export enum AppScreen {
  ONBOARDING = 'ONBOARDING',
  SWIPE = 'SWIPE',
  MATCHES = 'MATCHES',
  CHAT = 'CHAT',
  KIT = 'KIT',
  PROFILE = 'PROFILE'
}