import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlay for readability - doesn't block interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/70 to-slate-950" />

      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-24 sm:pt-32 sm:pb-28">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-blue-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live spending insights
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-semibold tracking-tight text-white">
            Take control of your money
          </h1>
          <p className="mt-4 text-blue-200/90 leading-relaxed">
            A minimalist finance app with glassmorphic design, real-time spending insights, clean dashboards, and quick transaction entry.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button className="rounded-xl bg-white/90 text-slate-900 px-5 py-3 text-sm font-semibold shadow-lg shadow-blue-500/10 hover:bg-white transition">Start budgeting</button>
            <button className="rounded-xl border border-white/20 bg-white/5 text-white px-5 py-3 text-sm font-semibold backdrop-blur hover:bg-white/10 transition">View demo</button>
          </div>
        </div>
      </div>
    </section>
  );
}
