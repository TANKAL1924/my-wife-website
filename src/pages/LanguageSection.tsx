import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Languages } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { fetchPortfolio } from "../services/portfolioService";
import { fetchLanguages, type LanguageData } from "../services/languageService";

gsap.registerPlugin(SplitText, ScrollTrigger);

const PROFICIENCY_ORDER = [
  "Native",
  "Fluent",
  "Advanced",
  "Intermediate",
  "Elementary",
  "Beginner",
];

const PROFICIENCY_WIDTH: Record<string, string> = {
  Native:       "w-full",
  Fluent:       "w-[85%]",
  Advanced:     "w-[70%]",
  Intermediate: "w-[55%]",
  Elementary:   "w-[35%]",
  Beginner:     "w-[20%]",
};

function getProficiencyWidth(proficient: string): string {
  const key = PROFICIENCY_ORDER.find(
    (p) => p.toLowerCase() === proficient?.toLowerCase()
  );
  return key ? PROFICIENCY_WIDTH[key] : "w-[50%]";
}

export default function LanguageSection() {
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    fetchPortfolio().then((portfolio) => {
      if (portfolio) fetchLanguages(portfolio.id).then(setLanguages);
    });
  }, []);

  useGSAP(
    () => {
      if (!languages.length) return;

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

      gsap.from(".lang-row", {
        opacity: 0,
        x: -40,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".lang-list",
          start: "top 85%",
          once: true,
        },
      });

      // Animate progress bars after rows appear
      gsap.from(".lang-bar-fill", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".lang-list",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [languages] }
  );

  return (
    <section ref={sectionRef} id="language" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Language
          </p>
        </FadeIn>
        <div className="flex items-end justify-between mb-4 gap-6 flex-wrap">
          <h2
            ref={headingRef}
            className="font-sans text-5xl sm:text-6xl font-light text-foreground leading-tight"
          >
            Communication
          </h2>
          <FadeIn delay={0.1}>
            <Languages size={32} className="text-accent/40 mb-1" />
          </FadeIn>
        </div>
        <FadeIn delay={0.15}>
          <div className="w-10 h-[1px] bg-accent mb-12" />
        </FadeIn>

        <div className="lang-list flex flex-col gap-8">
          {languages.map((lang) => (
            <div key={lang.id} className="lang-row group flex flex-col gap-2">
              {/* Label row */}
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-xl font-light text-foreground tracking-wide group-hover:text-accent transition-colors duration-300">
                  {lang.language}
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-body text-accent border border-accent/30 px-2 py-1">
                  {lang.proficient}
                </span>
              </div>

              {/* Progress track */}
              <div className="h-[1.5px] w-full bg-border relative overflow-hidden">
                <div
                  className={`lang-bar-fill absolute top-0 left-0 h-full bg-accent ${getProficiencyWidth(lang.proficient)}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
