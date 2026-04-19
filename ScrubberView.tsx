import { useState } from 'react';
import { UploadCloud, CheckCircle, FileImage, Settings, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/Card.tsx';
import { Button } from '@/Button.tsx';

export function ScrubberView() {
  const [scrubbing, setScrubbing] = useState(false);
  const [done, setDone] = useState(false);

  const simulateScrub = () => {
    setScrubbing(true);
    setDone(false);
    setTimeout(() => {
      setScrubbing(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Metadata Scrubber</h2>
        <p className="text-slate-400">Clean your files of hidden location and device data before you hit post.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Isolate & Sanitize</CardTitle>
          <CardDescription>
            Upload images here to ensure all EXIF data, GPS coordinates, and camera model info are stripped.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="border-2 border-dashed border-slate-700 hover:border-teal-500 transition-colors rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer bg-slate-900/50"
            onClick={simulateScrub}
          >
            {scrubbing ? (
              <div className="space-y-4 animate-pulse flex flex-col items-center">
                <Settings className="h-10 w-10 text-teal-500 animate-spin" />
                <p className="text-sm font-medium text-teal-400">Scrubbing metadata...</p>
              </div>
            ) : done ? (
              <div className="space-y-4 flex flex-col items-center">
                <CheckCircle className="h-10 w-10 text-emerald-500" />
                <p className="text-sm font-medium text-emerald-400">File is clean. Save to device.</p>
              </div>
            ) : (
              <div className="space-y-4 flex flex-col items-center">
                <UploadCloud className="h-10 w-10 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-200">Click to upload or drag and drop</p>
                  <p className="text-xs text-slate-500">JPG, PNG or PDF (max. 10MB)</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        {done && (
          <CardFooter className="flex justify-between items-center bg-slate-900/40 p-4 border-t border-slate-800">
            <div className="flex items-center text-sm text-slate-400">
              <FileImage className="w-4 h-4 mr-2" />
              <span>screenshot_cleaned.png (Stripped 14 tags)</span>
            </div>
            <Button variant="outline" onClick={() => setDone(false)}>Clear</Button>
          </CardFooter>
        )}
      </Card>

      <div className="p-4 rounded-lg bg-teal-950/20 border border-teal-900/50 flex space-x-4 items-start">
        <Lock className="w-5 h-5 text-teal-500 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-teal-400">The "Scatter Problem" Avoided</h4>
          <p className="text-xs text-teal-300/70 mt-1 leading-relaxed">
            A hacker doesn't always look for a code vulnerability. To them, your "Just to show" photos are a map to your real-world location. Keeping your professional code and life away from your social browsing begins with metadata hygiene.
          </p>
        </div>
      </div>
    </div>
  );
}
