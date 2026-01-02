import { ServiceItem, ExternalLink, SiteConfig } from './types';

// In a real app, these would be in .env
export const ADMIN_USERNAME = 'rowboxsiw@gmail.com';
export const ADMIN_PASSWORD = 'ABC13792588@MRK'; // Demo password
export const APP_NAME = 'authorize.qzz.io';

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Cloud Authentication',
    description: 'Secure centralized login system for enterprise users.',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Legacy Gateway',
    description: 'Bridge for older protocol connections.',
    status: 'maintenance',
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_LINKS: ExternalLink[] = [
  {
    id: '1',
    name: 'Documentation',
    url: 'https://docs.example.com',
    category: 'Support',
  },
  {
    id: '2',
    name: 'Status Page',
    url: 'https://status.example.com',
    category: 'System',
  },
];

export const DEFAULT_CONFIG: SiteConfig = {
  welcomeMessage: 'Welcome to the Authorize Portal',
  aboutText: 'This system provides secure access management and service discovery for authorized personnel.',
  seoTitle: 'Authorize | Secure Service Management',
  seoDescription: 'Secure centralized access management, service discovery, and external resource portal.',
  keywords: 'authorize, admin, dashboard, secure, service management, gateway',
};