import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Github } from "lucide-react";
import { projects } from "../data";
import { Words } from "./Words";

gsap.registerPlugin(ScrollTrigger);

function Panel({ p, i }) {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <article onMouseMove={move} className="spot relative flex w-full shrink-0 flex-col gap-8 rounded-3xl border border-white/10 bg-black/55 p-8 backdrop-blur-xl lg:h-[78vh] lg:w-[78vw] lg:flex-row lg:p-12">
      <span className="outline-text pointer-events-none absolute -top-6 right-6 font-display text-[10rem] font-bold leading-none opacity-70">0{i + 1}</span>
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full border border-white/15 px-3 py-1 text-zinc-400">{p.tag}</span>
          <span className="flex items-center gap-1.5 text-accent"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />{p.status}</span>
        </div>
        <h3 className="mt-6 font-display text-4xl font-bold leading-tight text-white lg:text-5xl">{p.title}</h3>
        <p className="mt-2 text-sm text-accent">{p.role}</p>
        <p className="mt-4 text-zinc-400">{p.desc}</p>
        <div className="mt-auto grid grid-cols-3 gap-3 pt-8">
          {p.metrics.map((m) => (
            <div key={m.l} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-display text-2xl font-bold text-white lg:text-3xl">{m.v}</p>
              <p className="mt-1 text-xs text-zinc-500">{m.l}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative flex flex-1 flex-col">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-500">What I built</p>
        <ul className="space-y-3">
          {p.features.map((f, k) => (
            <motion.li key={f} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ delay: k * 0.08, duration: 0.5 }}
              className="flex gap-3 text-sm text-zinc-300"><Check size={16} className="mt-0.5 shrink-0 text-accent" />{f}</motion.li>
          ))}
        </ul>
        <div className="mt-auto pt-8">
          <div className="flex flex-wrap gap-2">{p.stack.map((s) => <span key={s} className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-zinc-300">{s}</span>)}</div>
          {p.link && (
            <a href={p.link} target="_blank" rel="noreferrer" className="group mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-black transition hover:scale-105">
              <Github size={16} /> View source <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const sec = useRef(null), track = useRef(null), bar = useRef(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const dist = () => track.current.scrollWidth - innerWidth;
      gsap.timeline({ scrollTrigger: { trigger: sec.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true } })
        .to(track.current, { x: () => -dist(), ease: "none" }, 0)
        .to(bar.current, { scaleX: 1, ease: "none" }, 0);
    });
    return () => mm.revert();
  }, []);
  return (
    <section id="work" ref={sec} className="relative py-24 lg:flex lg:h-screen lg:items-center lg:py-0">
      <div ref={track} className="flex flex-col gap-8 px-[4vw] lg:flex-row lg:items-center lg:gap-10 lg:px-[6vw]">
        <div className="shrink-0 lg:w-[34vw]">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">Selected work</p>
          <h2 className="font-display text-5xl font-bold leading-none text-white sm:text-7xl"><Words text="Things I've shipped." /></h2>
          <p className="mt-6 hidden text-zinc-500 lg:block">Keep scrolling — projects slide sideways →</p>
        </div>
        {projects.map((p, i) => <Panel key={p.title} p={p} i={i} />)}
      </div>
      <div className="absolute inset-x-[6vw] bottom-8 hidden h-px bg-white/10 lg:block"><div ref={bar} className="h-full origin-left scale-x-0 bg-accent" /></div>
    </section>
  );
}
