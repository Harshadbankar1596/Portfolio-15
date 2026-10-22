import { ArrowUpRight, Code2, Github, Linkedin, Mail, Phone } from "lucide-react";
import { profile } from "../data";

const items = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
  { icon: Linkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: Github, label: "GitHub", href: profile.github },
  { icon: Code2, label: "LeetCode", href: profile.leetcode },
];

export default function Contact() {
  return (
    <section id="contact" className="mx-auto w-[min(92%,1200px)] pb-10 pt-32">
      <p data-reveal className="mb-3 text-sm uppercase tracking-[0.3em] text-accent">Contact</p>
      <h2 data-reveal className="font-display text-5xl font-bold leading-none text-white sm:text-8xl">
        Let's build <span className="outline-text">something</span> <span className="text-accent">great.</span>
      </h2>
      <div className="mt-14 grid gap-3 sm:grid-cols-2">
        {items.map(({ icon: Icon, label, href }) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-reveal
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:border-accent/60 hover:bg-accent/10">
            <span className="flex items-center gap-3 text-white"><Icon size={20} className="text-accent" /> {label}</span>
            <ArrowUpRight size={18} className="text-zinc-500 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
          </a>
        ))}
      </div>
      <p className="mt-24 border-t border-white/10 pt-6 text-sm text-zinc-600">© {new Date().getFullYear()} Harshad Bankar. Built with React, GSAP, Three.js, Lenis & Framer Motion.</p>
    </section>
  );
}
