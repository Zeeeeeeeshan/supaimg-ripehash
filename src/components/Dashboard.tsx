import React, { useEffect, useState } from 'react';
import { User, Home, Folder, Database, Shield, Settings, Plus, MoreVertical, ChevronRight, X, Menu, Image } from 'lucide-react';
import Gallery from './Gallery';
import ApiConnections from './ApiConnections';
import Projects from './Projects';
import Auth from './Auth';
import { supabase } from '../lib/supabaseClient';

interface DashboardProps {
  onBack: () => void;
  onNavigateToApi?: () => void;
}

const Dashboard = ({ onNavigateToApi }: DashboardProps) => {
  const [activeFilter, setActiveFilter] = useState('home');
  
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  // Context menu state for three-dot options
  const [openMenu, setOpenMenu] = useState<{ type: 'recent' | 'file'; id: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'system' | 'light' | 'dark'>('system');

  const applyTheme = (mode: 'system' | 'light' | 'dark') => {
    try { localStorage.setItem('supaimg_theme', mode); } catch {}
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark);
    const root = document.documentElement;
    // Add transient class to animate theme change
    root.classList.add('theme-switching');
    if (isDark) root.classList.add('dark'); else root.classList.remove('dark');
    // Remove the switching class after animation duration
    window.setTimeout(() => {
      root.classList.remove('theme-switching');
    }, 320);
  };

  useEffect(() => { applyTheme(themeMode); }, [themeMode]);

  // Seed default to system for first-time visitors
  useEffect(() => {
    try {
      const saved = localStorage.getItem('supaimg_theme');
      if (!saved) localStorage.setItem('supaimg_theme', 'system');
    } catch {}
  }, []);

  const toggleMenu = (type: 'recent' | 'file', id: string) => {
    setOpenMenu((prev) => (prev && prev.type === type && prev.id === id ? null : { type, id }));
  };

  const closeMenu = () => setOpenMenu(null);

  // Get current Supabase user email and listen for auth changes; fallback to localStorage
  useEffect(() => {
    let mounted = true;
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (mounted) {
        const ls = (() => { try { return localStorage.getItem('supaimg_email'); } catch { return null; } })();
        setUserEmail(data.user?.email ?? ls ?? null);
      }
    };
    loadUser();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const effectiveEmail = userEmail ?? (() => { try { return localStorage.getItem('supaimg_email'); } catch { return null; } })() ?? null;
  const effectiveName = effectiveEmail ? (effectiveEmail.split('@')[0] || 'User') : 'User';

  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: 'Home', id: 'home' },
    { icon: <Image className="h-5 w-5" />, label: 'Gallery', id: 'gallery' },
    { icon: <Folder className="h-5 w-5" />, label: 'Projects', id: 'projects' },
    { icon: <Database className="h-5 w-5" />, label: 'Manage API', id: 'api' },
    { icon: <Shield className="h-5 w-5" />, label: 'Auth', id: 'auth' }
  ];

  const projects = [
    { id: 1, name: 'Project 1', color: 'bg-gray-100', iconSrc: '/file-1.png' },
    { id: 2, name: 'Project 2', color: 'bg-red-100', iconSrc: '/file-2.png' },
    { id: 3, name: 'Project 3', color: 'bg-green-100', iconSrc: '/file-3.png' },
    { id: 4, name: 'Project 4', color: 'bg-yellow-100', iconSrc: '/file-4.png' }
  ];

  const recentImages = [
    {
      id: '1',
      name: 'Image123.png',
      project: 'Project 1',
      url: '/2.png',
      provider: 'aws',
      time: '10 min ago'
    },
    {
      id: '2', 
      name: 'Image123.png',
      project: 'Project 1',
      url: '/2.png',
      provider: 'cloudinary',
      time: '30 min ago'
    },
    {
      id: '3',
      name: 'Image123.png', 
      project: 'Project 3',
      url: '/3.png',
      provider: 'cloudinary',
      time: '30 min ago'
    },
    {
      id: '4',
      name: 'Image123.png',
      project: 'Project 1', 
      url: '/4.png',
      provider: 'aws',
      time: '30 min ago'
    }
  ];

  const fileList = [
    { name: 'Image_02_x.png', project: 'Project 1', date: '17 aug 2023', size: '144 kb', favorite: false },
    { name: 'Image_1_x.png', project: 'Project 1', date: '17 aug 2023', size: '144 kb', favorite: true },
    { name: 'Image_02_x.png', project: 'Project 1', date: '17 aug 2023', size: '144 kb', favorite: false },
    { name: 'Image_02_x.png', project: 'Project 1', date: '17 aug 2023', size: '144 kb', favorite: true },
    { name: 'Image_02_x.png', project: 'Project 1', date: '17 aug 2023', size: '144 kb', favorite: false },
    { name: 'Image_02_x.png', project: 'Project 1', date: '17 aug 2023', size: '144 kb', favorite: false }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      // Append to existing selections
      setSelectedFiles((prev) => [...prev, ...fileArray]);
      // Append new preview URLs
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setFilePreviews((prev) => [...prev, ...previews]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      // Append to existing selections
      setSelectedFiles((prev) => [...prev, ...fileArray]);
      // Append new preview URLs
      const previews = fileArray.map((file) => URL.createObjectURL(file));
      setFilePreviews((prev) => [...prev, ...previews]);
    }
  };

  const getTotalFileSize = () => {
    const totalBytes = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(1); // Convert to MB
  };

  return (
    <div className="min-h-screen bg-transparent dark:bg-transparent dashboard-rounded">

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-transparent text-gray-900 dark:text-white border-b-0">
        <div className="flex items-center h-16">
          {/* Left side - Logo section (width matches sidebar) */}
          <div className={`${sidebarCollapsed ? 'w-16 px-0 justify-center' : 'w-64 px-4'} py-3 flex items-center ${sidebarCollapsed ? 'space-x-0' : 'space-x-3'} overflow-hidden transition-[width] duration-300`}>
            {/* Hamburger menu for mobile */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            {/* Logo */}
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2'}`}>
              <button
                className={`${sidebarCollapsed ? 'w-10 h-10' : 'w-8 h-8'} rounded overflow-hidden flex items-center justify-center focus:outline-none`}
                onClick={() => { if (sidebarCollapsed) setSidebarCollapsed(false); }}
                aria-label="Expand sidebar"
                title={sidebarCollapsed ? 'Expand sidebar' : undefined}
              >
                <img src="/logo.png" alt="Supaimg" className={`${sidebarCollapsed ? 'w-10 h-10' : 'w-8 h-8'} object-contain`} />
              </button>
              {!sidebarCollapsed && (
                <>
                  <span className="text-xl font-bold text-gray-900">supaimg</span>
                  {/* Split View toggle button (expanded only) */}
                  <button
                    className="ml-3 p-1 rounded hover:bg-gray-100 inline-flex group"
                    onClick={() => setSidebarCollapsed(true)}
                    aria-label="Collapse sidebar"
                    title="Collapse sidebar"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-opacity duration-150 opacity-80 group-hover:opacity-100">
                      <rect x="3" y="5" width="18" height="14" rx="5" ry="5" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                      <line x1="12" y1="6" x2="12" y2="18" stroke="#9CA3AF" strokeWidth="2" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right side - Choose File only */}
          <div className="flex-1 flex items-center justify-end px-6 py-3">
            <div className="ml-0">
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Choose File</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {settingsOpen && (
        <div className="fixed inset-0 z-[120]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setSettingsOpen(false)} />
          {/* Dialog */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header Row */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="text-sm font-medium">Settings</div>
                <button onClick={() => setSettingsOpen(false)} className="px-2 py-1 rounded border border-gray-300 text-gray-600 hover:bg-gray-100">Close</button>
              </div>
              <div className="flex">
                {/* Left Nav */}
                <div className="w-56 bg-white border-r border-gray-200 p-3 space-y-1">
                  {['General','Notifications','Personalization','Connected apps','Data controls','Security','Account'].map((item, idx) => (
                    <button key={item} className={`w-full text-left px-3 py-2 rounded-lg text-sm ${idx===0 ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}>{item}</button>
                  ))}
                </div>
                {/* Right Panel */}
                <div className="flex-1 p-4">
                  <h3 className="text-sm font-semibold mb-3">General</h3>
                  <div className="divide-y divide-gray-200 rounded-xl overflow-hidden border border-gray-200">
                    <div className="grid grid-cols-3 gap-3 items-center px-4 py-3 bg-gray-50">
                      <div className="text-sm text-gray-700">Theme</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
                          {(['system','light','dark'] as const).map(m => (
                            <button
                              key={m}
                              onClick={() => setThemeMode(m)}
                              className={`px-3 py-1.5 text-xs ${themeMode===m ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'}`}
                            >{m}</button>
                          ))}
                        </div>
                        <span className="text-sm text-gray-900 capitalize">{themeMode}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-center px-4 py-3">
                      <div className="text-sm text-gray-700">Accent color</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="text-sm text-gray-900">Default</span>
                        <button className="px-2 py-1 text-xs rounded border border-gray-300">Change</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-center px-4 py-3 bg-gray-50">
                      <div className="text-sm text-gray-700">Language</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="text-sm text-gray-900">Auto-detect</span>
                        <button className="px-2 py-1 text-xs rounded border border-gray-300">Change</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-center px-4 py-3">
                      <div className="text-sm text-gray-700">Spoken language</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <span className="text-sm text-gray-900">Auto-detect</span>
                        <button className="px-2 py-1 text-xs rounded border border-gray-300">Change</button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 items-center px-4 py-3 bg-gray-50">
                      <div className="text-sm text-gray-700">Voice</div>
                      <div className="col-span-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button className="px-2 py-1 text-xs rounded border border-gray-300">Play</button>
                          <span className="text-sm text-gray-900">Cove</span>
                        </div>
                        <button className="px-2 py-1 text-xs rounded border border-gray-300">Change</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {upgradeOpen && (
        <div className="fixed inset-0 z-[120]">
          {/* Backdrop with subtle blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setUpgradeOpen(false)} />
          {/* Dialog */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-5xl bg-white dark:bg-black text-gray-900 dark:text-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/20 animate-[pop_260ms_cubic-bezier(0.2,0.8,0.2,1)]">
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-gray-200 dark:border-white/20">
                <button onClick={() => setUpgradeOpen(false)} aria-label="Close" className="absolute right-6 top-5 p-1 rounded border border-gray-300 dark:border-white/30 text-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                  <X className="h-4 w-4" />
                </button>
                <h2 className="text-xl font-semibold text-center">Upgrade your plan</h2>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <button className="px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">Personal</button>
                  <button className="px-3 py-1.5 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">Business</button>
                </div>
              </div>
              {/* Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Free Card */}
                <div className="rounded-2xl border border-gray-200 dark:border-white/20 p-5 bg-gray-50/60 dark:bg-white/5">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-white/70">Free</div>
                    <span className="text-[10px] px-2 py-1 rounded-full border border-gray-300 dark:border-white/30 text-gray-600 dark:text-white/80">Current</span>
                  </div>
                  <div className="mt-2 text-3xl font-semibold">₹ 0</div>
                  <div className="text-xs text-gray-500 dark:text-white/70">INR / month</div>
                  <button className="mt-4 w-full py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/15 dark:border dark:border-white/20">Your current plan</button>
                  <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-white/85">
                    <li>• Access to core features</li>
                    <li>• Limited file uploads</li>
                    <li>• Standard generation speed</li>
                  </ul>
                </div>
                {/* Business Card */}
                <div className="relative rounded-2xl border border-gray-200 dark:border-white/20 p-5 bg-white dark:bg-black">
                  <span className="absolute -top-2 right-4 text-[10px] px-2 py-1 rounded-full bg-gray-900 text-white dark:bg-white dark:text-black">Recommended</span>
                  <div className="text-sm text-gray-500 dark:text-white/70 mb-1">Business</div>
                  <div className="text-3xl font-semibold">₹ 2,099</div>
                  <div className="text-xs text-gray-500 dark:text-white/70 mb-4">INR / month (excl. GST)</div>
                  <button className="w-full py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/40 border border-gray-900 dark:border-white">Purchase</button>
                  <ul className="mt-5 space-y-2 text-sm text-gray-700 dark:text-white/85">
                    <li>• Faster processing</li>
                    <li>• Team workspace & roles</li>
                    <li>• Priority support</li>
                    <li>• Integrations & SSO</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex pt-16">
        {/* Sidebar: hidden on mobile, flex on lg+ */}
        <div className={`hidden lg:flex ${sidebarCollapsed ? 'w-16' : 'w-64'} overflow-hidden transition-[width] duration-300 bg-white dark:bg-transparent text-gray-900 dark:text-white flex-col min-h-[calc(100vh-4rem)] sticky top-16 self-start`}>
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveFilter(item.id);
                }}
                className={`relative group flex ${sidebarCollapsed ? 'justify-center' : 'items-center'} w-full py-2.5 px-3 rounded-lg transition font-medium text-sm focus:outline-none focus-visible:outline-none ${
                  activeFilter === item.id
                    ? 'text-gray-900 dark:text-white bg-transparent ring-1 ring-gray-900/10 dark:ring-white/15'
                    : 'text-gray-700 dark:text-white hover:bg-white/5 hover:ring-1 hover:ring-gray-900/10 dark:hover:ring-white/15'
                }`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <span className={`${activeFilter === item.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'} group-hover:text-gray-900 dark:group-hover:text-white`}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && <span className="ml-3 group-hover:text-gray-900 dark:group-hover:text-white">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* Bottom account row: S avatar + Upgrade */}
          <div className="px-4 pb-6">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'}`}>
              <button
                onClick={() => setSettingsOpen(true)}
                className={`flex items-center ${sidebarCollapsed ? '' : 'gap-2'} focus-visible:outline-none`}
                title="Open settings"
              >
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-semibold">
                  {(effectiveName || 'S').charAt(0).toUpperCase()}
                </div>
                {!sidebarCollapsed && (
                  <div className="text-left">
                    <div className="text-xs text-gray-900 dark:text-white/90">{(effectiveName || 'Sup').charAt(0).toUpperCase()}</div>
                    <div className="text-[10px] text-gray-600 dark:text-white/60">Free</div>
                  </div>
                )}
              </button>

              {!sidebarCollapsed && (
                <button
                  className="px-3 py-1 text-xs border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-white/10"
                  onClick={() => setUpgradeOpen(true)}
                >
                  Upgrade
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Drawer Sidebar */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setDrawerOpen(false)}></div>
            {/* Drawer */}
            <div className="relative w-64 max-w-full bg-white h-full shadow-xl flex flex-col">
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded overflow-hidden flex items-center justify-center">
                    <img src="/logo.png" alt="Supaimg" className="h-8 w-8 object-contain" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">supaimg</span>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="p-2 text-gray-600 hover:text-gray-900">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <nav className="flex-1 px-3 py-5 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveFilter(item.id);
                      setDrawerOpen(false);
                    }}
                    className={`relative dashboard-pill flex items-center w-full py-2.5 px-3 transition text-sm font-medium ${
                      activeFilter === item.id
                        ? 'text-gray-900 bg-transparent ring-1 ring-gray-900/10'
                        : 'text-gray-700 hover:bg-white/5 hover:ring-1 hover:ring-gray-900/10'
                    }`}
                  >
                    <span className={activeFilter === item.id ? 'text-blue-600' : 'text-gray-400'}>
                      {item.icon}
                    </span>
                    <span className="ml-3">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Settings section at bottom */}
              <div className="px-4 pb-6">
                <button className="flex items-center w-full py-3 px-3 rounded-lg transition font-medium text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="h-9 w-9 text-gray-700" />
                  <span className="ml-3">Setting</span>
                </button>
                
                {/* Version info */}
                <div className="mt-6 px-3">
                  <p className="text-xs text-gray-500">Version Beta 1.02</p>
                  <div className="flex items-center mt-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                      <User className="h-3 w-3 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{effectiveName}</p>
                      <p className="text-xs text-gray-500">{effectiveEmail || '—'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={`flex-1 bg-transparent dark:bg-transparent text-[14px] text-gray-900 dark:text-white ${activeFilter === 'gallery' ? 'lg:h-[calc(100vh-4rem)] overflow-auto lg:overflow-hidden' : 'pb-28'}`}>
          {/* Welcome + Projects only on Home */}
          {activeFilter === 'home' && (
          <div className="px-4 lg:px-6 py-4">
            <div className="mb-6">
              <h1 className="text-xl font-bold text-gray-900 mb-1">Welcome Back!</h1>
              <p className="text-gray-600 text-sm">Let's have fun uploading images.</p>
            </div>

            {/* Projects Section */}
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg p-2.5 border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow cursor-pointer h-14">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="w-5 h-5 rounded flex items-center justify-center overflow-hidden">
                        <img src={project.iconSrc} alt={project.name} className="w-5 h-5 object-contain" />
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100">
                        <MoreVertical className="h-3 w-3" />
                      </button>
                    </div>
                    <h3 className="text-xs font-medium text-gray-900 dark:text-gray-100">{project.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Gallery Route */}
          {activeFilter === 'gallery' && (
            <div className="px-4 lg:px-6 py-4">
              <Gallery />
            </div>
          )}

          {/* Projects Route */}
          {activeFilter === 'projects' && (
            <div className="px-4 lg:px-6 py-4">
              <Projects />
            </div>
          )}

          {/* Manage API Route */}
          {activeFilter === 'api' && (
            <div className="px-4 lg:px-6 py-4">
              <ApiConnections onBack={() => setActiveFilter('home')} embedded />
            </div>
          )}

          {/* Auth Route */}
          {activeFilter === 'auth' && (
            <div className="px-4 lg:px-6 py-4">
              <Auth />
            </div>
          )}

          {/* Recent Activity Section (Home only) */}
          {activeFilter === 'home' && (
          <div className="px-4 lg:px-6 py-4">
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900 mb-3 animate-fadeInUp">Recent Activity</h2>
              <div className="grid grid-cols-4 gap-3">
                {recentImages.map((image, idx) => (
                  <div key={image.id} className="bg-white rounded-lg w-[240px] hover-lift-md hover-glow animate-fadeInUp" style={{ animationDelay: `${idx * 60}ms` }}>
                    <div className="relative bg-gray-100 overflow-hidden rounded-lg h-[160px] w-[240px]">
                      <img src={image.url} alt={image.name} className="w-full h-full object-cover" />
                      {/* Provider badge */}
                      {image.provider && (
                        <div className="absolute top-2 left-2 bg-white/95 backdrop-blur px-2 py-1 rounded-md shadow-sm flex items-center">
                          <img
                            src={image.provider === 'aws' ? '/aws copy.png' : '/cloudinary.png'}
                            alt={image.provider}
                            className="h-4 w-4 object-contain"
                          />
                        </div>
                      )}
                      {/* three dots */}
                      <div className="absolute top-1.5 right-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleMenu('recent', image.id); }}
                          className="text-white/90 hover:text-white p-1 rounded"
                        >
                          <MoreVertical className="h-4 w-4 drop-shadow" />
                        </button>
                        {openMenu && openMenu.type === 'recent' && openMenu.id === image.id && (
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20" onMouseLeave={closeMenu}>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { closeMenu(); alert('Share clicked'); }}>Share</button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { closeMenu(); alert('Saved'); }}>Save</button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { navigator.clipboard?.writeText(image.url); closeMenu(); }}>Copy link</button>
                          </div>
                        )}
                      </div>
                      {/* bottom overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-3">
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg"></div>
                        <div className="relative z-10 flex items-end justify-between">
                          <div>
                            <div className="text-white text-xs font-medium leading-tight">{image.name}</div>
                            <div className="text-white/80 text-[11px]">{image.time}</div>
                          </div>
                          <div className="bg-white/95 backdrop-blur px-2 py-1 rounded-md shadow-sm text-xs text-gray-800 flex items-center space-x-1">
                            <span className="w-4 h-4 rounded bg-white text-gray-700 flex items-center justify-center">📁</span>
                            <span className="text-[11px]">Project 1</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          )}

          {/* Your Files Section (Home only) */}
          {activeFilter === 'home' && (
          <div className="px-3 sm:px-4 lg:px-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-3">Your files</h2>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                {/* Table Header */}
                <div className="overflow-x-auto">
                  <div className="min-w-[720px] grid grid-cols-12 gap-3 px-4 py-2.5 bg-gray-50 border-b border-gray-200 text-sm font-medium text-gray-600">
                  <div className="col-span-1">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                    />
                  </div>
                  <div className="col-span-4">File Name</div>
                  <div className="col-span-2 hidden md:block">Project</div>
                  <div className="col-span-2 hidden md:block">Date</div>
                  <div className="col-span-2 hidden md:block">Size</div>
                  <div className="col-span-1 text-center">Action</div>
                  </div>
                </div>
                
                {/* Table Rows */}
                <div className="overflow-x-auto">
                  {fileList.map((file, index) => (
                    <div
                      key={index}
                      className="min-w-[720px] grid grid-cols-12 gap-3 px-4 py-2.5 border-b border-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 items-center animate-fadeInUp"
                      style={{ animationDelay: `${index * 40}ms` }}
                    >
                      <div className="col-span-1">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                        />
                      </div>
                      <div className="col-span-4 flex items-center">
                        <div className="w-7 h-7 bg-gray-100 rounded mr-2.5 flex items-center justify-center">
                          <img src="/api/placeholder/32/32" alt="" className="w-5 h-5 object-cover rounded" />
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                          {file.favorite && <span className="ml-2 text-yellow-500">🔥</span>}
                        </div>
                      </div>
                      <div className="col-span-2 hidden md:flex items-center">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          file.project === 'Project 1' ? 'bg-gray-400' : 'bg-green-400'
                        }`}></span>
                        <span className="text-xs text-gray-600">{file.project}</span>
                      </div>
                      <div className="col-span-2 hidden md:block text-xs text-gray-600">{file.date}</div>
                      <div className="col-span-2 hidden md:block text-xs text-gray-600">{file.size}</div>
                      <div className="col-span-1 flex justify-center relative">
                        <button
                          className="text-gray-400 hover:text-gray-600 p-1 rounded"
                          onClick={(e) => { e.stopPropagation(); toggleMenu('file', `${index}`); }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenu && openMenu.type === 'file' && openMenu.id === `${index}` && (
                          <div className="absolute right-0 top-6 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-20" onMouseLeave={closeMenu}>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { closeMenu(); alert('Share clicked'); }}>Share</button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { closeMenu(); alert('Saved'); }}>Save</button>
                            <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50" onClick={() => { navigator.clipboard?.writeText(window.location.href + '#'+ encodeURIComponent(file.name)); closeMenu(); }}>Copy link</button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          )}

          {/* Fixed Bottom Upload Footer removed as requested */}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Close button */}
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Large drag and drop area */}
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-20 text-center mb-6 cursor-pointer hover:border-gray-400 transition-colors"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <div className="mb-6">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  <p className="text-lg text-gray-600 mb-2">Drag and drop an image, or click to upload</p>
                </div>
              </div>

              {/* Selected images display outside the box */}
              {selectedFiles.length > 0 && (
                <div className="mb-6">
                  {/* Image thumbnails */}
                  <div className="grid grid-cols-6 gap-4 mb-4">
                    {filePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={preview} 
                          alt={`Preview ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg border border-gray-200"
                        />
                      </div>
                    ))}
                  </div>
                  {/* Upload stats */}
                  <div className="flex items-center justify-end space-x-4 text-sm text-gray-600">
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">No Errors</span>
                    <span>{selectedFiles.length} images</span>
                    <span>{getTotalFileSize()} MB</span>
                  </div>
                </div>
              )}
              
              {/* Hidden file input */}
              <input
                id="fileInput"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {/* File size info */}
              <p className="text-sm text-gray-500 mb-6">Max file size: 500MB. Supported formats: JPG, PNG, GIF.</p>

              {/* Project and AWS selection */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center justify-between px-6 py-3 border border-gray-200 rounded-xl w-64 h-16">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-md flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">Project Default</div>
                        <div className="text-xs text-gray-500">Active project</div>
                      </div>
                    </div>
                    <span className="text-sm text-blue-600 cursor-pointer hover:underline">Change</span>
                  </div>
                  
                  
                  <div className="flex items-center justify-between px-6 py-3 border border-gray-200 rounded-xl w-64 h-16">
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 rounded-md overflow-hidden">
                        <img 
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/512px-Amazon_Web_Services_Logo.svg.png" 
                          alt="AWS" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">AWS Bucket</div>
                        <div className="text-xs text-gray-500">supaimg.s3</div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>

                {/* Upload button */}
                <button 
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedFiles.length > 0 
                      ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer' 
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                  disabled={selectedFiles.length === 0}
                  onClick={() => {
                    if (selectedFiles.length > 0) {
                      // Handle upload logic here
                      console.log('Uploading files:', selectedFiles);
                      setShowUploadModal(false);
                      setSelectedFiles([]);
                      setFilePreviews([]);
                    }
                  }}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;