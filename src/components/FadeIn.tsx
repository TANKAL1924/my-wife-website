import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 40,
      scale: 0.94,
      skewY: 1.5,
      duration: 0.9,
      delay,
      ease: "power4.out",
      clearProps: "skewY,scale",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: ref, dependencies: [delay] });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
