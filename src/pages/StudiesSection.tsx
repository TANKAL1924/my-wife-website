import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, MapPin, Award } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { fetchPortfolio } from "../services/portfolioService";
import { fetchStudies, formatStudyYear, type StudyData } from "../services/studyService";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function StudiesSection() {
  const [studies, setStudies] = useState<StudyData[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPortfolio().then((portfolio) => {
      if (portfolio) fetchStudies(portfolio.id).then(setStudies);
    });
  }, []);

  useGSAP(
    () => {
      if (!studies.length) return;

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

      const grid = gridRef.current;
      if (grid) {
        const cards = grid.querySelectorAll<HTMLElement>(".study-card");
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
    },
    { scope: sectionRef, dependencies: [studies] }
  );

  return (
    <section ref={sectionRef} id="studies" className="py-20 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Studies
          </p>
        </FadeIn>
        <h2
          ref={headingRef}
          className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight"
        >
          Academic Background
        </h2>
        <FadeIn delay={0.1}>
          <div className="w-10 h-[1px] bg-accent mb-8" />
        </FadeIn>

        <FadeIn delay={0.2}>
        <div ref={gridRef} className="studies-grid grid gap-6">
          {studies.map((study) => (
            <div
              key={study.id}
              className="study-card group bg-card border border-border p-8 hover:border-accent/50 transition-all duration-400 cursor-default flex flex-col"
            >
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <span className="text-[10px] tracking-[0.25em] uppercase font-body text-accent border border-accent/30 px-2 py-1">
                  {formatStudyYear(study.start_date)} — {formatStudyYear(study.end_date)}
                </span>
                <GraduationCap
                  size={16}
                  className="text-border group-hover:text-accent transition-colors mt-1"
                />
              </div>

              {/* University & Course */}
              <h3 className="font-sans text-2xl font-medium text-foreground mb-1 leading-snug">
                {study.uni_name}
              </h3>
              <p className="font-body text-sm text-accent tracking-wide mb-3">
                {study.course}
              </p>

              {/* Description */}
              {study.description && (
                <p className="font-body text-muted-foreground leading-relaxed font-light text-sm">
                  {study.description}
                </p>
              )}

              {/* Meta row: location + CGPA */}
              <div className="mt-6 pt-5 border-t border-border flex flex-wrap items-center gap-4">
                {study.location && (
                  <span className="flex items-center gap-1.5 text-xs font-body text-muted-foreground">
                    <MapPin size={12} className="text-accent" />
                    {study.location}
                  </span>
                )}
                {study.cgpa != null && (
                  <span className="text-xs tracking-wide font-body text-accent">
                    CGPA&nbsp;{study.cgpa.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Achievements */}
              {study.achievement && study.achievement.length > 0 && (
                <div className="mt-6">
                  <p className="flex items-center gap-1.5 text-[10px] tracking-[0.25em] uppercase font-body text-accent mb-3">
                    <Award size={11} />
                    Achievements & Certifications
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
                    {study.achievement.map((a, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-accent font-body font-bold shrink-0 text-xs mt-0.5">—</span>
                        <div>
                          <p className="font-body text-xs text-foreground/80 leading-snug">{a.title}</p>
                          <p className="font-body text-[10px] text-muted-foreground mt-0.5">{a.date}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
        </FadeIn>
      </div>
    </section>
  );
}
