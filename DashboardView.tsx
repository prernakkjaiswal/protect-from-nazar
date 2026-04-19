import { Shield, EyeOff, Activity, AlertTriangle, Fingerprint, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Card';
import { Badge } from '@/Badge';
import { Button } from '@/Button';

export function DashboardView() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Digital Asset Protection</h2>
        <p className="text-slate-400">Welcome back. Your Scatter Score is being monitored.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scatter Index</CardTitle>
            <Activity className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-slate-400">Low risk fragmentation</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">MFA Compliance</CardTitle>
            <Fingerprint className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-slate-400">App-based MFA active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Assets</CardTitle>
            <Lock className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-slate-400">Under Tiered Access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System State</CardTitle>
            <Shield className="h-4 w-4 text-teal-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-400">Secure</div>
            <p className="text-xs text-slate-400">Governance policies enforced</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Threat Events</CardTitle>
            <CardDescription>
              Monitored endpoints and metadata leakage warnings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center p-3 rounded-lg bg-slate-950/50 border border-slate-800">
               <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
               <div className="flex-1 space-y-1">
                 <p className="text-sm font-medium text-slate-200">Suspicious Cookie Access</p>
                 <p className="text-xs text-slate-400">Attempted read on LinkedIn session cookie blocked.</p>
               </div>
               <Badge variant="outline">Blocked</Badge>
             </div>
             <div className="flex items-center p-3 rounded-lg bg-slate-950/50 border border-slate-800">
               <EyeOff className="h-5 w-5 text-teal-500 mr-3" />
               <div className="flex-1 space-y-1">
                 <p className="text-sm font-medium text-slate-200">Metadata Scrubbed</p>
                 <p className="text-xs text-slate-400">EXIF data removed from 3 uploaded images.</p>
               </div>
               <Badge variant="success">Success</Badge>
             </div>
          </CardContent>
        </Card>

        <Card className="border-red-900/50 bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-400">The Panic Button</CardTitle>
            <CardDescription className="text-red-300/70">
              Dead Man's Switch execution. Use only in severe compromise scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 pt-2">
            <div className="p-8 rounded-full border-4 border-red-500/20 bg-red-500/10 mb-4 animate-pulse">
               <Shield className="h-12 w-12 text-red-500" />
            </div>
            <Button variant="destructive" className="w-full">Initiate Protocol</Button>
            <p className="text-center text-xs text-red-400/50 mt-4">
              Requires threshold (2-of-3) signatures
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
