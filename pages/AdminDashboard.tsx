import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Button, Input, Card, Badge } from '../components/UI';
import { Plus, Trash2, Edit2, Save, X, Globe, Settings, List, Search } from 'lucide-react';
import { ServiceItem } from '../types';

const AdminDashboard = () => {
  const { services, links, config, addService, deleteService, updateService, addLink, deleteLink, updateConfig } = useData();
  const [activeTab, setActiveTab] = useState<'services' | 'links' | 'content'>('services');

  // Service Form State
  const [newService, setNewService] = useState({ title: '', description: '', status: 'active' as const });
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  
  // Link Form State
  const [newLink, setNewLink] = useState({ name: '', url: '', category: '' });

  // Config Form State
  const [tempConfig, setTempConfig] = useState(config);

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newService.title || !newService.description) return;
    addService(newService);
    setNewService({ title: '', description: '', status: 'active' });
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLink.name || !newLink.url) return;

    // Auto-add https:// if missing
    let formattedUrl = newLink.url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    addLink({ ...newLink, url: formattedUrl });
    setNewLink({ name: '', url: '', category: '' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button 
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'services' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Services
          </button>
          <button 
            onClick={() => setActiveTab('links')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'links' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:text-gray-900'}`}
          >
            External Links
          </button>
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'content' ? 'bg-brand-50 text-brand-700' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Site Content
          </button>
        </div>
      </div>

      {activeTab === 'services' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Service Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Plus size={20} className="text-brand-600" /> Add New Service
              </h3>
              <form onSubmit={handleAddService} className="space-y-4">
                <Input 
                  placeholder="Service Title" 
                  value={newService.title}
                  onChange={e => setNewService({...newService, title: e.target.value})}
                  required
                />
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                  rows={3}
                  placeholder="Description"
                  value={newService.description}
                  onChange={e => setNewService({...newService, description: e.target.value})}
                  required
                />
                <select 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                  value={newService.status}
                  onChange={e => setNewService({...newService, status: e.target.value as any})}
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
                <Button type="submit" className="w-full justify-center">Create Service</Button>
              </form>
            </Card>
          </div>

          {/* Service List */}
          <div className="lg:col-span-2 space-y-4">
            {services.map(service => (
              <div key={service.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row justify-between gap-4 group">
                {editingServiceId === service.id ? (
                  <div className="flex-grow space-y-2">
                    <Input 
                      value={service.title} 
                      onChange={(e) => updateService(service.id, { title: e.target.value })}
                    />
                    <Input 
                      value={service.description} 
                      onChange={(e) => updateService(service.id, { description: e.target.value })}
                    />
                     <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={service.status}
                      onChange={e => updateService(service.id, { status: e.target.value as any })}
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="flex gap-2">
                      <Button onClick={() => setEditingServiceId(null)} className="py-1 text-sm">Done</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-gray-900">{service.title}</h4>
                        <Badge status={service.status} />
                      </div>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setEditingServiceId(service.id)}
                        className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteService(service.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'links' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Globe size={20} className="text-brand-600" /> Add External Link
            </h3>
            <form onSubmit={handleAddLink} className="space-y-4">
              <Input 
                placeholder="Site Name" 
                value={newLink.name}
                onChange={e => setNewLink({...newLink, name: e.target.value})}
                required
              />
              <Input 
                placeholder="URL (e.g. authorize.qzz.io)" 
                type="text"
                value={newLink.url}
                onChange={e => setNewLink({...newLink, url: e.target.value})}
                required
              />
              <Input 
                placeholder="Category (Optional)" 
                value={newLink.category}
                onChange={e => setNewLink({...newLink, category: e.target.value})}
              />
              <Button type="submit" className="w-full justify-center">Add Link</Button>
            </form>
          </Card>

          <div className="space-y-3">
            {links.map(link => (
              <div key={link.id} className="bg-white p-3 rounded-lg border border-gray-200 flex items-center justify-between group">
                <div>
                  <div className="font-medium">{link.name}</div>
                  <div className="text-xs text-gray-400">{link.url}</div>
                  {link.category && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600 mt-1 inline-block">{link.category}</span>}
                </div>
                <button 
                  onClick={() => deleteLink(link.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            {links.length === 0 && <p className="text-gray-500 italic">No external links added.</p>}
          </div>
        </div>
      )}

      {activeTab === 'content' && (
        <div className="max-w-2xl mx-auto">
          <Card>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Settings size={20} className="text-brand-600" /> Website Content
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Welcome Headline</label>
                <Input 
                  value={tempConfig.welcomeMessage}
                  onChange={e => setTempConfig({...tempConfig, welcomeMessage: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About Description</label>
                <textarea 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none h-32"
                  value={tempConfig.aboutText}
                  onChange={e => setTempConfig({...tempConfig, aboutText: e.target.value})}
                />
              </div>
              
              <div className="space-y-4 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    <Search className="w-4 h-4" /> SEO Settings
                  </h4>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Page Title (Meta Title)</label>
                      <Input 
                          value={tempConfig.seoTitle}
                          onChange={e => setTempConfig({...tempConfig, seoTitle: e.target.value})}
                          placeholder="e.g. Authorize | Secure Portal"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                      <textarea 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
                          rows={2}
                          value={tempConfig.seoDescription}
                          onChange={e => setTempConfig({...tempConfig, seoDescription: e.target.value})}
                          placeholder="Short description for search engines"
                      />
                  </div>
                  <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Keywords (comma separated)</label>
                      <Input 
                          value={tempConfig.keywords}
                          onChange={e => setTempConfig({...tempConfig, keywords: e.target.value})}
                          placeholder="e.g. service, admin, secure"
                      />
                  </div>
              </div>

              <Button 
                onClick={() => updateConfig(tempConfig)}
                className="w-full justify-center"
              >
                <Save size={18} /> Save Changes
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;