import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  label: string;
  level: number;
}

export default function SkillBar({ label, level }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(barRef.current, {
      width: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        once: true,
      },
    });
  }, { scope: ref, dependencies: [level] });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-body tracking-wide text-foreground/80">{label}</span>
        <span className="text-sm font-body text-accent">{level}%</span>
      </div>
      <div className="h-[1.5px] w-full bg-border relative overflow-hidden">
        <div
          ref={barRef}
          className="absolute top-0 left-0 h-full bg-accent"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}
