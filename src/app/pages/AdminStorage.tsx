/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Trash2, 
  ExternalLink, 
  FileText, 
  Lock, 
  Plus, 
  LayoutGrid, 
  List as ListIcon,
  Search,
  Tag,
  Clock,
  ArrowRight,
  AlertTriangle,
  Info
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../components/Button';

export function AdminStorage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLocalMode, setIsLocalMode] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_storage_auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchItems();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
    
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_storage_auth', 'true');
      toast.success('Access granted');
      fetchItems();
    } else {
      toast.error('Incorrect password');
    }
  };

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/storage?action=list', {
        headers: {
          'Authorization': `Bearer ${adminToken()}`
        }
      }).catch(() => null);

      if (response && response.ok) {
        const data = await response.json();
        setIsLocalMode(false);
        const mappedItems = data.map((blob: any) => ({
          id: blob.url,
          title: blob.pathname.split('/').pop()?.split('-').slice(1).join('-') || blob.pathname,
          url: blob.url,
          createdAt: blob.uploadedAt,
          size: blob.size,
          tags: ['v-blob']
        }));
        setItems(mappedItems);
      } else {
        // FALLBACK: Use Local Storage if API fails (Local Dev)
        setIsLocalMode(true);
        const saved = localStorage.getItem('local_storage_sim');
        if (saved) {
          setItems(JSON.parse(saved));
        }
      }
    } catch (err) {
      setIsLocalMode(true);
    }
  };

  const adminToken = () => {
    return import.meta.env.VITE_ADMIN_STORAGE_TOKEN || 'admin123';
  };

  const handleDelete = async (url: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return;

    if (isLocalMode) {
      const updated = items.filter(i => i.url !== url);
      setItems(updated);
      localStorage.setItem('local_storage_sim', JSON.stringify(updated));
      toast.success('Local asset deleted');
      return;
    }

    try {
      const response = await fetch(`/api/storage?url=${encodeURIComponent(url)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminToken()}`
        }
      });

      if (response.ok) {
        toast.success('Asset deleted from Vercel');
        fetchItems();
      } else {
        toast.error('Deletion failed');
      }
    } catch (err) {
      toast.error('Delete error');
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);

    // LOCAL SIMULATION MODE
    if (isLocalMode) {
      setTimeout(() => {
        const newItem = {
          id: Date.now(), // Generate ID
          title: formData.title || selectedFile.name,
          description: formData.description,
          url: URL.createObjectURL(selectedFile), // Create local preview URL
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
          createdAt: new Date().toISOString()
        };
        
        const updated = [newItem, ...items];
        setItems(updated);
        localStorage.setItem('local_storage_sim', JSON.stringify(updated));
        
        setIsUploading(false);
        setSelectedFile(null);
        setFormData({ title: '', description: '', tags: '' });
        toast.success('Uploaded to Local Simulation (Works on Vercel)');
      }, 1000);
      return;
    }

    const form = new FormData();
    form.append('file', selectedFile);
    form.append('details', JSON.stringify({
      title: formData.title,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    }));

    try {
      const response = await fetch('/api/storage?action=upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken()}`
        },
        body: form
      });

      if (response.ok) {
        toast.success('Successfully uploaded to Vercel Blob');
        setFormData({ title: '', description: '', tags: '' });
        setSelectedFile(null);
        fetchItems();
      } else {
        toast.error('Vercel API error. Try running: npx vercel dev');
      }
    } catch (err) {
      toast.error('Network error. Switched to Local Simulation.');
      setIsLocalMode(true);
    } finally {
      setIsUploading(false);
    }
  };

  const filteredItems = items.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] w-full max-w-md border border-gray-100"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mb-6 rotate-3 shadow-inner">
              <Lock className="text-[#2563EB]" size={40} />
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Admin Vault</h1>
            <p className="text-gray-400 text-center mt-3 text-sm font-medium">Please verify your identity to access store</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Passphrase</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
            <Button variant="primary" className="w-full h-14 text-base shadow-lg shadow-blue-500/20" size="lg">
              Unlock Storage
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-11 h-11 bg-gradient-to-tr from-[#2563EB] to-[#14B8A6] rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Upload className="text-white" size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-[#0F172A] leading-tight">Storage Vault</h1>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${isLocalMode ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {isLocalMode ? 'Local Simulation Mode' : 'Connected to Vercel'}
                </span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              localStorage.removeItem('admin_storage_auth');
              setIsAuthenticated(false);
            }}
            className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-red-500 bg-gray-50 rounded-xl transition-all hover:bg-red-50"
          >
            SIGN OUT
          </button>
        </div>
      </header>

      {isLocalMode && (
        <div className="bg-amber-50 border-b border-amber-100 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center space-x-3 text-amber-700 text-sm font-medium">
            <AlertTriangle size={18} />
            <p>You are running in <b>Local Simulation Mode</b> because Vercel API is not found. To test real storage, run <code>npx vercel dev</code>.</p>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Column: Upload Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 sticky top-28">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-[#0F172A] flex items-center">
                  <Plus size={20} className="mr-2 text-[#2563EB]" />
                  Add Content
                </h2>
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                  <Info size={14} className="text-blue-500" />
                </div>
              </div>

              <form onSubmit={handleUpload} className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Asset Name</label>
                  <input 
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium"
                    placeholder="e.g. Agency Logo White"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Context / Details</label>
                  <textarea 
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium resize-none h-28"
                    placeholder="Where sould this be used?"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">Tags</label>
                  <div className="relative">
                    <Tag size={16} className="absolute left-4 top-4 text-gray-300" />
                    <input 
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 outline-none transition-all text-sm font-medium"
                      placeholder="logo, svg, agency"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-1">File Source</label>
                  <div className={`relative border-2 border-dashed rounded-3xl p-8 transition-all flex flex-col items-center justify-center group ${selectedFile ? 'border-emerald-200 bg-emerald-50/30' : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 bg-gray-50/50'}`}>
                    {selectedFile ? (
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-3">
                           <FileText className="text-emerald-500" size={28} />
                        </div>
                        <p className="text-sm font-bold text-emerald-600 truncate max-w-[200px]">{selectedFile.name}</p>
                        <button 
                          type="button"
                          onClick={() => setSelectedFile(null)}
                          className="mt-3 text-[10px] font-black text-gray-400 hover:text-red-500 uppercase tracking-tighter"
                        >
                          Cancel Upload
                        </button>
                      </motion.div>
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                          <Upload className="text-gray-300" size={24} />
                        </div>
                        <p className="text-xs font-bold text-gray-400 text-center px-4">DRAG FILE OR CLICK TO BROWSE</p>
                        <input 
                          type="file" 
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full h-14 text-sm font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20"
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Secure Save
                        <ArrowRight size={18} className="ml-2" />
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Search & Gallery */}
          <div className="lg:col-span-8">
            <div className="flex flex-col sm:flex-row gap-5 mb-10">
              <div className="relative flex-grow">
                <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find anything in your vault..."
                  className="w-full pl-16 pr-6 py-5 bg-white rounded-[2rem] border-none shadow-[0_10px_40px_rgba(0,0,0,0.03)] outline-none focus:ring-4 focus:ring-blue-50 transition-all font-medium text-lg placeholder:text-gray-300"
                />
              </div>
              <div className="flex bg-white p-2 rounded-2xl shadow-sm self-end sm:self-center">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-50 text-[#2563EB] shadow-inner' : 'text-gray-300 hover:bg-gray-50'}`}
                >
                  <LayoutGrid size={22} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-50 text-[#2563EB] shadow-inner' : 'text-gray-300 hover:bg-gray-50'}`}
                >
                  <ListIcon size={22} />
                </button>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'grid sm:grid-cols-2 gap-8' : 'flex flex-col gap-5'}>
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`bg-white group overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 ${
                      viewMode === 'grid' ? 'rounded-[2.5rem]' : 'rounded-3xl flex items-center p-5'
                    }`}
                  >
                    <div className={`relative bg-gray-50/50 flex items-center justify-center overflow-hidden ${
                      viewMode === 'grid' ? 'w-full h-56' : 'w-24 h-24 rounded-2xl flex-shrink-0 bg-gray-50'
                    }`}>
                      {item.url ? (
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <FileText size={viewMode === 'grid' ? 48 : 32} className="text-gray-200" />
                      )}
                      
                      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/60 to-transparent flex justify-center gap-3">
                        <a href={item.url} target="_blank" rel="noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-white hover:text-blue-600 transition-all">
                          <ExternalLink size={20} />
                        </a>
                        <button 
                          onClick={() => handleDelete(item.url)}
                          className="p-3 bg-white/20 backdrop-blur-md rounded-2xl text-white hover:bg-red-500 transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className={`p-7 ${viewMode === 'list' ? 'flex-grow px-8' : ''}`}>
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-[#0F172A] truncate leading-none uppercase tracking-tight">{item.title}</h3>
                        {viewMode === 'list' && (
                          <div className="flex gap-2">
                             <a href={item.url} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-blue-600 bg-gray-50 rounded-lg">
                              <ExternalLink size={18} />
                            </a>
                            <button onClick={() => handleDelete(item.url)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-lg uppercase">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className={`text-sm text-gray-400 font-medium ${viewMode === 'list' ? 'mb-0' : 'mb-6'} line-clamp-2`}>
                        {item.description || 'No context provided for this asset.'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {item.tags?.map((tag: string) => (
                          <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 border border-gray-100 rounded-lg text-[10px] font-black uppercase tracking-widest">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {viewMode === 'grid' && (
                        <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                           <div className="flex items-center text-[11px] font-bold text-gray-300">
                            <Clock size={14} className="mr-2" />
                            {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                           </div>
                           <div className="px-3 py-1 bg-blue-50 rounded-lg text-[9px] font-black text-blue-500 uppercase tracking-widest">
                             ENCRYPTED
                           </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div className="bg-white rounded-[3rem] p-24 border border-gray-100 border-dashed flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-6 shadow-inner">
                  <Search className="text-gray-200" size={40} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Vault is empty</h3>
                <p className="text-gray-400 font-medium text-sm">No assets found matching your search</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-6 font-bold text-xs text-[#2563EB] hover:tracking-widest transition-all uppercase"
                >
                  [ Clear Filter ]
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
