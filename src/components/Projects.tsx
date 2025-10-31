import React, { useEffect, useState } from 'react';
import { Search, FolderPlus, X } from 'lucide-react';
import { getUserProjects, createProject, type Project } from '../services/projectService';
import { getCookie } from '../services/userService';

const Projects: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'empty' | 'grid'>('empty');
  const [folderView, setFolderView] = useState<string | null>(null);
  const [selected, setSelected] = useState<null | { name: string; meta: string }>(null);
  // New: backend-driven projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newImage, setNewImage] = useState('');

  const clearSearch = () => setQuery('');

  // Load user's projects from backend
  useEffect(() => {
    const uidCookie = getCookie('user_id');
    const uid = uidCookie ? parseInt(uidCookie, 10) : NaN;
    if (!uid || Number.isNaN(uid)) { setLoading(false); return; }
    (async () => {
      try {
        const res = await getUserProjects(uid);
        setProjects(res?.data || []);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCreate = async () => {
    const uidCookie = getCookie('user_id');
    const uid = uidCookie ? parseInt(uidCookie, 10) : NaN;
    if (!uid || Number.isNaN(uid)) return;
    if (!newName.trim()) return;
    try {
      setCreating(true);
      const res = await createProject({ user_id: uid, project_name: newName.trim(), image_url: newImage.trim() || undefined });
      if (res?.success && res.data) {
        setProjects((p) => [res.data!, ...p]);
        setShowCreate(false);
        setNewName('');
        setNewImage('');
      }
    } catch (e) {
      // optionally show notice
    } finally {
      setCreating(false);
    }
  };

  // Early return: show only user's projects
  return (
    <div className="px-4 lg:px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
            <button onClick={() => setShowCreate(true)} className="ml-3 inline-flex items-center gap-2 px-3 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-900">
              <FolderPlus className="h-4 w-4" /> New Project
            </button>
          </div>

          {/* Create dialog */}
          {showCreate && (
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/40">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder="Project name" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                <input value={newImage} onChange={(e)=>setNewImage(e.target.value)} placeholder="Cover image URL (optional)" className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                <div className="flex items-center gap-2">
                  <button disabled={creating || !newName.trim()} onClick={handleCreate} className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm disabled:opacity-60">{creating ? 'Creating…' : 'Create'}</button>
                  <button onClick={()=>{setShowCreate(false); setNewName(''); setNewImage('');}} className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-sm">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="p-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({length:6}).map((_,i)=> (
                  <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 animate-pulse">
                    <div className="h-28 bg-gray-100 dark:bg-gray-800 rounded mb-3" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-40 mb-2" />
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-28" />
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-10">
                <div className="mx-auto w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center mb-4">📁</div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">No projects yet</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto mb-5">Create your first project to get started.</p>
                <button onClick={()=>setShowCreate(true)} className="inline-flex items-center gap-2 px-3.5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-900">
                  <FolderPlus className="h-4 w-4" /> Create project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects
                  .filter(p => !query || p.project_name.toLowerCase().includes(query.toLowerCase()))
                  .map((p) => (
                  <div key={p.project_id} className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 hover-lift-md hover-glow transition bg-white dark:bg-gray-800">
                    <div className="h-32 rounded bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden mb-3">
                      {p.image_url ? <img src={p.image_url} className="w-full h-full object-cover" /> : <span className="text-3xl">📁</span>}
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{p.project_name}</div>
                    <div className="text-[11px] text-gray-500">Created {new Date(p.created_at).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
