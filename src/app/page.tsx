'use client';

import { useEffect, useState } from 'react';
import { topics } from '@/data/topics';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [quotes, setQuotes] = useState<{ _id: string; text: string }[]>([]);
  const [showUserQuotes, setShowUserQuotes] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<keyof typeof topics>('Success');
  const [activeQuote, setActiveQuote] = useState<string | null>(null);

  async function fetchQuotes() {
    const res = await fetch('/api/quotes');
    const data = await res.json();
    setQuotes(data.reverse());
  }

  async function deleteQuote(id: string) {
    await fetch(`/api/quotes?id=${id}`, {
      method: 'DELETE',
    });
    fetchQuotes();
  }

  useEffect(() => {
    if (showUserQuotes) fetchQuotes();
  }, [showUserQuotes]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white flex flex-col items-center py-10 px-4 relative">
      {/* Glowing Background Blurs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-pink-500 rounded-full blur-3xl opacity-30 animate-pulse z-0" />
      <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-blue-500 rounded-full blur-2xl opacity-25 animate-pulse z-0" />

      <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 bg-clip-text text-transparent z-10">
        Inspiro Quotes
      </h1>

      <div className="flex gap-4 mb-6 z-10">
        <button
          onClick={() => setShowUserQuotes(true)}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            showUserQuotes ? 'bg-pink-600' : 'bg-white/10 hover:bg-white/20 text-gray-300'
          }`}
        >
          Add/View Quotes
        </button>
        <button
          onClick={() => setShowUserQuotes(false)}
          className={`px-4 py-2 rounded-md font-semibold transition ${
            !showUserQuotes ? 'bg-pink-600' : 'bg-white/10 hover:bg-white/20 text-gray-300'
          }`}
        >
          Browse by Topics
        </button>
      </div>

      <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl p-6 sm:p-8 max-w-4xl w-full mx-auto border border-white/10 z-10">
        {showUserQuotes ? (
          <>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!quote.trim()) return;
                await fetch('/api/quotes', {
                  method: 'POST',
                  body: JSON.stringify({ text: quote }),
                  headers: { 'Content-Type': 'application/json' },
                });
                setQuote('');
                fetchQuotes();
              }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-8"
            >
              <input
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Write a quote worth sharing..."
                className="flex-1 p-3 rounded-md text-white placeholder-gray-400 bg-white/10 outline-none border border-pink-400/40 focus:ring-2 focus:ring-pink-400"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white px-6 py-3 rounded-md font-semibold transition"
              >
                ➕ Add
              </button>
            </form>

            <section className="grid gap-4">
              {quotes.length === 0 ? (
                <p className="text-center text-gray-400">No quotes yet. Add one above!</p>
              ) : (
                quotes.map((q, i) => (
                  <Dialog key={q._id}>
                    <DialogTrigger asChild>
                      <div
                        onClick={() => setActiveQuote(q.text)}
                        className="cursor-pointer bg-white/10 p-4 rounded-md border border-white/20 hover:shadow-lg transition-all relative"
                      >
                        <p className="text-gray-100 truncate">“{q.text.slice(0, 100)}...”</p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
                      <DialogHeader>
                        <DialogTitle>Quote</DialogTitle>
                      </DialogHeader>
                      <p className="text-lg mt-2">“{activeQuote}”</p>
                      <button
                        onClick={() => deleteQuote(q._id)}
                        className="mt-4 text-sm text-red-400 hover:text-red-500 border border-red-400 px-3 py-1 rounded-md transition"
                      >
                        🗑 Delete Quote
                      </button>
                    </DialogContent>
                  </Dialog>
                ))
              )}
            </section>
          </>
        ) : (
          <>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-300">
                Select a Topic:
              </label>
              <select
                value={selectedTopic}
                onChange={(e) =>
                  setSelectedTopic(e.target.value as keyof typeof topics)
                }
                className="w-full text-white p-3 rounded-md border border-white/20 shadow-inner bg-gradient-to-br from-[#211c40] via-[#302b63] to-[#24243e] appearance-none"
              >
                {Object.keys(topics).map((topic) => (
                  <option key={topic} value={topic} className="text-white bg-[#302b63]">
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <section className="grid gap-4">
              {topics[selectedTopic]?.map((quote, i) => (
                <Dialog key={i}>
                  <DialogTrigger asChild>
                    <div
                      onClick={() => setActiveQuote(quote)}
                      className="cursor-pointer bg-white/10 p-4 rounded-md border border-white/20 hover:shadow-lg transition-all"
                    >
                      <p className="text-gray-100 truncate">“{quote.slice(0, 100)}...”</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
                    <DialogHeader>
                      <DialogTitle>Quote</DialogTitle>
                    </DialogHeader>
                    <p className="text-lg mt-2">“{activeQuote}”</p>
                  </DialogContent>
                </Dialog>
              ))}
            </section>
          </>
        )}
      </div>
    </main>
  );
}
