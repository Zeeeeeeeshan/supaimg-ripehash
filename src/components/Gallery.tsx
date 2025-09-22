import React, { useState } from 'react';
import { Trash2, LayoutGrid, ChevronDown, Eye, Share2, Download, MoreVertical, ArrowLeft, Copy } from 'lucide-react';

// Dummy Gallery view that matches the mock: headers (All Photos, July, June),

const julyImages: string[] = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1400',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1400',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1300',
  'https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1400',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1400',
  'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1400',
];

const juneImages: string[] = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1400',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1400',
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400',
  'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1400',
  'https://images.unsplash.com/photo-1437623889155-075d40e2e59f?q=80&w=1400',
];

const Section = ({ title, items, onImageClick }: { title: string; items: string[]; onImageClick: (src: string, idx: number) => void }) => (
  <div className="space-y-2">
    <h2 className="text-base font-semibold text-gray-900">{title}</h2>
    <div className="flex flex-wrap gap-2.5">
      {items.map((src, i) => (
        <button
          key={i}
          onClick={() => onImageClick(src, i)}
          className="rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-sm transition-shadow"
          style={{ display: 'inline-block' }}
        >
          <img src={src} alt="gallery" className="h-[140px] md:h-[150px] w-auto object-cover block" loading="lazy" />
        </button>
      ))}
    </div>
  </div>
);

const Gallery: React.FC = () => {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openLightbox = (src: string) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);
  const getFileName = (src: string) => {
    try {
      const u = new URL(src);
      const base = u.pathname.split('/').pop() || 'Image.png';
      return base.includes('.') ? base : `${base}.png`;
    } catch {
      const parts = src.split('/');
      const base = parts[parts.length - 1] || 'Image.png';
      return base.includes('.') ? base : `${base}.png`;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-hidden px-1 lg:px-2 py-3 md:py-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">All Photos</h1>
          <div className="text-xs text-gray-500">Dashboard &gt; Gallery</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search your photos"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 text-sm rounded-md bg-gray-900 text-white hover:bg-gray-800">
              Find
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end mb-3">
        <div className="flex items-center gap-2">
          {/* Delete next to Short By with grey background */}
          <button className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
          <button className="px-3 py-2 rounded-lg bg-gray-200 text-sm text-gray-800 hover:bg-gray-300 inline-flex items-center gap-2">
            <span>Short By</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          <button className="px-3 py-2 rounded-lg bg-gray-200 text-sm text-gray-800 hover:bg-gray-300 inline-flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-gray-400" />
            <span>Image Size</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
          <button className="px-3 py-2 rounded-lg bg-gray-200 text-sm text-gray-800 hover:bg-gray-300 inline-flex items-center gap-2">
            <Eye className="h-4 w-4 text-gray-400" />
            <span>Show Details</span>
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        <Section title="July" items={julyImages} onImageClick={(src) => openLightbox(src)} />
        <Section title="June" items={juneImages} onImageClick={(src) => openLightbox(src)} />
      </div>

      {/* Lightbox Modal */}
      {lightboxSrc && (
        <div className="fixed inset-0 z-50 bg-black" onClick={closeLightbox}>
          {/* Top-left text-only info */}
          <div className="absolute top-4 left-4 flex items-center gap-4 text-white" onClick={(e) => e.stopPropagation()}>
            <span onClick={closeLightbox} className="inline-flex items-center gap-2 cursor-pointer select-none">
              <ArrowLeft className="h-4 w-4" />
              {/* <span className="text-sm">Back</span> */}
            </span>
            <div className="text-sm font-medium truncate max-w-[40vw]">
              {getFileName(lightboxSrc)}
            </div>
            <span className="text-sm cursor-pointer select-none border border-white/80 rounded-full rounded-pill px-3 py-1">View in Project</span>
          </div>
          {/* Top actions (right) */}
          <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-1.5 bg-gray-800/90 text-white rounded-full rounded-pill px-2 py-1 shadow-lg">
              <button className="w-9 h-9 rounded-full inline-flex items-center justify-center hover:bg-white/10" title="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
              <button className="w-9 h-9 rounded-full inline-flex items-center justify-center hover:bg-white/10" title="Share">
                <Share2 className="h-4 w-4" />
              </button>
              <button className="w-9 h-9 rounded-full inline-flex items-center justify-center hover:bg-white/10" title="Download">
                <Download className="h-4 w-4" />
              </button>
              <button className="w-9 h-9 rounded-full inline-flex items-center justify-center hover:bg-white/10" title="More">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Image container */}
          <div className="w-full h-full flex items-center justify-center p-6" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxSrc} alt="preview" className="max-h-[75vh] max-w-[80vw] object-contain rounded-lg shadow-2xl" />
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-10" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-2 rounded-full rounded-pill bg-gray-800/90 text-white shadow text-sm">
              <div className="flex items-center gap-2">
                <span className="truncate max-w-[40vw]">https://i.supaimg.com/your-image</span>
                <span className="opacity-60">|</span>
                <button
                  className="w-6 h-6 inline-flex items-center justify-center rounded-full hover:bg-white/10"
                  title="Copy"
                  onClick={() => navigator.clipboard?.writeText('https://i.supaimg.com/your-image')}
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="px-3 py-2 rounded-full rounded-pill bg-gray-800/90 text-white shadow text-sm">
              544 kb
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
