import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <main className="mx-auto flex max-w-3xl flex-col gap-10 px-4 py-16 text-center">
        <section className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            2025 KSPO Public Data Contest
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Tailwind CSS is ready to ship
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            Start building layouts by composing utility classes directly in your
            JSX. The preview below uses nothing but Tailwind utilities.
          </p>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-cyan-500/20 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
            Counter demo
          </p>
          <p className="mt-4 text-5xl font-semibold text-white">{count}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              className="rounded-full bg-cyan-400/90 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-900 transition hover:bg-cyan-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              onClick={() => setCount((value) => value + 1)}
            >
              Increment
            </button>
            <button
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white transition hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {['Utility-first styling', 'Dark mode ready', 'Designer friendly'].map(
            (feature) => (
              <article
                key={feature}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm text-slate-200"
              >
                <p className="font-medium text-white">{feature}</p>
                <p className="mt-2 text-slate-400">
                  Combine semantic HTML and Tailwind utilities to move faster
                  without leaving your editor.
                </p>
              </article>
            ),
          )}
        </section>
      </main>
    </div>
  )
}

export default App
