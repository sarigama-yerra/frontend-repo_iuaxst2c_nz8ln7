import { useState } from 'react';

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export default function QuickAdd() {
  const [form, setForm] = useState({ type: 'expense', amount: '', category: 'General', merchant: '' });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        ...form,
        amount: parseFloat(form.amount),
        date: new Date().toISOString(),
      };
      const res = await fetch(`${API}/api/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to save');
      setMessage('Saved! Refresh to see it listed.');
      setForm({ type: 'expense', amount: '', category: 'General', merchant: '' });
    } catch (e) {
      setMessage('Error saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 pb-16 -mt-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6">
          <h3 className="text-white font-semibold mb-4">Quick add transaction</h3>
          <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <select name="type" value={form.type} onChange={onChange} className="col-span-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <input name="amount" value={form.amount} onChange={onChange} placeholder="Amount" type="number" step="0.01" className="col-span-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-blue-200/60" />
            <input name="category" value={form.category} onChange={onChange} placeholder="Category" className="col-span-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-blue-200/60" />
            <input name="merchant" value={form.merchant} onChange={onChange} placeholder="Merchant (optional)" className="col-span-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-blue-200/60" />
            <button disabled={saving} className="col-span-1 rounded-xl bg-white/90 text-slate-900 px-4 py-2 font-semibold hover:bg-white transition">{saving ? 'Saving...' : 'Add'}</button>
          </form>
          {message && <div className="mt-3 text-sm text-blue-200">{message}</div>}
        </div>
      </div>
    </section>
  );
}
