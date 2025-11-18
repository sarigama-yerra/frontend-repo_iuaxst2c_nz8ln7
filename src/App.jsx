import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import QuickAdd from './components/QuickAdd';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Subtle starry dots */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(59,130,246,0.12),transparent_25%),radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.12),transparent_25%),radial-gradient(circle_at_30%_80%,rgba(236,72,153,0.12),transparent_25%)]" />

      <Hero />
      <Dashboard />
      <QuickAdd />

      <footer className="relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-10 text-sm text-blue-200/70">
          Built for clean budgeting. Glassmorphic, modern, minimalist.
        </div>
      </footer>
    </div>
  );
}

export default App;
