
export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum UserLevel {
  INICIANTE = 'Iniciante',
  INTERMEDIARIO = 'Intermediário',
  AVANCADO = 'Avançado'
}

export interface ChatSession {
  id: string;
  messages: Message[];
  level: UserLevel;
}

export type AppView = 'chat' | 'editor' | 'articles' | 'tools';

export interface AdData {
  title: string;
  price: string;
  category: string;
  brand: string;
  model: string;
  ean: string;
  material: string;
  dimensions: string;
  condition: 'new' | 'used';
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  icon: string;
  category: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'internal' | 'external';
  url?: string;
  badge?: string;
}
