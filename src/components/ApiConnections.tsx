import { useEffect, useState } from 'react';
import { Search, Settings, User, Filter, FileText, X, Menu, Home, Folder, Database, Shield, Plus, Image } from 'lucide-react';
import Gallery from './Gallery';
import { supabase } from '../lib/supabaseClient';

interface ApiConnectionsProps {
  onBack: () => void;
  embedded?: boolean;
}

const ApiConnections = ({ onBack, embedded = false }: ApiConnectionsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'home' | 'projects' | 'api' | 'auth' | 'gallery'>('api');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [openProvider, setOpenProvider] = useState<null | {
    id: number; name: string; description: string; logo: string; hasDocumentation?: boolean;
  }>(null);
  const [formValues, setFormValues] = useState<Record<string, string>>({});

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

  // Field schema per provider name (fallback to generic S3-style fields)
  const getFieldsForProvider = (name: string) => {
    const genericS3 = [
      { key: 'accessKeyId', label: 'Access Key ID', placeholder: 'AKIAIOSFODNN7EXAMPLE' },
      { key: 'secretAccessKey', label: 'Secret Access Key', placeholder: 'wJalrXUtnFEMI/...EXAMPLEKEY', secret: true },
      { key: 'region', label: 'Region', placeholder: 'us-east-1' },
      { key: 'bucket', label: 'Bucket Name', placeholder: 'my-image-bucket' },
    ];
    const withEndpoint = [
      ...genericS3,
      { key: 'endpoint', label: 'Endpoint URL', placeholder: 'https://<host>' },
    ];
    const byName: Record<string, { key: string; label: string; placeholder: string; secret?: boolean }[]> = {
      'Amazon S3': genericS3,
      'AWS S3 Glacier': [
        { key: 'accessKeyId', label: 'Access Key ID', placeholder: 'AKIA...' },
        { key: 'secretAccessKey', label: 'Secret Access Key', placeholder: 'wJalr...' , secret: true},
        { key: 'region', label: 'Region', placeholder: 'us-east-1' },
        { key: 'vault', label: 'Vault Name', placeholder: 'my-archive-vault' },
      ],
      'Cloudflare R2': withEndpoint,
      'Google Cloud Storage (GCS)': [
        { key: 'projectId', label: 'Project ID', placeholder: 'my-gcp-project' },
        { key: 'bucket', label: 'Bucket Name', placeholder: 'my-gcs-bucket' },
        { key: 'serviceAccount', label: 'Service Account JSON', placeholder: 'Upload JSON via settings' },
      ],
      'Microsoft Azure Blob Storage': [
        { key: 'accountName', label: 'Storage Account Name', placeholder: 'mystorageaccount' },
        { key: 'accountKey', label: 'Account Key', placeholder: 'Base64EncodedKeyHere==', secret: true },
        { key: 'container', label: 'Container Name', placeholder: 'my-container' },
      ],
      'IBM Cloud Object Storage': withEndpoint,
      'Oracle Cloud Object Storage': [
        { key: 'tenancyOCID', label: 'Tenancy OCID', placeholder: 'ocid1.tenancy...' },
        { key: 'userOCID', label: 'User OCID', placeholder: 'ocid1.user...' },
        { key: 'fingerprint', label: 'API Key Fingerprint', placeholder: '20:3b:97:...' },
        { key: 'privateKey', label: 'Private Key', placeholder: '-----BEGIN PRIVATE KEY-----', secret: true },
        { key: 'bucket', label: 'Bucket Name', placeholder: 'my-oracle-bucket' },
        { key: 'region', label: 'Region', placeholder: 'us-ashburn-1' },
      ],
      'Alibaba Cloud OSS': [
        { key: 'accessKeyId', label: 'Access Key ID', placeholder: 'LTAI...' },
        { key: 'accessKeySecret', label: 'Access Key Secret', placeholder: 'secret...' , secret: true},
        { key: 'bucket', label: 'Bucket Name', placeholder: 'my-oss-bucket' },
        { key: 'endpoint', label: 'Endpoint URL', placeholder: 'oss-cn-hangzhou.aliyuncs.com' },
      ],
      'Tencent Cloud COS': genericS3,
      'Huawei Cloud OBS': withEndpoint,
      'Backblaze B2': withEndpoint,
      'Wasabi': withEndpoint,
      'DigitalOcean Spaces': withEndpoint,
      'Linode Object Storage': withEndpoint,
      'Vultr Object Storage': withEndpoint,
      'Hetzner Object Storage': withEndpoint,
      'Scaleway Object Storage': withEndpoint,
      'OVH Object Storage': withEndpoint,
      'DreamHost DreamObjects': withEndpoint,
      'Storj DCS': withEndpoint,
      'MinIO (Self-hosted)': withEndpoint,
      'Cloudinary': [
        { key: 'cloudName', label: 'Cloud Name', placeholder: 'demo' },
        { key: 'apiKey', label: 'API Key', placeholder: '123456...' },
        { key: 'apiSecret', label: 'API Secret', placeholder: 'abcdEF...', secret: true },
      ],
      'ImageKit.io': [
        { key: 'publicKey', label: 'Public API Key', placeholder: 'public_...' },
        { key: 'privateKey', label: 'Private API Key', placeholder: 'private_...' , secret: true},
        { key: 'urlEndpoint', label: 'URL Endpoint', placeholder: 'https://ik.imagekit.io/your_id/' },
      ],
      'Imgix': [
        { key: 'domain', label: 'Source Domain', placeholder: 'https://example.imgix.net' },
        { key: 'apiKey', label: 'API Key (optional)', placeholder: 'imgixapikey123' },
      ],
      'Uploadcare': [
        { key: 'publicKey', label: 'Public API Key', placeholder: 'demopublickey' },
        { key: 'secretKey', label: 'Secret API Key', placeholder: 'demosecretkey' , secret: true},
      ],
      'Filestack': [
        { key: 'apiKey', label: 'API Key', placeholder: 'A1B2C3D4E5' },
      ],
      'TinyPNG API': [
        { key: 'apiKey', label: 'API Key', placeholder: 'abcd1234...' , secret: true},
      ],
      'Kraken.io': [
        { key: 'apiKey', label: 'API Key', placeholder: 'krakenapikey123' },
        { key: 'apiSecret', label: 'API Secret', placeholder: 'krakensecret456' , secret: true},
      ],
      'Thumbor (self-hosted)': [
        { key: 'baseUrl', label: 'Thumbor Server URL', placeholder: 'http://localhost:8888' },
        { key: 'securityKey', label: 'Security Key', placeholder: 'thumborsecret' , secret: true},
      ],
      'Bunny.net': [
        { key: 'storageZone', label: 'Storage Zone Name', placeholder: 'myzone' },
        { key: 'ftpPassword', label: 'FTP Password', placeholder: '********' , secret: true},
        { key: 'hostname', label: 'Hostname', placeholder: 'storage.bunnycdn.com' },
      ],
      'KeyCDN': [
        { key: 'apiKey', label: 'API Key', placeholder: 'keycdnapikey123' , secret: true},
        { key: 'zoneId', label: 'Zone ID', placeholder: '12345' },
      ],
      'Fastly Image Optimizer': [
        { key: 'apiToken', label: 'API Token', placeholder: 'fastlyapitoken123' , secret: true},
        { key: 'serviceId', label: 'Service ID', placeholder: 'abcd1234' },
      ],
      'Akamai': [
        { key: 'clientToken', label: 'Client Token', placeholder: 'akclienttoken123' },
        { key: 'clientSecret', label: 'Client Secret', placeholder: 'aksecretkey123' , secret: true},
        { key: 'accessToken', label: 'Access Token', placeholder: 'akaccesstoken123' , secret: true},
        { key: 'host', label: 'API Hostname', placeholder: 'https://akaa-baseurl.luna.akamaiapis.net' },
      ],
    };
    return byName[name] || withEndpoint;
  };

  const handleChange = (k: string, v: string) => setFormValues((p) => ({ ...p, [k]: v }));
  const closeDrawer = () => { setOpenProvider(null); setFormValues({}); };

  const connectedProviders = [
    {
      id: 1,
      name: 'Supaimg Bucket 1.0',
      description: 'Connect all this that You need',
      status: 'Connected',
      access: 'Full Access',
      note: 'Default API by Supaimg - always available for free.',
      icon: '🔵'
    }
  ];

  const topProviders = [
    // Major Cloud Providers (Object Storage)
    { id: 1, name: 'Amazon S3', description: 'Scalable object storage from AWS, widely used for media hosting and apps.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazons3.svg', hasDocumentation: true },
    { id: 2, name: 'AWS S3 Glacier', description: 'Low-cost archive storage (rarely for images but possible).', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazons3.svg', hasDocumentation: true },
    { id: 3, name: 'Cloudflare R2', description: 'S3-compatible, no egress fees, great for global delivery.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudflare.svg', hasDocumentation: true },
    { id: 4, name: 'Google Cloud Storage (GCS)', description: 'Unified object storage, tightly integrated with GCP.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/googlecloud.svg', hasDocumentation: true },
    { id: 5, name: 'Microsoft Azure Blob Storage', description: 'Massively scalable object storage for unstructured data.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/microsoftazure.svg', hasDocumentation: true },
    { id: 6, name: 'IBM Cloud Object Storage', description: 'Durable and secure object storage, S3-compatible.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ibm.svg', hasDocumentation: true },
    { id: 7, name: 'Oracle Cloud Object Storage', description: 'Oracle’s highly scalable object storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oracle.svg', hasDocumentation: true },
    { id: 8, name: 'Alibaba Cloud OSS', description: 'Alibaba’s Object Storage Service (OSS).', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/alibabacloud.svg', hasDocumentation: true },
    { id: 9, name: 'Tencent Cloud COS', description: 'Reliable and cost-effective S3-compatible storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tencentqq.svg', hasDocumentation: true },
    { id: 10, name: 'Huawei Cloud OBS', description: 'Reliable object storage for APAC regions.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huawei.svg', hasDocumentation: true },

    // S3-Compatible Alternatives
    { id: 11, name: 'Backblaze B2', description: 'Affordable S3-compatible storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/backblaze.svg', hasDocumentation: true },
    { id: 12, name: 'Wasabi', description: 'Low-cost S3-compatible storage with no egress.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/wasabi.svg', hasDocumentation: true },
    { id: 13, name: 'DigitalOcean Spaces', description: 'S3-compatible storage with built-in CDN.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/digitalocean.svg', hasDocumentation: true },
    { id: 14, name: 'Linode Object Storage', description: 'S3-compatible storage from Akamai/Linode.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linode.svg', hasDocumentation: true },
    { id: 15, name: 'Vultr Object Storage', description: 'S3-compatible storage from Vultr.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vultr.svg', hasDocumentation: true },
    { id: 16, name: 'Hetzner Object Storage', description: 'Affordable EU S3-compatible storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hetzner.svg', hasDocumentation: true },
    { id: 17, name: 'Scaleway Object Storage', description: 'EU S3-compatible storage (FR, NL).', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scaleway.svg', hasDocumentation: true },
    { id: 18, name: 'OVH Object Storage', description: 'European S3-compatible storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/ovh.svg', hasDocumentation: true },
    { id: 19, name: 'DreamHost DreamObjects', description: 'S3-compatible storage by DreamHost.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dreamhost.svg', hasDocumentation: true },
    { id: 20, name: 'Storj DCS', description: 'Decentralized S3-compatible storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/storj.svg', hasDocumentation: true },
    { id: 21, name: 'MinIO (Self-hosted)', description: 'Self-hosted, S3-compatible high-performance storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/minio.svg', hasDocumentation: true },

    // Image/Media Optimization + Hosting APIs
    { id: 22, name: 'Cloudinary', description: 'All-in-one media management platform.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cloudinary.svg', hasDocumentation: true },
    { id: 23, name: 'ImageKit.io', description: 'Image CDN and optimization.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/imagekit.svg', hasDocumentation: true },
    { id: 24, name: 'Imgix', description: 'Image processing and CDN delivery.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/imgix.svg', hasDocumentation: true },
    { id: 25, name: 'Uploadcare', description: 'Upload, storage, optimization, CDN.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/uploadcare.svg', hasDocumentation: true },
    { id: 26, name: 'Filestack', description: 'File upload API, transformations, CDN.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/filestack.svg', hasDocumentation: true },
    { id: 27, name: 'TinyPNG API', description: 'Image compression API + optional hosting.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tinypng.svg', hasDocumentation: true },
    { id: 28, name: 'Kraken.io', description: 'Image optimization API + CDN option.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kraken.svg', hasDocumentation: true },
    { id: 29, name: 'Thumbor (self-hosted)', description: 'Open-source smart image service.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/python.svg', hasDocumentation: true },

    // CDN/Edge Media Platforms
    { id: 30, name: 'Bunny.net', description: 'Storage + CDN with image optimization.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/bunny.svg', hasDocumentation: true },
    { id: 31, name: 'KeyCDN', description: 'Global CDN with image APIs.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/keycdn.svg', hasDocumentation: true },
    { id: 32, name: 'Fastly Image Optimizer', description: 'Fastly CDN + image optimizer.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fastly.svg', hasDocumentation: true },
    { id: 33, name: 'Akamai', description: 'Akamai object storage/CDN.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/akamai.svg', hasDocumentation: true },

    // Developer platforms / storage
    { id: 34, name: 'Firebase Storage', description: 'Simple storage built on GCS.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/firebase.svg', hasDocumentation: true },
    { id: 35, name: 'Supabase Storage', description: 'S3-compatible storage + auth.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/supabase.svg', hasDocumentation: true },
    { id: 36, name: 'Appwrite Storage', description: 'Self-hosted BaaS with storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/appwrite.svg', hasDocumentation: true },
    { id: 37, name: 'Vercel Blob Storage', description: 'Vercel Blob for serverless apps.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vercel.svg', hasDocumentation: true },
    { id: 38, name: 'Netlify Large Media', description: 'Git LFS-based media storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/netlify.svg', hasDocumentation: true },
    { id: 39, name: 'Render Object Storage', description: 'Render’s S3-compatible storage.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/render.svg', hasDocumentation: true },

    // Extras to bring list to ~40
    { id: 40, name: 'DreamObjects (DreamHost)', description: 'S3-compatible storage by DreamHost.', logo: 'https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dreamhost.svg', hasDocumentation: true },
  ];

  return (
    <div className={embedded ? 'text-[14px]' : 'min-h-screen bg-gray-50 dark:bg-gray-900 dashboard-rounded overflow-y-auto'}>
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
      
      {/* Top Navigation (fixed) */}
      {!embedded && (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center h-16">
          {/* Left side - Logo + collapse toggle */}
          <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} px-4 py-3 flex items-center space-x-3 overflow-hidden transition-[width] duration-300`}>
            {/* Hamburger menu for mobile */}
            <button
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            {/* Logo + collapse button */}
            <div className="flex items-center space-x-2">
              <button
                className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center focus:outline-none"
                onClick={() => setSidebarCollapsed(false)}
                aria-label="Expand sidebar via logo"
              >
                <span className="text-white font-bold">S</span>
              </button>
              {!sidebarCollapsed && <span className="text-xl font-bold text-gray-900">supaimg</span>}
              <button
                className="ml-2 p-1 rounded hover:bg-gray-100 inline-flex"
                onClick={() => setSidebarCollapsed((v) => !v)}
                aria-label="Toggle sidebar"
                title="Toggle sidebar"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="5" width="18" height="14" rx="5" ry="5" stroke="#9CA3AF" strokeWidth="2" fill="none" />
                  <line x1="12" y1="6" x2="12" y2="18" stroke="#9CA3AF" strokeWidth="2" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right side - Search bar and Choose File button */}
          <div className="flex-1 flex items-center justify-between px-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div className="ml-4">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Choose File</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      )}

      <div className={embedded ? '' : 'flex pt-16 overflow-auto'}>
        {/* Sidebar (collapsible + sticky) */}
        {!embedded && (
        <div className={`hidden lg:flex ${sidebarCollapsed ? 'w-16' : 'w-64'} overflow-hidden transition-[width] duration-300 bg-white dark:bg-gray-900 flex-col min-h-[calc(100vh-4rem)] sticky top-16 self-start border-r border-gray-200 dark:border-gray-800`}>
          <nav className="flex-1 px-3 pt-2 pb-5 space-y-1 overflow-auto">
            {sidebarItems.map((item) => {
              const isActive = item.id === activeFilter;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'home') onBack();
                    setActiveFilter(item.id as any);
                  }}
                  className={`relative dashboard-pill flex ${sidebarCollapsed ? 'justify-center' : 'items-center'} w-full py-2.5 px-3 transition text-sm font-medium ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <span className={isActive ? 'text-blue-600' : 'text-gray-400'}>
                    {item.icon}
                  </span>
                  {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
                </button>
              );
            })}
          </nav>
          {/* Settings/Profile bottom */}
          <div className="px-4 pb-6">
            <button className={`flex items-center w-full py-3 px-3 rounded-lg transition font-medium text-sm text-gray-700 hover:bg-gray-50 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <Settings className="h-5 w-5 text-gray-400" />
              {!sidebarCollapsed && <span className="ml-3">Setting</span>}
            </button>
            <div className={`mt-6 ${sidebarCollapsed ? 'px-0 flex justify-center' : 'px-3'}`}>
              {!sidebarCollapsed && <p className="text-xs text-gray-500">Version Beta 1.02</p>}
              <div className={`flex items-center mt-2 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <div className={`w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center ${sidebarCollapsed ? '' : 'mr-2'}`}>
                  <User className="h-3 w-3 text-gray-600" />
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <p className="text-xs font-medium text-gray-900">{effectiveName}</p>
                    <p className="text-xs text-gray-500">{effectiveEmail || '—'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Mobile Drawer */}
        {!embedded && drawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black opacity-50" onClick={() => setDrawerOpen(false)}></div>
            <div className="relative w-64 bg-white dark:bg-gray-900 animate-slideInLeft">
              <div className="p-4">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <img src="/logo copy.png" alt="Supaimg" className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">supaimg</span>
                  </div>
                  <button onClick={() => setDrawerOpen(false)}>
                    <X className="h-6 w-6 text-gray-400" />
                  </button>
                </div>
                
                <nav className="flex-1 px-3 py-5 space-y-1">
                  {sidebarItems.map((item) => {
                    const isActive = item.id === activeFilter;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (item.id === 'home') onBack();
                          setActiveFilter(item.id as any);
                          setDrawerOpen(false);
                        }}
                        className={`relative dashboard-pill flex items-center w-full py-2.5 px-3 transition text-sm font-medium ${
                          isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 h-6 w-1 bg-blue-500 rounded-r"></span>
                        )}
                        <span className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                          isActive ? 'bg-blue-100 border-blue-200 text-blue-600' : 'bg-white border-gray-200 text-gray-400'
                        }`}>
                          {item.icon}
                        </span>
                        <span className="ml-3">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={embedded ? 'text-[14px]' : 'flex-1 p-4 lg:p-5 text-[14px] min-h-[calc(100vh-4rem)] overflow-visible'}>
          {activeFilter === 'gallery' ? (
            <div className="px-1 lg:px-2 py-2">
              <Gallery />
            </div>
          ) : (
          <>
          {/* Header */}
          <div className="mb-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-0.5">API Connections</h1>
            <p className="text-gray-600 dark:text-gray-300 text-xs">Easily connect your cloud storage providers and manage them in one place.</p>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search providers..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm">
              Find
            </button>
          </div>

          {/* Connected Section */}
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Connected</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
              {connectedProviders.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                      <img src="/cloudbucket copy.png" alt="Supaimg Bucket" className="w-6 h-6 object-contain" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{provider.name}</h3>
                      <p className="text-[11px] text-gray-600">{provider.description}</p>
                      <p className="text-[11px] text-gray-500 mt-1">{provider.note}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Settings className="h-4 w-4" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-600">{provider.access}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">{provider.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Providers Section */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Top Providers</h2>
              <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {topProviders.map((provider, idx) => (
                <div
                  key={provider.id}
                  className={`p-4 flex items-center justify-between ${idx !== topProviders.length - 1 ? 'border-b border-gray-200' : ''}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={provider.logo} alt={provider.name} className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{provider.name}</h3>
                      <p className="text-[11px] text-gray-600">{provider.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {provider.hasDocumentation && (
                      <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-xs">
                        <FileText className="h-4 w-4" />
                        <span>View Docs</span>
                      </button>
                    )}
                    <button
                      className="px-3.5 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs"
                      onClick={() => { setOpenProvider(provider); setFormValues({}); }}
                    >
                      {provider.hasDocumentation ? 'Connect Now' : 'Connect'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className="text-center text-xs text-gray-600 pb-4">
            Check our <a href="#" className="text-blue-600 hover:underline">Integration Guide</a> or <a href="#" className="text-blue-600 hover:underline">Contact Support</a>
          </div>
          </>
          )}
        </div>

        {/* Connect Drawer */}
        {openProvider && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeDrawer}
            />
            {/* Panel */}
            <div className="absolute right-0 top-0 w-full max-w-md pr-4 pt-4">
              <div className="ml-auto bg-white border border-gray-200 shadow-xl rounded-2xl overflow-hidden max-h-[90vh]">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
                    <img src={openProvider.logo} alt={openProvider.name} className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{openProvider.name}</h3>
                    <div className="flex items-center gap-2 text-[11px] text-gray-600">
                      <span className="px-1.5 py-0.5 rounded bg-gray-100">Setup</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100">{openProvider.name.includes('S3') || openProvider.name.includes('Object') ? 'S3 Compatible' : 'Provider'}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {openProvider.hasDocumentation && (
                    <a
                      href="#"
                      className="inline-flex items-center gap-1 text-xs text-gray-700 border border-gray-300 rounded px-2 py-1 hover:bg-gray-50"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileText className="h-3.5 w-3.5" /> View Docs
                    </a>
                  )}
                  <button onClick={closeDrawer} className="p-1.5 text-gray-500 hover:text-gray-700 border border-gray-300 rounded">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 overflow-y-auto">
                <p className="text-xs text-gray-600 mb-4">{openProvider.description}</p>

                {/* Dynamic fields */}
                <div className="space-y-3">
                  {getFieldsForProvider(openProvider.name).map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{f.label}</label>
                      <input
                        type={f.secret ? 'password' : 'text'}
                        value={formValues[f.key] || ''}
                        onChange={(e) => handleChange(f.key, e.target.value)}
                        placeholder={f.placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {/* Optional helper */}
                      <p className="mt-1 text-[11px] text-gray-500">
                        {f.label === 'Service Account JSON' ? 'Upload in settings or paste a reference here.' : ''}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={closeDrawer} className="px-3 py-2 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button
                    onClick={() => {
                      // TODO: wire submit to backend/storage
                      console.log('Connect', openProvider?.name, formValues);
                      closeDrawer();
                    }}
                    className="px-3 py-2 text-sm bg-gray-900 text-white rounded-md hover:bg-gray-800"
                  >
                    Connect
                  </button>
                </div>
              </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ApiConnections;

// Drawer UI appended at the end (component-level return already above when embedded/standalone)
