import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FadeIn from "../components/FadeIn";
import { fetchPortfolio, type PortfolioData } from "../services/portfolioService";
import { supabase } from "../lib/supabase";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function AboutSection() {
  const [data, setData] = useState<PortfolioData | null>(null);
  useEffect(() => { fetchPortfolio().then(setData); }, []);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    const heading = headingRef.current;
    const para = paraRef.current;
    if (!heading || !para || !data) return;

    // Split heading by words
    const splitHeading = new SplitText(heading, { type: "words" });
    gsap.from(splitHeading.words, {
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

    // Split paragraph by words + chars, animate chars staggered up
    const splitPara = new SplitText(para, { type: "words,chars" });
    gsap.from(splitPara.chars, {
      duration: 0.6,
      y: 100,
      autoAlpha: 0,
      stagger: 0.012,
      ease: "power4.out",
      scrollTrigger: {
        trigger: para,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

  }, { dependencies: [data] });

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
              About
            </p>
          </FadeIn>
          <h2
            ref={headingRef}
            className="font-sans text-5xl sm:text-6xl font-light text-foreground leading-tight mb-6"
          >
            Passion for Sport,
            <br />
            <span className="italic">Driven by Purpose</span>
          </h2>
          <FadeIn delay={0.1}>
            <div className="w-10 h-[1px] bg-accent mb-8" />
          </FadeIn>
          {data ? (
            <p ref={paraRef} className="font-body text-muted-foreground leading-relaxed font-light">
              {data.work_profile}
            </p>
          ) : (
            <p className="font-body text-muted-foreground leading-relaxed font-light opacity-0 select-none">
              &nbsp;
            </p>
          )}
        </div>

        <FadeIn delay={0.2}>
          <div className="relative w-72 mx-auto">
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-accent/30 rounded" />
            <div className="relative rounded overflow-hidden">
              <img
                src={supabase.storage.from("work_pic").getPublicUrl("ariana.jpeg").data.publicUrl}
                alt="Ariana"
                className="w-full h-80 object-cover object-top rounded"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
