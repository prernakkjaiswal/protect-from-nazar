import { useState } from 'react';
import { Database, Plus, Key, Network } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Card.tsx';
import { Button } from '@/Buttontsx';
import { Input } from '@/Input.tsx';
import { Badge } from '@/Badge.tsx';

interface Asset {
  id: string;
  name: string;
  type: string;
  tier: string;
  protection: string;
}

const mockAssets: Asset[] = [
  { id: '1', name: 'Google Workspace', type: 'Email & Docs', tier: 'Tier 1 (Online Legacy)', protection: 'Passkey + Google IAM' },
  { id: '2', name: 'Crypto Trezor Wallet', type: 'Financial', tier: 'Tier 2 (Legal Will)', protection: 'MPC Shards (2-of-3)' },
  { id: '3', name: 'GitHub Enterprise', type: 'Code Intel', tier: 'Tier 3 (TOS)', protection: 'FIDO2' },
];

export function VaultView() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [showAdd, setShowAdd] = useState(false);
  const [newAsset, setNewAsset] = useState({ name: '', type: '', tier: 'Tier 1 (Online Legacy)' });

  const addAsset = () => {
    if (!newAsset.name) return;
    setAssets([...assets, { ...newAsset, id: Math.random().toString(), protection: 'Standard MFA' }]);
    setShowAdd(false);
    setNewAsset({ name: '', type: '', tier: 'Tier 1 (Online Legacy)' });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Digital Asset Vault</h2>
          <p className="text-slate-400">RUFADAA Compliance Management & Multi-Party Computation (MPC).</p>
        </div>
        <Button onClick={() => setShowAdd(!showAdd)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Asset
        </Button>
      </div>

      {showAdd && (
        <Card className="border-teal-500/50 border">
          <CardHeader>
            <CardTitle>Register Asset for Succession</CardTitle>
            <CardDescription>Map out your platform in priority tiers (Tier 1 vs Tier 2).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Asset Name</label>
                <Input 
                  placeholder="e.g. Dropbox" 
                  value={newAsset.name} 
                  onChange={(e) => setNewAsset({...newAsset, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Data Type</label>
                <Input 
                  placeholder="e.g. Media/Files" 
                  value={newAsset.type} 
                  onChange={(e) => setNewAsset({...newAsset, type: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Succession Tier</label>
              <select 
                className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={newAsset.tier}
                onChange={(e) => setNewAsset({...newAsset, tier: e.target.value})}
              >
                <option value="Tier 1 (Online Legacy)">Tier 1: Online Legacy Tool (Overrides will)</option>
                <option value="Tier 2 (Legal Will)">Tier 2: Legal Documents (Will/Trust)</option>
                <option value="Tier 3 (TOS)">Tier 3: Platform Terms of Service</option>
              </select>
            </div>
            <Button onClick={addAsset} className="w-full">Register Asset</Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {assets.map((asset) => (
          <Card key={asset.id}>
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                  <Database className="w-5 h-5 text-teal-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-100">{asset.name}</h4>
                  <p className="text-xs text-slate-400">{asset.type}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Badge variant="outline">{asset.tier}</Badge>
                <Badge variant={asset.protection.includes('MPC') ? 'success' : 'default'} className="gap-1.5 flex items-center">
                  <Key className="w-3 h-3" />
                  {asset.protection}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-teal-950/20 border border-teal-900/50 flex space-x-4 items-start">
        <Network className="w-5 h-5 text-teal-500 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-teal-400">Verifying Title & Ownership</h4>
          <p className="text-xs text-teal-300/70 mt-1 leading-relaxed">
            Always audit the "clickwrap" Terms of Use of connected platforms. Without explicit planning via RUFADAA, some platforms could claim your assets upon bankruptcy. Your Tier 1 online tools always override a Tier 2 will.
          </p>
        </div>
      </div>
    </div>
  );
}
