import { Outlet, NavLink } from 'react-router-dom';
import { Activity, Server, Bell, Settings, LogOut, LayoutDashboard } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
        isActive 
          ? 'bg-primary/20 text-primary border border-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
          : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
      }`
    }
  >
    <Icon className="w-5 h-5" />
    <span className="font-medium">{label}</span>
  </NavLink>
);

export default function DashboardLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-dark overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 glass-panel m-4 flex flex-col z-10">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center shadow-lg shadow-primary/30">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            CloudMon
          </span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <SidebarItem to="/" icon={LayoutDashboard} label="Overview" />
          <SidebarItem to="/servers" icon={Server} label="Servers" />
          <SidebarItem to="/alerts" icon={Bell} label="Alerts" />
          <SidebarItem to="/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pt-4 pr-4 pb-4">
        {/* Top Header Placeholder */}
        <header className="h-16 glass-panel mb-4 flex items-center px-6 justify-between flex-shrink-0">
           <h2 className="text-lg font-semibold text-slate-200">Global Dashboard</h2>
           <div className="flex items-center gap-4">
             <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-500"></div>
           </div>
        </header>

        {/* Dynamic Route Content */}
        <div className="flex-1 overflow-auto rounded-xl">
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
}
