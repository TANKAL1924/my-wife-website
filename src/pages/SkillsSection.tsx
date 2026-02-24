import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "../components/FadeIn";
import { fetchPortfolio } from "../services/portfolioService";
import { fetchSkills, type SkillData } from "../services/skillsService";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    fetchPortfolio().then((portfolio) => {
      if (portfolio) fetchSkills(portfolio.id).then(setSkills);
    });
  }, []);

  // Group skills by type
  const grouped = skills.reduce<Record<string, SkillData[]>>((acc, skill) => {
    const key = skill.type ?? "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});
  const groups = Object.entries(grouped);

  useGSAP(() => {
    if (Object.keys(groups).length === 0) return;

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

    // Stagger morph each skill group
    gsap.from(".skill-group", {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      clearProps: "all",
      scrollTrigger: {
        trigger: ".skill-grid",
        start: "top 85%",
        once: true,
      },
    });
  }, { scope: sectionRef, dependencies: [groups.length] });

  const displayLabel = (type: string) =>
    type.toLowerCase() === "personal" ? "Soft Skills" : type;

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Skills
          </p>
        </FadeIn>
        <h2
          ref={headingRef}
          className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight"
        >
          Areas of Expertise
        </h2>
        <FadeIn delay={0.1}>
          <div className="w-10 h-[1px] bg-accent mb-8" />
        </FadeIn>

        {/* Two-column split with vertical divider */}
        <FadeIn delay={0.2}>
        <div className="skill-grid grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border gap-0">
          {groups.map(([type, items], colIdx) => (
            <div
              key={type}
              className={`skill-group flex flex-col gap-6 ${colIdx === 0 ? "md:pr-14 pb-12 md:pb-0" : "md:pl-14 pt-12 md:pt-0"}`}
            >
              {/* Column header */}
              <div className="flex items-center gap-3">
                <span className="h-px flex-1 bg-accent/30" />
                <p className="text-[10px] tracking-[0.35em] uppercase font-body text-accent shrink-0">
                  {displayLabel(type)}
                </p>
                <span className="h-px flex-1 bg-accent/30" />
              </div>

              {/* Skill items */}
              <ul className="flex flex-col gap-3">
                {items.map((s) => (
                  <li
                    key={s.id}
                    className="group/item flex items-start gap-3 p-4 border border-border hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                  >
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                    <span className="font-body text-sm text-foreground/75 group-hover/item:text-foreground leading-relaxed transition-colors duration-300">
                      {s.skills}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
