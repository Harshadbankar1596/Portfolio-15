import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Award } from "lucide-react";
import { stats, skills } from "../data";
import { Words } from "./Words";

function Counter({ to, suffix, label }) {
  const el = useRef(null);
  useEffect(() => {
    const o = { v: 0 };
    const tw = gsap.to(o, {
      v: to, duration: 2, ease: "power2.out",
      scrollTrigger: { trigger: el.current, start: "top 90%" },
      onUpdate: () => { if (el.current) el.current.textContent = Math.round(o.v) + suffix; },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [to, suffix]);
  return (
    <div data-reveal className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
      <p ref={el} className="font-display text-5xl font-bold text-white">0{suffix}</p>
      <p className="mt-2 text-sm text-zinc-400">{label}</p>
    </div>
  );
}

export default function About() {
  const row = [...skills, ...skills];
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto w-[min(92%,1200px)]">
        <p data-reveal className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">About</p>
        <h2 className="max-w-3xl font-display text-4xl font-bold text-white sm:text-6xl"><Words text="I turn complex workflows into fast, reliable software." /></h2>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => <Counter key={s.label} {...s} />)}
        </div>
        <div data-reveal className="mt-6 flex items-center gap-4 rounded-2xl border border-accent/30 bg-accent/10 p-6">
          <Award className="shrink-0 text-accent" size={32} />
          <p className="text-zinc-200"><b className="text-white">Best Full-Stack Developer Award 2025</b> — TechSurya IT Solutions, for shipping live, high-impact products.</p>
        </div>
      </div>
      <div className="mt-20 overflow-hidden border-y border-white/10 py-6">
        <div className="marquee flex w-max gap-12 font-display text-4xl font-bold sm:text-6xl">
          {row.map((s, i) => <span key={i} className={i % 2 ? "outline-text" : "text-white"}>{s} <span className="text-accent">✦</span></span>)}
        </div>
      </div>
    </section>
  );
}
