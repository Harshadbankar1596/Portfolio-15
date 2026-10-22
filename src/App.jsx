import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import Scene from "./components/Scene";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Cursor from "./components/Cursor";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    addEventListener("load", refresh);
    return () => { removeEventListener("load", refresh); ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div exit={{ y: "-100%" }} transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black">
            <motion.p initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.2em" }}
              transition={{ duration: 1.2 }} className="font-display text-2xl text-white">
              HARSHAD<span className="text-accent">.</span>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div style={{ scaleX: bar }} className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-accent" />
      <Cursor />
      <Scene />
      <Navbar />
      <main className="relative z-10">
        <Hero ready={!loading} />
        <About />
        <Projects />
        <Work />
        <Contact />
      </main>
    </>
  );
}
