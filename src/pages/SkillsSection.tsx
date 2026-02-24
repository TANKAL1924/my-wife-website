import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SkillBar from "../components/SkillBar";
import { SKILLS } from "../data/resume-data";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // SplitText morph on heading
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitText(heading, { type: "words" });
      gsap.from(split.words, {
        opacity: 0,
        y: 40,
        scale: 0.85,
        skewY: 2,
        duration: 0.65,
        stagger: 0.07,
        ease: "power4.out",
        clearProps: "skewY,scale",
        scrollTrigger: {
          trigger: heading,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Stagger morph each skill row
    gsap.from(".skill-row", {
      opacity: 0,
      x: -30,
      scale: 0.95,
      skewX: 3,
      duration: 0.6,
      stagger: 0.08,
      ease: "power3.out",
      clearProps: "skewX,scale",
      scrollTrigger: {
        trigger: ".skill-grid",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
          Skills
        </p>
        <h2
          ref={headingRef}
          className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight"
        >
          Areas of Expertise
        </h2>

        <div className="skill-grid grid md:grid-cols-2 gap-x-20">
          {SKILLS.map((skill) => (
            <div key={skill.label} className="skill-row">
              <SkillBar {...skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
