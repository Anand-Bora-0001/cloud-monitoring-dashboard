import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { BrainCircuit, TrendingUp, AlertTriangle } from 'lucide-react';

const mockForecast = {
  horizons: {
    '7 Days': { cpu: 65, ram: 70, storage: 45, net: '2.1 TB' },
    '30 Days': { cpu: 80, ram: 85, storage: 75, net: '10.5 TB' },
    '90 Days': { cpu: 100, ram: 98, storage: 100, net: '35.0 TB' },
  },
  warnings: ['CPU Exhaustion in 85 days', 'Storage Exhaustion in 72 days']
};

export default function CapacityPlanning() {
  return (
    <DashboardLayout>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-indigo-500/20 rounded-lg">
          <BrainCircuit className="h-6 w-6 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-bold text-white">AI Capacity Planning</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {Object.entries(mockForecast.horizons).map(([period, data]) => (
          <div key={period} className="glass-panel p-6">
            <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">{period} Forecast</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">CPU Usage</span>
                <span className={`font-bold ${data.cpu > 90 ? 'text-red-400' : 'text-emerald-400'}`}>{data.cpu}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">RAM Usage</span>
                <span className={`font-bold ${data.ram > 90 ? 'text-red-400' : 'text-emerald-400'}`}>{data.ram}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Storage</span>
                <span className={`font-bold ${data.storage > 90 ? 'text-red-400' : 'text-emerald-400'}`}>{data.storage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Network Transfer</span>
                <span className="font-bold text-blue-400">{data.net}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-panel p-6 bg-red-500/10 border-red-500/50">
        <h3 className="text-lg font-semibold text-red-400 flex items-center mb-4">
          <AlertTriangle className="mr-2" /> Critical Predictive Warnings
        </h3>
        <ul className="list-disc list-inside text-slate-300 space-y-2">
          {mockForecast.warnings.map((w, i) => <li key={i}>{w}</li>)}
        </ul>
      </div>
    </DashboardLayout>
  );
}
