export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'maintenance' | 'inactive';
  createdAt: string;
}

export interface ExternalLink {
  id: string;
  name: string;
  url: string;
  category: string;
}

export interface SiteConfig {
  welcomeMessage: string;
  aboutText: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

export interface User {
  username: string;
  role: 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
}

export interface DataContextType {
  services: ServiceItem[];
  links: ExternalLink[];
  config: SiteConfig;
  addService: (service: Omit<ServiceItem, 'id' | 'createdAt'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  addLink: (link: Omit<ExternalLink, 'id'>) => void;
  deleteLink: (id: string) => void;
  updateConfig: (config: Partial<SiteConfig>) => void;
}