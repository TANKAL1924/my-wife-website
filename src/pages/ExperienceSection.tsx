import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "../components/FadeIn";
import { fetchPortfolio } from "../services/portfolioService";
import { fetchExperiences, formatYear, type ExperienceData } from "../services/experienceService";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    fetchPortfolio().then((portfolio) => {
      if (portfolio) fetchExperiences(portfolio.id).then(setExperiences);
    });
  }, []);

  useGSAP(() => {
    // Infinite scroll carousel
    const track = trackRef.current;
    if (!track) return;

    gsap.to(track, {
      x: "-50%",
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    // SplitText morph on heading
    const heading = headingRef.current;
    if (!heading) return;

    const split = new SplitText(heading, { type: "chars,words" });
    gsap.from(split.chars, {
      opacity: 0,
      y: 50,
      scale: 0.8,
      skewX: 8,
      duration: 0.6,
      stagger: 0.03,
      ease: "power4.out",
      clearProps: "skewX,scale",
      scrollTrigger: {
        trigger: heading,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const cards = experiences.length > 0 ? [...experiences, ...experiences] : [];

  return (
    <section id="experience" className="py-28 bg-secondary/40 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Experience
          </p>
        </FadeIn>
        <h2
          ref={headingRef}
          className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight"
        >
          Career Journey
        </h2>
      </div>

      {/* Slider */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex gap-6 w-max pl-6">
          {cards.map((exp, i) => (
            <div
              key={i}
              className="w-[340px] shrink-0 bg-background border border-border rounded-2xl p-8 flex flex-col gap-4 hover:border-accent transition-colors duration-300"
            >
              <span className="text-xs tracking-widest font-body text-accent">
                {formatYear(exp.start_date)} — {formatYear(exp.end_date)}
              </span>
              <div>
                <h3 className="font-sans text-xl font-medium text-foreground leading-snug">
                  {exp.title_company}
                </h3>
                <p className="font-body text-sm text-muted-foreground tracking-wide mt-1">
                  {exp.company_name}
                </p>
              </div>
              <div className="flex-1">
                {Array.isArray(exp.description) ? (
                  <ul className="flex flex-col gap-1.5 list-none">
                    {exp.description.map((item, j) => (
                      <li key={j} className="flex gap-2 font-body text-muted-foreground font-light text-sm leading-relaxed">
                        <span className="text-accent font-bold shrink-0">—</span>
                        <span>{item.work}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-body text-muted-foreground leading-relaxed font-light text-sm">
                    {exp.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
