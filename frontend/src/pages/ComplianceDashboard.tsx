

import { ShieldCheck, AlertOctagon, FileWarning, Clock } from 'lucide-react';

export default function ComplianceDashboard() {
  return (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <ShieldCheck className="h-6 w-6 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">Compliance & Security Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Security Score</h3>
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <p className="text-3xl font-bold text-emerald-400">94/100</p>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Open Incidents</h3>
            <AlertOctagon className="h-5 w-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-red-400">3</p>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Uptime SLA</h3>
            <Clock className="h-5 w-5 text-indigo-400" />
          </div>
          <p className="text-3xl font-bold text-white">99.995%</p>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-slate-400 font-medium">Certificates Expiring</h3>
            <FileWarning className="h-5 w-5 text-amber-400" />
          </div>
          <p className="text-3xl font-bold text-amber-400">2 &lt; 30d</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Expiring SSL Certificates</h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">api.cloudmon.io</span>
              <span className="text-red-400 font-bold">Expires in 3 days</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">auth.cloudmon.io</span>
              <span className="text-amber-400 font-bold">Expires in 14 days</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">www.cloudmon.io</span>
              <span className="text-emerald-400 font-bold">Expires in 312 days</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-white/10 pb-2">Patch Status (Critical)</h3>
          <ul className="space-y-3">
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Ubuntu 22.04 LTS Kernel Update</span>
              <span className="text-red-400 font-bold">Pending (12 hosts)</span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-slate-300">Redis 7.2.4 Security Patch</span>
              <span className="text-emerald-400 font-bold">Applied</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
