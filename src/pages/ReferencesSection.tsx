import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, Building2, BookOpen } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { fetchPortfolio } from "../services/portfolioService";
import { fetchReferences, type ReferenceData } from "../services/referencesService";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ReferencesSection() {
  const [references, setReferences] = useState<ReferenceData[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPortfolio().then((portfolio) => {
      if (portfolio) fetchReferences(portfolio.id).then(setReferences);
    });
  }, []);

  useGSAP(
    () => {
      if (!references.length) return;

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
        const cards = grid.querySelectorAll<HTMLElement>(".ref-card");
        gsap.from(cards, {
          opacity: 0,
          y: 50,
          scale: 0.92,
          duration: 0.7,
          stagger: 0.15,
          ease: "power4.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
            once: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [references] }
  );

  return (
    <section ref={sectionRef} id="references" className="py-20 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            References
          </p>
        </FadeIn>
        <h2
          ref={headingRef}
          className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight"
        >
          Professional References
        </h2>
        <FadeIn delay={0.1}>
          <div className="w-10 h-[1px] bg-accent mb-8" />
        </FadeIn>

        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {references.map((ref) => (
            <div
              key={ref.id}
              className="ref-card group bg-card border border-border p-8 hover:border-accent/50 transition-all duration-400 flex flex-col gap-5"
            >
              {/* Name & position */}
              <div>
                <h3 className="font-sans text-xl font-medium text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                  {ref.name}
                </h3>
                <p className="font-body text-sm text-accent tracking-wide mt-1">
                  {ref.position}
                </p>
              </div>

              {/* Institution details */}
              <div className="flex flex-col gap-2">
                <span className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                  <Building2 size={12} className="text-accent shrink-0 mt-0.5" />
                  {ref.uni}
                </span>
                <span className="flex items-start gap-2 text-xs font-body text-muted-foreground">
                  <BookOpen size={12} className="text-accent shrink-0 mt-0.5" />
                  {ref.fac}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t border-border" />

              {/* Contact */}
              <div className="flex flex-col gap-2">
                <a
                  href={`mailto:${ref.email}`}
                  className="flex items-center gap-2 text-xs font-body text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  <Mail size={12} className="text-accent shrink-0" />
                  {ref.email}
                </a>
                <a
                  href={`tel:${ref.number}`}
                  className="flex items-center gap-2 text-xs font-body text-muted-foreground hover:text-accent transition-colors duration-300"
                >
                  <Phone size={12} className="text-accent shrink-0" />
                  {ref.number}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
