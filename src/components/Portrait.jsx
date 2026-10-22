import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValueEvent, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const T = (h) => `grayscale(1) contrast(1.3) sepia(1) saturate(9) hue-rotate(${h}deg)`;
const L = "absolute inset-0 h-full w-full object-cover";
const SRC = "/portrait.png";

export default function Portrait() {
  const slice = useRef(null);
  const { scrollY, scrollYProgress } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { stiffness: 180, damping: 30 });
  const shift = useTransform(vel, [-3000, 0, 3000], [-26, 0, 26]);
  const inv = useTransform(shift, (x) => -x);
  const energy = useTransform(vel, (x) => Math.min(Math.abs(x) / 1500, 1));
  const ghost = useTransform(energy, (e) => 0.08 + e * 0.8);
  const amt = useTransform([scrollYProgress, energy], ([p, e]) => Math.min(p * 14 + e * 0.5, 1));
  const sat = useTransform(amt, (a) => 1 + a * 6);
  const hue = useTransform(scrollYProgress, [0, 0.15], [0, 160]);
  const filter = useMotionTemplate`sepia(${amt}) saturate(${sat}) hue-rotate(${hue}deg) contrast(1.15)`;
  const mode = useTransform(amt, (a) => (a < 0.25 ? "MONO" : a < 0.7 ? "THERMAL" : "NEON"));
  const pct = useTransform(scrollYProgress, (v) => `SCAN ${String(Math.round(v * 100)).padStart(3, "0")}%`);

  // scroll-driven random glitch slices
  useMotionValueEvent(energy, "change", (e) => {
    const s = slice.current; if (!s) return;
    if (e > 0.12) {
      const a = Math.random() * 78, h = 6 + Math.random() * 16;
      s.style.clipPath = `inset(${a}% 0 ${Math.max(0, 100 - a - h)}% 0)`;
      s.style.transform = `translateX(${(Math.random() - 0.5) * 60 * e}px)`;
    } else s.style.clipPath = "inset(0 0 100% 0)";
  });

  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black">
      <motion.img src={SRC} alt="Harshad Bankar" style={{ filter }} className={L} />
      <motion.img aria-hidden src={SRC} style={{ x: shift, opacity: ghost, filter: T(-40) }} className={`${L} mix-blend-screen`} />
      <motion.img aria-hidden src={SRC} style={{ x: inv, opacity: ghost, filter: T(150) }} className={`${L} mix-blend-screen`} />
      <img ref={slice} aria-hidden src={SRC} style={{ filter: T(-40), clipPath: "inset(0 0 100% 0)" }} className={L} />
      <img aria-hidden src={SRC} style={{ filter: T(150) }} className={`${L} glitch-idle`} />
      <div className="scan-lines pointer-events-none absolute inset-0 mix-blend-overlay" />
      <div className="scan-sweep pointer-events-none absolute inset-x-0 h-1/5" />
      <div className="pointer-events-none absolute inset-x-4 top-4 flex justify-between font-mono text-[10px] tracking-widest text-white/70">
        <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />REC</span>
        <motion.span>{mode}</motion.span>
      </div>
      <motion.span className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] tracking-widest text-accent">{pct}</motion.span>
    </div>
  );
}
