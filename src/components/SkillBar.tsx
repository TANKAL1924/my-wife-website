import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillBarProps {
  label: string;
  level: number;
}

export default function SkillBar({ label, level }: SkillBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-body tracking-wide text-foreground/80">{label}</span>
        <span className="text-sm font-body text-accent">{level}%</span>
      </div>
      <div className="h-[1.5px] w-full bg-border relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-accent"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
