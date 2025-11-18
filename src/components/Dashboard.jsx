import { useEffect, useMemo, useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Stat({ label, value, accent = 'from-emerald-400 to-teal-400' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm">
      <div className="text-blue-200/70 text-sm">{label}</div>
      <div className={`mt-2 text-2xl font-semibold text-white bg-clip-text text-transparent bg-gradient-to-r ${accent}`}>{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const [tx, setTx] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/transactions`).then(r => r.json()).then(d => setTx(d.items || [])).catch(() => {});
    fetch(`${API}/api/budgets`).then(r => r.json()).then(d => setBudgets(d.items || [])).catch(() => {});
  }, []);

  const totals = useMemo(() => {
    const spent = tx.filter(t => t.type === 'expense').reduce((s, t) => s + Math.abs(t.amount || 0), 0);
    const income = tx.filter(t => t.type === 'income').reduce((s, t) => s + Math.abs(t.amount || 0), 0);
    const balance = income - spent;
    return { spent, income, balance };
  }, [tx]);

  return (
    <section className="relative z-10 -mt-10">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Stat label="This month spent" value={`$${totals.spent.toFixed(2)}`} />
          <Stat label="This month income" value={`$${totals.income.toFixed(2)}`} accent="from-sky-400 to-blue-400" />
          <Stat label="Balance" value={`$${totals.balance.toFixed(2)}`} accent="from-fuchsia-400 to-pink-400" />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
            <h3 className="text-white font-semibold">Recent transactions</h3>
            <div className="mt-4 divide-y divide-white/5">
              {tx.length === 0 && <div className="text-blue-200/70 text-sm">No transactions yet.</div>}
              {tx.slice(0, 8).map((t) => (
                <div key={t._id} className="py-3 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-xl ${t.type === 'expense' ? 'bg-rose-500/20' : 'bg-emerald-500/20'} border border-white/10`} />
                    <div>
                      <div className="text-white/90 font-medium">{t.merchant || t.category}</div>
                      <div className="text-blue-200/60">{new Date(t.date).toLocaleDateString()} • {t.category}</div>
                    </div>
                  </div>
                  <div className={`font-semibold ${t.type === 'expense' ? 'text-rose-300' : 'text-emerald-300'}`}>
                    {t.type === 'expense' ? '-' : '+'}${Math.abs(t.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6">
            <h3 className="text-white font-semibold">Budgets</h3>
            <div className="mt-4 space-y-3">
              {budgets.length === 0 && <div className="text-blue-200/70 text-sm">No budgets defined.</div>}
              {budgets.map((b) => (
                <div key={b._id} className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-white/90">{b.category}</div>
                    <div className="text-blue-200">${b.limit?.toFixed(2)}</div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-1/2 bg-gradient-to-r from-emerald-400 to-teal-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
