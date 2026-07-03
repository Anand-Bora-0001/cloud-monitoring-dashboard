import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Server, Cpu, HardDrive, Network } from 'lucide-react';
import InfrastructureHeatMap from '../components/ui/HeatMap';

const mockCpuData = [
  { time: '10:00', value: 45 }, { time: '10:05', value: 55 }, 
  { time: '10:10', value: 85 }, { time: '10:15', value: 40 },
  { time: '10:20', value: 35 }, { time: '10:25', value: 50 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendUp }: any) => (
  <div className="glass-panel p-6 hover:border-primary/50 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-white group-hover:text-primary transition-colors">{value}</h3>
      </div>
      <div className="p-3 bg-white/5 rounded-lg">
        <Icon className="w-6 h-6 text-primary" />
      </div>
    </div>
    <div className={`text-sm ${trendUp ? 'text-emerald-400' : 'text-red-400'} flex items-center gap-1`}>
      <span>{trend}</span>
      <span className="text-slate-500 ml-1">vs last hour</span>
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Servers" value="12" icon={Server} trend="+2" trendUp={true} />
        <StatCard title="Avg CPU Load" value="48%" icon={Cpu} trend="-5%" trendUp={true} />
        <StatCard title="Storage Used" value="7.2 TB" icon={HardDrive} trend="+0.1 TB" trendUp={false} />
        <StatCard title="Network Traffic" value="845 MB/s" icon={Network} trend="+12%" trendUp={false} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-white mb-6">CPU Utilization</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockCpuData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="time" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Memory Usage</h3>
          <div className="h-[300px] w-full flex items-center justify-center text-slate-500 border-2 border-dashed border-white/10 rounded-xl">
             Chart Placeholder
          </div>
        </div>
      </div>

      {/* Advanced Features Row */}
      <InfrastructureHeatMap />
    </div>
  );
}
