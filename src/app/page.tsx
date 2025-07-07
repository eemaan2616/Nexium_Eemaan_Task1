'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [quotes, setQuotes] = useState([]);

  async function fetchQuotes() {
    const res = await fetch('/api/quotes');
    const data = await res.json();
    setQuotes(data.reverse());
  }

  useEffect(() => {
    fetchQuotes();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quote.trim()) return;
    await fetch('/api/quotes', {
      method: 'POST',
      body: JSON.stringify({ text: quote }),
      headers: { 'Content-Type': 'application/json' },
    });
    setQuote('');
    fetchQuotes();
  }

  return (
    <main className="min-h-screen relative bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center justify-start py-12 px-4 overflow-x-hidden">

      {/* Glowing Background Blurs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-500 rounded-full filter blur-3xl opacity-30 z-0 animate-pulse" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-blue-500 rounded-full filter blur-2xl opacity-25 z-0 animate-pulse" />

      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 tracking-tight z-10 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
        Inspiro Quotes
      </h1>

      <p className="text-md text-center mb-10 text-gray-300 max-w-xl z-10">
        Add, view and reflect on inspirational thoughts shared by you.
      </p>

      {/* Main Glass Container */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-4xl w-full mx-auto border border-white/10 z-10">

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col sm:flex-row items-center gap-4 mb-8"
        >
          <input
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Write a quote worth sharing..."
            className="flex-1 p-3 rounded-md text-white placeholder-gray-400 bg-white/10 shadow-md outline-none border border-pink-400/40 focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white px-6 py-3 rounded-md font-semibold shadow-lg transition duration-300"
          >
            ➕ Add
          </button>
        </form>

        {/* Quotes List */}
        <section className="grid gap-6">
          {quotes.length === 0 ? (
            <p className="text-center text-gray-400">No quotes yet. Add one above!</p>
          ) : (
            quotes.map((q: {text: string}, i: number) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-lg shadow-lg border border-white/20 transform hover:scale-[1.01] hover:shadow-pink-500/30 hover:shadow-lg transition-all duration-300 group"
              >
                <p className="text-lg leading-relaxed text-gray-100 group-hover:text-white transition">
                  “{q.text}”
                </p>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
