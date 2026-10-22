import { motion } from "framer-motion";
import { Github, Linkedin, Code2 } from "lucide-react";
import { profile } from "../data";

const links = [["About", "#about"], ["Work", "#work"], ["Contact", "#contact"]];

export default function Navbar() {
  return (
    <motion.header initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
      className="fixed inset-x-0 top-4 z-40 mx-auto flex w-[min(92%,900px)] items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-xl">
      <a href="#top" className="font-display text-lg font-bold text-white">H<span className="text-accent">.</span></a>
      <nav className="hidden gap-8 text-sm sm:flex">
        {links.map(([l, h]) => (
          <a key={l} href={h} className="relative text-zinc-400 transition hover:text-white">{l}</a>
        ))}
      </nav>
      <div className="flex gap-3 text-zinc-400">
        <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-accent"><Github size={18} /></a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent"><Linkedin size={18} /></a>
        <a href={profile.leetcode} target="_blank" rel="noreferrer" className="hover:text-accent"><Code2 size={18} /></a>
      </div>
    </motion.header>
  );
}
