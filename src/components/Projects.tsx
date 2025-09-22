import React, { useState } from 'react';
import { Search, FolderPlus, X } from 'lucide-react';

const Projects: React.FC = () => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'empty' | 'grid'>('empty');
  const [folderView, setFolderView] = useState<string | null>(null);
  const [selected, setSelected] = useState<null | { name: string; meta: string }>(null);

  const clearSearch = () => setQuery('');

  if (mode === 'grid') {
    // Folder grid view (opened by clicking a table row)
    if (folderView) {
      const files = [
        'Report_Financials.xlsx', 'Project_Plan.ppt', 'Presentation_Q3.pptx', 'Proposal_NewFeature.docx',
        'Budget_Plan.xls', 'User_Manual.pdf', 'Marketing_Campaign.pdf', 'Design_Specifications.pdf',
        'Wireframe.png', 'Color_Palette.png', 'Sitemap.pdf', 'Notes.docx'
      ];
      return (
        <div className="px-2 lg:px-4 py-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <button onClick={() => setFolderView(null)} className="px-2 py-1 rounded border border-gray-300 bg-white hover:bg-gray-50">Back</button>
              <span className="text-gray-500">/</span>
              <span className="font-medium text-gray-900">{folderView}</span>
            </div>
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500">
              <FolderPlus className="h-4 w-4" /> New File
            </button>
          </div>

          {/* Search + Filters */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search files"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">Type</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">Location</button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">People</button>
            </div>
          </div>

          {/* Files grid */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {files.map((f) => (
                <div key={f} className="rounded-xl border border-gray-200 bg-white hover:shadow-sm transition overflow-hidden">
                  <div className="h-28 bg-gray-100 flex items-center justify-center">
                    <div className="w-16 h-16 rounded bg-white shadow-inner flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-xs font-medium text-gray-900 truncate" title={f}>{f}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="relative px-2 lg:px-4 py-4 space-y-4">
        {/* Quick Access */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Quick Access</h2>
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm">More</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { name: 'Studio Work', meta: '2.3 GB · 23 items' },
              { name: 'Studio Work', meta: '1.2 MB · 1 item' },
              { name: 'Brand Assets', meta: '241 MB · 8 items' },
              { name: 'Great Studios Pitch', meta: '12.3 MB · 9 items' },
            ].map((card) => (
              <div
                key={card.name}
                className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 hover:shadow-sm transition bg-white dark:bg-gray-800 cursor-pointer"
                onClick={() => setSelected(card)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📁</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{card.name}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{card.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Files Table */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <nav className="text-xs text-gray-500 dark:text-gray-400">
              Home <span className="mx-1">›</span> Projects <span className="mx-1">›</span> Demo
            </nav>
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500">
              <FolderPlus className="h-4 w-4" /> Add New
            </button>
          </div>

          {/* Header */}
          <div className="overflow-x-auto">
            <div className="min-w-[720px] grid grid-cols-12 gap-3 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 text-sm font-medium text-gray-600 dark:text-gray-300">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Sharing</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2">Modified</div>
            </div>

            {/* Rows */}
            <div className="min-w-[720px] divide-y divide-gray-200 dark:divide-gray-800">
              {[
                { name: 'Docs', share: 'Public', size: '4.5 MB', mod: 'Apr 10, 2022' },
                { name: 'Fonts', share: 'Public', size: '2.5 MB', mod: 'Apr 2, 2022' },
                { name: 'Source', share: 'Team +4', size: '1.2 MB', mod: 'Yesterday' },
                { name: 'Example', share: 'Team +3', size: '12.2 MB', mod: 'Yesterday' },
                { name: 'Readme.md', share: 'Public', size: '2 KB', mod: 'Oct 12, 2021' },
              ].map((r) => (
                <div
                  key={r.name}
                  className="grid grid-cols-12 gap-3 px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => setFolderView(r.name)}
                >
                  <div className="col-span-6 flex items-center gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center text-xs">📁</div>
                    <div className="text-sm text-gray-900 dark:text-gray-100">{r.name}</div>
                  </div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300">{r.share}</div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300">{r.size}</div>
                  <div className="col-span-2 text-sm text-gray-600 dark:text-gray-300">{r.mod}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right-side Info Drawer */}
        {selected && (
          <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30" onClick={() => setSelected(null)} />

            {/* Panel */}
            <div className="absolute right-0 top-0 w-full max-w-sm pr-4 pt-0">
              <div className="ml-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">📁</div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{selected.name}</h3>
                      <p className="text-[11px] text-gray-600 dark:text-gray-300">{selected.meta.replace('·', '•')} • Yesterday • 1 item</p>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 border border-gray-300 dark:border-gray-700 rounded">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Body */}
                <div className="p-4 overflow-y-auto">
                  {/* Tags */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-wrap gap-2">
                      {['Work', 'Source', 'Font'].map((t) => (
                        <span key={t} className="px-2 py-1 text-[11px] rounded-full bg-blue-50 text-blue-700 border border-blue-100">{t}</span>
                      ))}
                    </div>
                    <button className="text-xs text-blue-600 hover:underline">Edit</button>
                  </div>

                  {/* Sharing */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex -space-x-2">
                      {["https://i.pravatar.cc/24?img=1","https://i.pravatar.cc/24?img=2","https://i.pravatar.cc/24?img=3"].map((src, idx) => (
                        <img key={idx} src={src} className="w-6 h-6 rounded-full ring-2 ring-white dark:ring-gray-800" />
                      ))}
                      <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 text-[11px] text-gray-700 dark:text-gray-200 flex items-center justify-center ring-2 ring-white dark:ring-gray-800">+3</div>
                    </div>
                    <button className="text-xs text-blue-600 hover:underline">Manage</button>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-200 dark:border-gray-800 mb-3 flex items-center gap-4 text-sm">
                    <button className="pb-2 text-blue-700 font-semibold">Activity</button>
                    <button className="pb-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Comments</button>
                    <button className="pb-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">Versions</button>
                  </div>

                  {/* Activity items (placeholder) */}
                  <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-300">
                    <li>• You changed access to view – Feb 10</li>
                    <li>• Added Ada to project – Feb 8</li>
                    <li>• Uploaded materials – Feb 6</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-4 lg:px-6 py-6">
      {/* Centered card */}
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-0 overflow-hidden">
          {/* Header bar with search */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {query && (
                <button onClick={clearSearch} className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-600 hover:underline">
                  Clear search
                </button>
              )}
            </div>
          </div>

          {/* Empty state */}
          <div className="px-6 py-10 text-center">
            <div className="mx-auto w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center mb-4">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-violet-600">
                <path d="M4 7a2 2 0 012-2h3l1 2h7a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">No projects found</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-sm mx-auto mb-5">
              {query ? `“${query}” did not match any current projects.` : 'You don\'t have any projects yet.'} Try again or create a new project.
            </p>
            <div className="flex items-center justify-center gap-2">
              <button onClick={clearSearch} className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                Clear search
              </button>
              <button
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-900"
                onClick={() => setMode('grid')}
              >
                <FolderPlus className="h-4 w-4" />
                Create project
              </button>
            </div>
          </div>

          {/* Footer shortcuts */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white">←</kbd>
                <span>Return to parent</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white">P</kbd>
                <span>Open new tab</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-gray-300 bg-white">esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
