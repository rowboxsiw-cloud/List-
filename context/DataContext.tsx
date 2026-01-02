import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DataContextType, ServiceItem, ExternalLink, SiteConfig } from '../types';
import { DEFAULT_SERVICES, DEFAULT_LINKS, DEFAULT_CONFIG } from '../constants';
import { storage } from '../services/storage';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [links, setLinks] = useState<ExternalLink[]>([]);
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    setServices(storage.get('services', DEFAULT_SERVICES));
    setLinks(storage.get('links', DEFAULT_LINKS));
    
    // Merge stored config with DEFAULT_CONFIG to ensure new SEO fields exist
    // even if the user has an older version of the config in localStorage
    const storedConfig = storage.get('config', {});
    setConfig({ ...DEFAULT_CONFIG, ...storedConfig });
    
    setLoading(false);
  }, []);

  // Persist on changes
  useEffect(() => {
    if (!loading) {
      storage.set('services', services);
      storage.set('links', links);
      storage.set('config', config);
    }
  }, [services, links, config, loading]);

  const addService = (service: Omit<ServiceItem, 'id' | 'createdAt'>) => {
    const newService: ServiceItem = {
      ...service,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setServices(prev => [newService, ...prev]);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const addLink = (link: Omit<ExternalLink, 'id'>) => {
    const newLink: ExternalLink = { ...link, id: crypto.randomUUID() };
    setLinks(prev => [...prev, newLink]);
  };

  const deleteLink = (id: string) => {
    setLinks(prev => prev.filter(l => l.id !== id));
  };

  const updateConfig = (updates: Partial<SiteConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  return (
    <DataContext.Provider
      value={{
        services,
        links,
        config,
        addService,
        updateService,
        deleteService,
        addLink,
        deleteLink,
        updateConfig,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};