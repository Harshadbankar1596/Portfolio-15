import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100), y = useMotionValue(-100);
  const dx = useSpring(x, { stiffness: 900, damping: 40 }), dy = useSpring(y, { stiffness: 900, damping: 40 });
  const rx = useSpring(x, { stiffness: 140, damping: 18 }), ry = useSpring(y, { stiffness: 140, damping: 18 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    if (matchMedia("(pointer:coarse)").matches) return;
    const mv = (e) => { x.set(e.clientX); y.set(e.clientY); setBig(!!e.target.closest?.("a,button")); };
    addEventListener("mousemove", mv);
    return () => removeEventListener("mousemove", mv);
  }, []);
  return (
    <div className="hidden md:block">
      <motion.div style={{ x: dx, y: dy }} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent" />
      <motion.div style={{ x: rx, y: ry }} animate={{ scale: big ? 2 : 1 }} className="pointer-events-none fixed left-0 top-0 z-[90] -ml-5 -mt-5 h-10 w-10 rounded-full border border-accent/60" />
    </div>
  );
}
