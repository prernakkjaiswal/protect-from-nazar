import { useState } from 'react';
import { Shield, Database, Eraser, Bot } from 'lucide-react';
import { DashboardView } from '@/DashboardView.tsx';
import { VaultView } from '@/VaultView.tsx';
import { ScrubberView } from '@/ScrubberView.tsx';
import { SentinelChatView } from '@/SentinelChatView.tsx';
import { cn } from '@/utils.ts';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'vault' | 'scrubber' | 'chat'>('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'vault', label: 'Asset Vault', icon: Database },
    { id: 'scrubber', label: 'Metadata Scrubber', icon: Eraser },
    { id: 'chat', label: 'Digital Sentinel', icon: Bot },
  ] as const;

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-teal-500/20 rounded-lg text-teal-500">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight">Nazar</h1>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Digital Protection</p>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                activeTab === item.id 
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          <p>End-to-End Encryption: ON</p>
          <p className="mt-1 font-mono text-[10px]">Zero-Trust Architecture</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-400" />
            <span className="font-bold">Nazar</span>
          </div>
          <div className="flex gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "p-2 rounded-md", 
                  activeTab === item.id ? "bg-teal-500/20 text-teal-400" : "text-slate-400"
                )}
              >
                <item.icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>

        <div className="relative z-10 p-6 md:p-10 max-w-6xl mx-auto min-h-[calc(100vh-64px)] md:min-h-screen">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'vault' && <VaultView />}
          {activeTab === 'scrubber' && <ScrubberView />}
          {activeTab === 'chat' && <SentinelChatView />}
        </div>
      </main>
    </div>
  );
}
