import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Search, Grid3X3, List, Plus, Upload, Link, 
  MoreVertical, Download, Share2, Trash2, Eye, Calendar,
  Filter, SortAsc, User, Bell, Settings, HelpCircle,
  Image, FileText, Video, Music, Archive, Folder, Copy,
  ExternalLink, Edit, Star, Clock, TrendingUp
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sidebarItems = [
    { icon: <Upload className="h-5 w-5" />, label: 'All Images', count: 1247, active: true, id: 'all' },
    { icon: <Image className="h-5 w-5" />, label: 'Photos', count: 892, id: 'photos' },
    { icon: <FileText className="h-5 w-5" />, label: 'Documents', count: 156, id: 'documents' },
    { icon: <Video className="h-5 w-5" />, label: 'Videos', count: 89, id: 'videos' },
    { icon: <Archive className="h-5 w-5" />, label: 'Archives', count: 45, id: 'archives' },
    { icon: <Folder className="h-5 w-5" />, label: 'Collections', count: 23, id: 'collections' },
    { icon: <Link className="h-5 w-5" />, label: 'Shared Links', count: 67, id: 'shared' },
    { icon: <Star className="h-5 w-5" />, label: 'Favorites', count: 34, id: 'favorites' },
    { icon: <Clock className="h-5 w-5" />, label: 'Recent', count: 89, id: 'recent' },
    { icon: <Trash2 className="h-5 w-5" />, label: 'Trash', count: 12, id: 'trash' }
  ];

  const images = [
    {
      id: '1',
      name: 'product-hero-banner.jpg',
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
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
      url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
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
      url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
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
      url: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      size: '5.2 MB',
      views: 234,
      uploaded: '2 days ago',
      type: 'document',
      favorite: false,
      shared: false
    },
    {
      id: '5',
      name: 'demo-video.mp4',
      url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      size: '12.8 MB',
      views: 567,
      uploaded: '3 days ago',
      type: 'video',
      favorite: true,
      shared: true
    },
    {
      id: '6',
      name: 'wireframes-mobile.fig',
      url: 'https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg',
      size: '3.1 MB',
      views: 123,
      uploaded: '1 week ago',
      type: 'design',
      favorite: false,
      shared: false
    },
    {
      id: '7',
      name: 'marketing-assets.zip',
      url: 'https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg',
      size: '8.7 MB',
      views: 89,
      uploaded: '2 weeks ago',
      type: 'archive',
      favorite: false,
      shared: true
    },
    {
      id: '8',
      name: 'user-interface-mockup.png',
      url: 'https://images.pexels.com/photos/3184467/pexels-photo-3184467.jpeg',
      size: '4.2 MB',
      views: 678,
      uploaded: '3 weeks ago',
      type: 'image',
      favorite: true,
      shared: false
    }
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

  return (
    <div className="min-h-screen bg-gray-50" onDragOver={handleDragOver} onDrop={handleDrop}>
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>
              
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
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="w-full bg-blue-600 text-white px-4 py-3 hover:bg-blue-700 font-medium flex items-center justify-center transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Images
            </button>
          </div>

          <nav className="px-3">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium mb-1 hover:bg-gray-100 transition-colors ${
                  activeFilter === item.id ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-700'
                }`}
              >
                <div className="flex items-center">
                  <span className={activeFilter === item.id ? 'text-blue-600' : 'text-gray-500'}>
                    {item.icon}
                  </span>
                  <span className="ml-3">{item.label}</span>
                </div>
                <span className="text-xs text-gray-500">{item.count}</span>
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 w-64 p-6 border-t border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Storage used</div>
            <div className="w-full bg-gray-200 h-2 mb-2">
              <div className="bg-blue-600 h-2 w-3/4"></div>
            </div>
            <div className="text-xs text-gray-500">15.2 GB of 20 GB</div>
            <button className="w-full mt-4 border border-gray-300 text-gray-700 px-4 py-2 hover:bg-gray-50 text-sm font-medium transition-colors">
              Upgrade Plan
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Content Header */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {sidebarItems.find(item => item.id === activeFilter)?.label || 'All Images'}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{filteredImages.length} files</p>
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
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex space-x-6 mt-4">
              {['All', 'Images', 'Documents', 'Videos', 'Recent'].map((filter) => (
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
          <div className="p-6">
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {filteredImages.map((image) => (
                  <div
                    key={image.id}
                    className="group relative bg-white border border-gray-200 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    
                    <div className="p-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {image.name}
                      </h3>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{image.size}</p>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{image.views}</span>
                        </div>
                      </div>
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

                    {/* Favorite star */}
                    {image.favorite && (
                      <div className="absolute top-2 right-8">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      </div>
                    )}

                    {/* Actions menu */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="relative">
                        <button className="p-1 bg-white border border-gray-300 text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Quick actions on hover */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => copyToClipboard(`https://supaimg.com/${image.id}`)}
                          className="flex-1 bg-blue-600 text-white px-2 py-1 text-xs hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy Link
                        </button>
                        <button className="bg-gray-600 text-white px-2 py-1 text-xs hover:bg-gray-700 transition-colors">
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200">
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
                  <div className="col-span-4">Name</div>
                  <div className="col-span-2">Size</div>
                  <div className="col-span-2">Views</div>
                  <div className="col-span-2">Modified</div>
                  <div className="col-span-1">Actions</div>
                </div>
                
                {filteredImages.map((image) => (
                  <div key={image.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 items-center transition-colors">
                    <div className="col-span-1">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(image.id)}
                        onChange={() => toggleSelection(image.id)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                    </div>
                    <div className="col-span-4 flex items-center">
                      <img src={image.url} alt={image.name} className="w-10 h-10 object-cover mr-3" />
                      <div>
                        <span className="text-sm font-medium text-gray-900">{image.name}</span>
                        {image.favorite && <Star className="inline h-3 w-3 text-yellow-500 fill-current ml-2" />}
                        {image.shared && <Share2 className="inline h-3 w-3 text-blue-500 ml-1" />}
                      </div>
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">{image.size}</div>
                    <div className="col-span-2 text-sm text-gray-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {image.views.toLocaleString()}
                    </div>
                    <div className="col-span-2 text-sm text-gray-600">{image.uploaded}</div>
                    <div className="col-span-1">
                      <button className="p-1 text-gray-600 hover:text-gray-900">
                        <MoreVertical className="h-4 w-4" />
                      </button>
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
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="h-5 w-5" />
              </button>
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