import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Project, Category } from '../types';
import { Plus, Trash2, Edit2, X, LogOut, Palette, Upload, Image as ImageIcon } from 'lucide-react';
import { motion } from 'motion/react';

const Admin = () => {
  const { projects, theme, addProject, updateProject, deleteProject, updateTheme, logout } = useAppContext();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'theme'>('content');

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    category: 'commercial',
    description: '',
    imageUrl: '',
    images: [],
    date: new Date().toISOString().split('T')[0],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isGallery = false) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isGallery) {
          setFormData(prev => ({ ...prev, images: [...(prev.images || []), base64String] }));
        } else {
          setFormData(prev => ({ ...prev, imageUrl: base64String }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (editingId) {
        await updateProject(editingId, formData);
        setEditingId(null);
      } else {
        await addProject(formData);
        setIsAdding(false);
      }
      setFormData({
        title: '',
        category: 'commercial',
        description: '',
        imageUrl: '',
        images: [],
        date: new Date().toISOString().split('T')[0],
      });
    } catch (error) {
      alert('저장 중 오류가 발생했습니다. 파일 크기가 너무 클 수 있습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (project: Project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      imageUrl: project.imageUrl,
      images: project.images || [],
      date: project.date,
    });
    setIsAdding(true);
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif mb-2">Admin Dashboard</h1>
            <p className="text-stone-500">사이트 콘텐츠 및 테마를 관리하세요.</p>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-stone-400 hover:text-black transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </header>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-black text-white' : 'bg-white text-stone-400 border border-black/5'}`}
          >
            Content Management
          </button>
          <button 
            onClick={() => setActiveTab('theme')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'theme' ? 'bg-black text-white' : 'bg-white text-stone-400 border border-black/5'}`}
          >
            Theme Settings
          </button>
        </div>

        {activeTab === 'content' ? (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-serif">Projects</h2>
              {!isAdding && (
                <button 
                  onClick={() => setIsAdding(true)}
                  className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  <Plus size={18} /> Add Project
                </button>
              )}
            </div>

            {isAdding && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Title</label>
                    <input 
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Category</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value as Category})}
                      className="w-full px-4 py-2 rounded-lg border border-stone-200"
                    >
                      <option value="commercial">Commercial</option>
                      <option value="residential">Residential</option>
                      <option value="hotel">Hotel</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Main Image</label>
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors text-sm font-bold">
                        <Upload size={16} /> Upload File
                        <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e)} />
                      </label>
                      <span className="text-xs text-stone-400">OR</span>
                      <input 
                        type="text" 
                        value={formData.imageUrl}
                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                        className="flex-1 px-4 py-2 rounded-lg border border-stone-200"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    {formData.imageUrl && (
                      <div className="mt-4 relative w-32 h-32">
                        <img src={formData.imageUrl} className="w-full h-full object-cover rounded-lg border" referrerPolicy="no-referrer" />
                        <button onClick={() => setFormData({...formData, imageUrl: ''})} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg">
                          <X size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Gallery Images (Multiple)</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <label className="aspect-square cursor-pointer flex flex-col items-center justify-center gap-2 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl hover:bg-stone-100 transition-colors">
                        <Plus size={24} className="text-stone-300" />
                        <span className="text-[10px] font-bold text-stone-400">Add Photos</span>
                        <input type="file" multiple accept="image/*" className="hidden" onChange={e => handleFileChange(e, true)} />
                      </label>
                      {(formData.images || []).map((img, idx) => (
                        <div key={idx} className="relative aspect-square group">
                          <img src={img} className="w-full h-full object-cover rounded-xl border" referrerPolicy="no-referrer" />
                          <button 
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, images: (prev.images || []).filter((_, i) => i !== idx) }))}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-stone-200 h-32"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => { setIsAdding(false); setEditingId(null); }}
                    className="px-6 py-2 rounded-lg text-sm font-bold border border-stone-200"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`px-6 py-2 rounded-lg text-sm font-bold bg-black text-white flex items-center gap-2 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      editingId ? 'Update Project' : 'Save Project'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-stone-50 border-b border-black/5">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Project</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Gallery</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Category</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400">Date</th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-stone-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {projects.map(project => (
                    <tr key={project.id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={project.imageUrl} className="w-12 h-12 rounded object-cover" referrerPolicy="no-referrer" />
                          <span className="font-medium">{project.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-stone-400">
                          <ImageIcon size={14} />
                          <span className="text-sm font-bold">{project.images?.length || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-500 capitalize">{project.category}</td>
                      <td className="px-6 py-4 text-sm text-stone-500">{project.date}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => startEdit(project)} className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteProject(project.id)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-2xl border border-black/5 shadow-sm max-w-2xl space-y-8">
            <h2 className="text-2xl font-serif">Theme Customization</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Site Title</label>
                <input 
                  type="text" 
                  value={theme.siteTitle}
                  onChange={e => updateTheme({ siteTitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Primary Color</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="color" 
                    value={theme.primaryColor}
                    onChange={e => updateTheme({ primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-lg border-0 p-0 cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={theme.primaryColor}
                    onChange={e => updateTheme({ primaryColor: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-lg border border-stone-200 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Font Family</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['sans', 'serif', 'mono'] as const).map(font => (
                    <button
                      key={font}
                      onClick={() => updateTheme({ fontFamily: font })}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium capitalize transition-all ${
                        theme.fontFamily === font ? 'bg-black text-white border-black' : 'bg-white text-stone-500 border-stone-200 hover:border-black'
                      }`}
                    >
                      {font}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Logo URL (Optional)</label>
                <input 
                  type="text" 
                  value={theme.logoUrl || ''}
                  onChange={e => updateTheme({ logoUrl: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-stone-200"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div className="pt-6 border-t border-black/5">
              <div className="p-6 rounded-xl bg-stone-50 border border-black/5">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <Palette size={16} /> Preview
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.primaryColor }}></div>
                    <span className="text-sm font-medium" style={{ fontFamily: theme.fontFamily }}>
                      The quick brown fox jumps over the lazy dog.
                    </span>
                  </div>
                  <button 
                    className="px-4 py-2 rounded text-xs font-bold text-white"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    Sample Button
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
