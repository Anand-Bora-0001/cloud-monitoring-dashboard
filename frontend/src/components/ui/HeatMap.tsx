import React from 'react';

// Mock data representing server health status across different regions
const mockRegions = [
  { name: 'us-east-1', status: 'healthy', servers: 42 },
  { name: 'us-west-2', status: 'warning', servers: 18 },
  { name: 'eu-central-1', status: 'healthy', servers: 24 },
  { name: 'ap-southeast-1', status: 'critical', servers: 5 },
  { name: 'sa-east-1', status: 'healthy', servers: 8 },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'healthy': return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
    case 'warning': return 'bg-amber-500/20 border-amber-500/50 text-amber-400';
    case 'critical': return 'bg-red-500/20 border-red-500/50 text-red-400';
    default: return 'bg-slate-500/20 border-slate-500/50 text-slate-400';
  }
};

export default function InfrastructureHeatMap() {
  return (
    <div className="glass-panel p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Global Infrastructure Heat Map</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mockRegions.map((region) => (
          <div 
            key={region.name} 
            className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg ${getStatusColor(region.status)}`}
          >
            <span className="text-sm font-medium mb-2">{region.name}</span>
            <span className="text-2xl font-bold">{region.servers}</span>
            <span className="text-xs mt-1 opacity-80 uppercase tracking-wider">{region.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
