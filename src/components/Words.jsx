import { motion } from "framer-motion";
export const Words = ({ text, className = "" }) => (
  <span className={className} aria-label={text}>
    {text.split(" ").map((w, i) => (
      <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-1 align-bottom">
        <motion.span className="inline-block" initial={{ y: "110%", rotate: 6 }} whileInView={{ y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.8, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}>{w}</motion.span>
      </span>
    ))}
  </span>
);
