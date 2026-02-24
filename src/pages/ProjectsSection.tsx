import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { PROJECTS } from "../data/resume-data";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // SplitText morph on heading
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitText(heading, { type: "words" });
      gsap.from(split.words, {
        opacity: 0,
        y: 50,
        scale: 0.8,
        skewY: 3,
        duration: 0.65,
        stagger: 0.09,
        ease: "power4.out",
        clearProps: "skewY,scale",
        scrollTrigger: {
          trigger: heading,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Cards morph in with stagger via direct ref
    const grid = gridRef.current;
    if (grid) {
      const cards = grid.querySelectorAll<HTMLElement>(".project-card");
      gsap.from(cards, {
        opacity: 0,
        y: 60,
        scale: 0.88,
        skewY: 2,
        duration: 0.75,
        stagger: 0.12,
        ease: "power4.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: grid,
          start: "top 92%",
          once: true,
        },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="projects" className="py-28 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Projects
          </p>
        </FadeIn>
        <h2
          ref={headingRef}
          className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight"
        >
          Selected Work
        </h2>

        <div ref={gridRef} className="projects-grid grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((proj) => (
            <div
              key={proj.title}
              className="project-card group bg-card border border-border p-8 hover:border-accent/50 transition-all duration-400 cursor-default h-full flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-[10px] tracking-[0.25em] uppercase font-body text-accent border border-accent/30 px-2 py-1">
                  {proj.tag}
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-border group-hover:text-accent transition-colors mt-1"
                />
              </div>
              <h3 className="font-sans text-2xl font-medium text-foreground mb-3 leading-snug">
                {proj.title}
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed font-light text-sm flex-1">
                {proj.desc}
              </p>
              <div className="mt-6 pt-5 border-t border-border">
                <p className="text-xs tracking-wide font-body text-accent">
                  {proj.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
