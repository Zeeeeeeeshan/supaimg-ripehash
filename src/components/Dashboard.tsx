import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Search, Grid3X3, List, Plus, Upload, Link, 
  MoreVertical, Download, Share2, Trash2, Eye, Calendar,
  Filter, SortAsc, User, Bell, Settings, HelpCircle,
  Image, FileText, Video, Music, Archive, Folder, Copy,
  ExternalLink, Edit, Star, Clock, TrendingUp, X
} from 'lucide-react';

interface DashboardProps {
  onBack: () => void;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('modified');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // For closing menu on outside click
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openMenuId && menuRefs.current[openMenuId]) {
        if (!menuRefs.current[openMenuId]?.contains(event.target as Node)) {
          setOpenMenuId(null);
        }
      }
    }
    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const sidebarItems = [
    { icon: <Upload className="h-5 w-5" />, label: 'All Images', count: 1247, active: true, id: 'all' },
    { icon: <Image className="h-5 w-5" />, label: 'Photos', count: 892, id: 'photos' },
    { icon: <Folder className="h-5 w-5" />, label: 'Collections', count: 23, id: 'collections' },
    { icon: <Link className="h-5 w-5" />, label: 'Shared Links', count: 67, id: 'shared' },
    { icon: <Trash2 className="h-5 w-5" />, label: 'Trash', count: 12, id: 'trash' }
  ];

  const images = [
    {
      id: '1',
      name: 'product-hero-banner.jpg',
      url: 'https://images.stockcake.com/public/1/b/2/1b233006-c7d5-4955-8499-b591153b7fd7_large/confident-business-professional-stockcake.jpg',
      size: '2.4 MB',
      views: 1247,
      uploaded: '2 hours ago',
      type: 'image',
      favorite: false,
      shared: true
    },
    {
      id: '2',
      name: 'team-photo-2024.png',
      url: 'https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg?semt=ais_hybrid&w=740',
      size: '1.8 MB',
      views: 892,
      uploaded: '5 hours ago',
      type: 'image',
      favorite: true,
      shared: false
    },
    {
      id: '3',
      name: 'logo-variations.svg',
      url: 'https://cdn.filtergrade.com/wp-content/uploads/2017/10/02185952/shutterstock_653970169.jpg',
      size: '156 KB',
      views: 445,
      uploaded: '1 day ago',
      type: 'image',
      favorite: false,
      shared: true
    },
    {
      id: '4',
      name: 'presentation-slides.pdf',
      url: 'https://static.vecteezy.com/system/resources/thumbnails/038/962/461/small/ai-generated-caucasian-successful-confident-young-businesswoman-ceo-boss-bank-employee-worker-manager-with-arms-crossed-in-formal-wear-isolated-in-white-background-photo.jpg',
      size: '5.2 MB',
      views: 234,
      uploaded: '2 days ago',
      type: 'document',
      favorite: false,
      shared: false
    },
    
  ];

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle file upload logic here
      console.log('Files selected:', files);
      setShowUploadModal(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files) {
      console.log('Files dropped:', files);
    }
  };

  const filteredImages = images.filter(image => {
    const matchesSearch = image.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'images' && image.type === 'image') ||
      (activeFilter === 'documents' && image.type === 'document') ||
      (activeFilter === 'videos' && image.type === 'video') ||
      (activeFilter === 'recent' && ['2 hours ago', '5 hours ago', '1 day ago'].includes(image.uploaded));
    
    return matchesSearch && matchesFilter;
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navbar at the top */}
      {/* Remove the <Navbar onDashboard={() => {}} /> line from the returned JSX */}
      {/* Top Navigation (back button, logo, etc.) */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 w-full justify-between sm:justify-start sm:space-x-4">
              <button 
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 p-1"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 flex items-center justify-center mr-2">
                <img src="/logo copy.png" alt="Supaimg" className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">Supaimg</span>
            </div>

            {/* Navbar right icons - equal spacing, remove M avatar on mobile */}
            <div className="hidden sm:flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <HelpCircle className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-semibold">
                M
              </div>
            </div>
            {/* Mobile: equally spaced right icons */}
            <div className="flex sm:hidden items-center flex-1 justify-end gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500"></span>
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <HelpCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar: hidden on mobile, flex on lg+ */}
        <div className="hidden lg:flex w-64 bg-white flex-col h-full border-r border-gray-200 min-h-[calc(100vh-64px)] justify-between">
            <button 
              onClick={() => setShowUploadModal(true)}
            className="w-full bg-blue-600 text-white py-3 mt-6 mb-6 rounded font-semibold text-base hover:bg-blue-700 transition flex items-center justify-center"
            >
            <Plus className="h-4 w-4 mr-2 inline" />
              Upload Images
            </button>

          <nav className="flex-1 px-4 space-y-1">
            {sidebarItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveFilter(item.id)}
                className={`flex items-center justify-between w-full py-2 px-2 rounded transition font-medium text-base ${
                  activeFilter === item.id
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={activeFilter === item.id ? 'text-blue-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">{item.count}</span>
              </button>
            ))}
          </nav>

          <hr className="my-4 border-gray-200" />

          {/* Storage section */}
          {/* <div className="px-4 pb-6">
            <div className="text-xs text-gray-500 mb-2">Storage used</div>
            <div className="w-full h-2 bg-gray-200 rounded mb-2">
              <div className="h-2 bg-blue-600 rounded" style={{ width: '76%' }} />
            </div>
            <div className="text-xs text-gray-500 mb-4">15.2 GB of 20 GB</div>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-50 transition">
              Upgrade Plan
            </button>
          </div> */}
        </div>

        {/* Mobile Drawer Sidebar */}
        {drawerOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-30" onClick={() => setDrawerOpen(false)}></div>
            {/* Drawer */}
            <div className="relative w-64 max-w-full bg-white h-full shadow-xl flex flex-col border-r border-gray-200 animate-slideInLeft">
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                <span className="text-xl font-bold text-gray-900">Supaimg</span>
                <button onClick={() => setDrawerOpen(false)} className="p-2 text-gray-600 hover:text-gray-900">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <button 
                onClick={() => { setShowUploadModal(true); setDrawerOpen(false); }}
                className="w-[90%] mx-auto bg-blue-600 text-white py-3 mt-6 mb-6 rounded font-semibold text-base hover:bg-blue-700 transition flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2 inline" />
                Upload Images
              </button>
              <nav className="flex-1 px-4 flex flex-col gap-1">
                {sidebarItems.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveFilter(item.id); setDrawerOpen(false); }}
                    className={`flex items-center justify-between w-full py-2 px-2 rounded transition font-medium text-base ${
                      activeFilter === item.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={activeFilter === item.id ? 'text-blue-600' : 'text-gray-400'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{item.count}</span>
                  </button>
                ))}
              </nav>
              <hr className="my-4 border-gray-200" />
              {/* Storage section */}
              {/* <div className="px-4 pb-6">
                <div className="text-xs text-gray-500 mb-2">Storage used</div>
                <div className="w-full h-2 bg-gray-200 rounded mb-2">
                  <div className="h-2 bg-blue-600 rounded" style={{ width: '76%' }} />
                </div>
                <div className="text-xs text-gray-500 mb-4">15.2 GB of 20 GB</div>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded font-medium hover:bg-gray-50 transition">
                  Upgrade Plan
                </button>
              </div> */}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {/* Content Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex flex-row items-center gap-2 mb-2 sm:mb-0">
                  <h1 className="text-xs sm:text-lg font-semibold text-gray-900">
                  {sidebarItems.find(item => item.id === activeFilter)?.label || 'All Images'}
                </h1>
                  <span className="text-xs sm:text-sm text-gray-600">{filteredImages.length} files</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border border-gray-300 px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="modified">Last modified</option>
                    <option value="name">Name</option>
                    <option value="size">Size</option>
                    <option value="views">Views</option>
                  </select>
                  <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
                <div className="border-l border-gray-300 pl-3 flex items-center space-x-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                {/* Hamburger for mobile (now in content header) */}
                <button
                  className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                  onClick={() => setDrawerOpen(true)}
                  aria-label="Open sidebar"
                >
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
                </button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex space-x-6 mt-4">
              {['All', 'Images', 'Recent'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter.toLowerCase())}
                  className={`text-sm font-medium pb-2 border-b-2 transition-colors ${
                    activeFilter === filter.toLowerCase()
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="w-full max-w-none px-2 py-6 sm:px-4 md:px-6 lg:px-6">
            {selectedItems.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 p-4 mb-6 flex items-center justify-between">
                <span className="text-blue-800 font-medium">
                  {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex space-x-2">
                  <button className="bg-blue-600 text-white px-3 py-1 text-sm hover:bg-blue-700 transition-colors">
                    Share
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-3 py-1 text-sm hover:bg-blue-50 transition-colors">
                    Download
                  </button>
                  <button className="border border-red-600 text-red-600 px-3 py-1 text-sm hover:bg-red-50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            )}

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="group relative bg-white border border-gray-200 hover:shadow-md transition-all cursor-pointer rounded-lg min-h-[270px] flex flex-col w-full"
                    style={{ minHeight: 270 }}
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden rounded-t-lg">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    {/* Star, name, menu row */}
                    <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                      {/* Star (favorite) */}
                      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center">
                        {image.favorite ? (
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        ) : null}
                      </div>
                      {/* Name (left-aligned, truncated) */}
                      <h3 className="flex-1 text-base font-medium text-gray-900 truncate text-left px-2">
                        {image.name}
                      </h3>
                      {/* Three-dot menu */}
                      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center relative" ref={el => menuRefs.current[image.id] = el}>
                        <button
                          className="p-1 bg-white border border-gray-300 text-gray-600 hover:text-gray-900 rounded-full focus:outline-none"
                          onClick={e => {
                            e.stopPropagation();
                            setOpenMenuId(openMenuId === image.id ? null : image.id);
                          }}
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        {/* Dropdown menu */}
                        {openMenuId === image.id && (
                          <div className="absolute right-0 top-9 z-20 w-40 bg-white border border-gray-200 rounded shadow-lg py-1 animate-fadeIn">
                                <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={e => {
                                e.stopPropagation();
                                handleDownload(image.url, image.name);
                                setOpenMenuId(null);
                              }}
                                >
                              <Download className="h-4 w-4 mr-2" /> Save to device
                                </button>
                                <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={e => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                                // Placeholder for manage action
                              }}
                                >
                              <Settings className="h-4 w-4 mr-2" /> Manage
                                </button>
                          </div>
                        )}
                      </div>
                    </div>
                      {/* Info row: hidden on hover, replaced by quick actions */}
                    <div className="flex items-center justify-between mt-2 px-4 group-hover:hidden">
                        <p className="text-xs text-gray-500">{image.size}</p>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{image.views}</span>
                        </div>
                      </div>
                      {/* Quick actions: only visible on hover, replaces info row */}
                    <div className="flex space-x-4 mt-2 px-4 hidden group-hover:flex">
                        <button 
                          onClick={() => copyToClipboard(`https://supaimg.com/${image.id}`)}
                          className="flex-1 bg-blue-600 text-white px-2 py-1 text-xs hover:bg-blue-700 transition-colors flex items-center justify-center rounded"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Link
                        </button>
                        <button
                          className="text-gray-600 hover:text-blue-600 transition-colors p-0 m-0 bg-transparent border-none flex items-center justify-center"
                          title="Share"
                          style={{ minWidth: 0 }}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </button>
                      </div>
                    {/* Selection checkbox */}
                    <div className="absolute top-2 left-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(image.id)}
                        onChange={() => toggleSelection(image.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {/* Table/List Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                  <div className="col-span-1">
                    <input 
                      type="checkbox" 
                      checked={selectedItems.length === filteredImages.length && filteredImages.length > 0}
                      onChange={() => {
                        if (selectedItems.length === filteredImages.length) {
                          setSelectedItems([]);
                        } else {
                          setSelectedItems(filteredImages.map(img => img.id));
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                    />
                  </div>
                  <div className="col-span-7 sm:col-span-4">Name</div>
                  <div className="hidden sm:block col-span-2">Size</div>
                  <div className="hidden sm:block col-span-2">Views</div>
                  {/* Mobile: Modified + Actions header together */}
                  <div className="col-span-4 flex sm:hidden items-center justify-between space-x-[8px]">
                    <span>Modified</span>
                    <span>Actions</span>
                  </div>
                  {/* Desktop: Modified and Actions separate */}
                  <div className="hidden sm:block col-span-3 sm:col-span-2">Modified</div>
                  <div className="hidden sm:block col-span-1 text-center">Actions</div>
                </div>
                
                {filteredImages.map((image) => (
                  <div key={image.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center transition-colors relative rounded-none sm:overflow-visible overflow-x-hidden">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(image.id)}
                        onChange={() => toggleSelection(image.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-7 sm:col-span-4 flex items-center">
                      <img src={image.url} alt={image.name} className="w-10 h-10 object-cover mr-3" />
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{image.name}</span>
                        {image.favorite && <Star className="inline h-3 w-3 text-yellow-500 fill-current ml-2" />}
                        {image.shared && <Share2 className="inline h-3 w-3 text-blue-500 ml-1" />}
                      </div>
                    </div>
                    <div className="hidden sm:block col-span-2 text-sm text-gray-600">{image.size}</div>
                    <div className="hidden sm:block col-span-2 text-sm text-gray-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {image.views.toLocaleString()}
                    </div>
                    {/* Mobile: Modified + Actions together */}
                    <div className="col-span-4 flex sm:hidden items-center justify-between mt-2 sm:mt-0 overflow-x-visible">
                      <span className="text-sm text-gray-600">{image.uploaded}</span>
                      <div className="flex justify-center items-center relative z-10 ml-2" ref={el => menuRefs.current[image.id + '-list'] = el}>
                        <button
                          className="p-1 text-gray-600 hover:text-gray-900 rounded-full focus:outline-none"
                          onClick={e => {
                            e.stopPropagation();
                            if (openMenuId !== image.id + '-list') {
                              setOpenMenuId(image.id + '-list');
                            }
                          }}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openMenuId === image.id + '-list' && (
                          <div className="absolute left-0 top-0 z-50 w-44 max-w-[95vw] bg-white border border-gray-200 rounded shadow-2xl py-1 animate-fadeIn transform -translate-x-full">
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={e => {
                                e.stopPropagation();
                                handleDownload(image.url, image.name);
                                setOpenMenuId(null);
                              }}
                            >
                              <Download className="h-4 w-4 mr-2" /> Save to device
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={e => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                                // Placeholder for manage action
                              }}
                            >
                              <Settings className="h-4 w-4 mr-2" /> Manage
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={e => {
                                e.stopPropagation();
                                copyToClipboard(`https://supaimg.com/${image.id}`);
                                setOpenMenuId(null);
                              }}
                            >
                              <Copy className="h-4 w-4 mr-2" /> Copy link
                            </button>
                            <button
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              onClick={e => {
                                e.stopPropagation();
                                setOpenMenuId(null);
                                // Placeholder for share action
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" /> Share
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Desktop: Modified and Actions separate */}
                    <div className="hidden sm:block col-span-3 sm:col-span-2 text-sm text-gray-600">{image.uploaded}</div>
                    <div className="hidden sm:flex col-span-1 justify-center items-center relative z-10" ref={el => menuRefs.current[image.id + '-list'] = el}>
                      <button
                        className="p-1 text-gray-600 hover:text-gray-900 rounded-full focus:outline-none"
                        onClick={e => {
                          e.stopPropagation();
                          setOpenMenuId(openMenuId === image.id + '-list' ? null : image.id + '-list');
                        }}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {openMenuId === image.id + '-list' && (
                        <div className="absolute right-0 left-auto top-8 z-20 w-44 bg-white border border-gray-200 rounded shadow-lg py-1 animate-fadeIn" style={{minWidth: '8rem', maxWidth: '90vw'}}>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={e => {
                              e.stopPropagation();
                              handleDownload(image.url, image.name);
                              setOpenMenuId(null);
                            }}
                          >
                            <Download className="h-4 w-4 mr-2" /> Save to device
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={e => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                              // Placeholder for manage action
                            }}
                          >
                            <Settings className="h-4 w-4 mr-2" /> Manage
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={e => {
                              e.stopPropagation();
                              copyToClipboard(`https://supaimg.com/${image.id}`);
                              setOpenMenuId(null);
                            }}
                          >
                            <Copy className="h-4 w-4 mr-2" /> Copy link
                          </button>
                          <button
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={e => {
                              e.stopPropagation();
                              setOpenMenuId(null);
                              // Placeholder for share action
                            }}
                          >
                            <ExternalLink className="h-4 w-4 mr-2" /> Share
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredImages.length === 0 && (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery ? 'Try adjusting your search terms' : 'Upload your first image to get started'}
                </p>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 font-medium transition-colors"
                >
                  Upload Images
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upload Images</h2>
            </div>
            
            <div 
              className="border-2 border-dashed border-gray-300 p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag & drop your images here</p>
              <p className="text-sm text-gray-500">or click to browse files</p>
              <p className="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB</p>
            </div>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowUploadModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 font-medium transition-colors"
              >
                Choose Files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;