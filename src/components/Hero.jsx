import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { profile } from "../data";
import Portrait from "./Portrait";

const Split = ({ text, ready, delay = 0 }) => (
  <span className="block overflow-hidden pb-2">
    {text.split("").map((c, i) => (
      <motion.span key={i} className="inline-block" initial={{ y: "110%" }} animate={ready ? { y: 0 } : {}}
        transition={{ delay: delay + i * 0.04, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>
        {c === " " ? "\u00A0" : c}
      </motion.span>
    ))}
  </span>
);

export default function Hero({ ready }) {
  const [i, setI] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" ref={ref} className="relative mx-auto grid min-h-screen w-[min(92%,1200px)] items-center gap-10 pt-28 lg:grid-cols-2">
      <motion.div style={{ y: textY }}>
        <motion.p initial={{ opacity: 0 }} animate={ready ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
          className="mb-5 flex items-center gap-2 text-sm text-zinc-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Available for work · <MapPin size={14} /> {profile.location}
        </motion.p>
        <h1 className="font-display text-6xl font-bold leading-[0.95] text-white sm:text-7xl xl:text-8xl">
          <Split text="Harshad" ready={ready} delay={0.2} />
          <span className="text-accent"><Split text="Bankar" ready={ready} delay={0.5} /></span>
        </h1>
        <div className="mt-6 h-9 overflow-hidden font-display text-xl text-zinc-300 sm:text-2xl">
          <AnimatePresence mode="wait">
            <motion.p key={i} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -30, opacity: 0 }} transition={{ duration: 0.4 }}>
              {profile.roles[i]}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1 }}
          className="mt-6 max-w-lg text-zinc-400">{profile.bio}</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={ready ? { opacity: 1, y: 0 } : {}} transition={{ delay: 1.2 }} className="mt-8 flex flex-wrap gap-4">
          <a href="#work" className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-black transition hover:scale-105">
            View my work <ArrowDown size={16} className="transition group-hover:translate-y-1" />
          </a>
          <a href="/Harshad_Bankar_Resume.pdf" download className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white transition hover:border-accent hover:text-accent">
            <Download size={16} /> Resume
          </a>
        </motion.div>
      </motion.div>

      <motion.div style={{ y: imgY }} initial={{ clipPath: "inset(100% 0 0 0)" }} animate={ready ? { clipPath: "inset(0% 0 0 0)" } : {}}
        transition={{ delay: 0.6, duration: 1.4, ease: [0.76, 0, 0.24, 1] }} className="relative mx-auto w-full max-w-md">
        <div className="absolute -inset-4 rounded-[2rem] bg-accent/20 blur-3xl" />
        <Portrait />
      </motion.div>
    </section>
  );
}
