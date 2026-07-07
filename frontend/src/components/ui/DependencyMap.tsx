

// Mock Dependency Data mimicking Datadog/Dynatrace maps
const dependencies = [
  { id: '1', label: 'Frontend App', type: 'React', status: 'healthy', x: 250, y: 50 },
  { id: '2', label: 'FastAPI Gateway', type: 'API', status: 'healthy', x: 250, y: 150 },
  { id: '3', label: 'Redis Cache', type: 'Database', status: 'warning', x: 100, y: 250 },
  { id: '4', label: 'PostgreSQL', type: 'Database', status: 'healthy', x: 400, y: 250 },
];

const connections = [
  { from: '1', to: '2' },
  { from: '2', to: '3' },
  { from: '2', to: '4' },
];

export default function DependencyMap() {
  return (
    <div className="glass-panel p-6 mt-6 relative h-96 overflow-hidden">
      <h3 className="text-lg font-semibold text-white mb-6">Service Dependency Map</h3>
      
      {/* SVG Canvas for drawing connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {connections.map((conn, idx) => {
          const fromNode = dependencies.find(d => d.id === conn.from);
          const toNode = dependencies.find(d => d.id === conn.to);
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={idx}
              x1={fromNode.x + 80} // Offset for node center
              y1={fromNode.y + 110} 
              x2={toNode.x + 80}
              y2={toNode.y + 60}
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
              strokeDasharray="4"
            />
          );
        })}
      </svg>

      {/* Dependency Nodes */}
      {dependencies.map((node) => (
        <div
          key={node.id}
          className={`absolute p-4 rounded-xl border flex flex-col items-center justify-center shadow-lg w-40 z-10 
            ${node.status === 'healthy' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 
              node.status === 'warning' ? 'bg-amber-500/10 border-amber-500/50 text-amber-400' : 
              'bg-red-500/10 border-red-500/50 text-red-400'}`}
          style={{ top: node.y, left: node.x }}
        >
          <span className="text-sm font-bold text-white">{node.label}</span>
          <span className="text-xs mt-1 opacity-80">{node.type}</span>
        </div>
      ))}
    </div>
  );
}
