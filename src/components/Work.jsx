import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experience } from "../data";
import { Words } from "./Words";

export default function Work() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <section className="mx-auto w-[min(92%,1200px)] py-24">
      <h2 className="font-display text-4xl font-bold text-white sm:text-6xl"><Words text="Experience" /></h2>
      <div ref={ref} className="relative mt-12 pl-10">
        <div className="absolute bottom-0 left-3 top-0 w-px bg-white/10" />
        <motion.div style={{ scaleY: line }} className="absolute bottom-0 left-3 top-0 w-px origin-top bg-accent" />
        {experience.map((e) => (
          <div key={e.role} data-reveal className="relative mb-12">
            <span className="absolute -left-[2.35rem] top-1 grid h-6 w-6 place-items-center rounded-full bg-accent text-black"><Briefcase size={13} /></span>
            <p className="text-sm text-accent">{e.when}</p>
            <h3 className="font-display text-2xl font-bold text-white">{e.role}</h3>
            <p className="text-zinc-500">{e.org}</p>
            <ul className="mt-3 space-y-2 text-zinc-400">{e.points.map((x) => <li key={x}>— {x}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
