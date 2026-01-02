import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { Card, Badge, Input } from '../components/UI';
import { Search, ExternalLink as LinkIcon, Server } from 'lucide-react';
import { SEO } from '../components/SEO';

const Home = () => {
  const { services, links, config } = useData();
  const [search, setSearch] = useState('');

  const filteredServices = useMemo(() => {
    return services.filter(s => 
      s.title.toLowerCase().includes(search.toLowerCase()) || 
      s.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [services, search]);

  const filteredLinks = useMemo(() => {
    return links.filter(l => 
      l.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [links, search]);

  return (
    <div className="space-y-12 animate-fade-in">
      <SEO 
        title={config.seoTitle} 
        description={config.seoDescription} 
        keywords={config.keywords} 
      />
      
      {/* Hero Section */}
      <div className="text-center space-y-4 max-w-3xl mx-auto mt-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
          {config.welcomeMessage}
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          {config.aboutText}
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input 
          type="text" 
          placeholder="Search services, resources, or links..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 py-3 shadow-md border-gray-200"
        />
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Server className="text-brand-600" /> Available Services
        </h2>
        
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <Card key={service.id} className="hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-900">{service.title}</h3>
                  <Badge status={service.status} />
                </div>
                <p className="text-gray-600 text-sm flex-grow">{service.description}</p>
                <div className="mt-4 text-xs text-gray-400 pt-4 border-t border-gray-50">
                  Updated: {new Date(service.createdAt).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500">No services found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* External Links */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <LinkIcon className="text-brand-600" /> External Resources
        </h2>
        
        {filteredLinks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {filteredLinks.map(link => (
              <a 
                key={link.id} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-500 hover:ring-1 hover:ring-brand-500 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">{link.category}</span>
                    <h4 className="font-medium text-gray-900 group-hover:text-brand-700 mt-1">{link.name}</h4>
                  </div>
                  <LinkIcon size={16} className="text-gray-400 group-hover:text-brand-500" />
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No resources found.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;