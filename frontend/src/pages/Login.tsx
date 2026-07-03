export default function Login() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">CloudMon</h1>
          <p className="text-slate-400">Sign in to your dashboard</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="admin@company.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-primary hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors shadow-lg shadow-primary/20">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
