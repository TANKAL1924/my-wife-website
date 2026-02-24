import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import { fetchPortfolio, type PortfolioData } from "../services/portfolioService";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  const [data, setData] = useState<PortfolioData | null>(null);
  useEffect(() => { fetchPortfolio().then(setData); }, []);
  const containerRef = useRef<HTMLElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(".hero-tag", { opacity: 0, y: 16, duration: 0.7 }, 0.1)
      .from(".hero-title", { opacity: 0, y: 20, scale: 0.95, duration: 0.9 }, 0.2)
      .from(".hero-divider", { scaleX: 0, duration: 0.8, transformOrigin: "center" }, 0.5)
      .from(".hero-subtitle", { opacity: 0, y: 16, skewY: 1.5, duration: 0.7, clearProps: "skewY" }, 0.6)
      .from(".hero-buttons", { opacity: 0, y: 16, duration: 0.7 }, 0.8)
      .from(".hero-scroll", { opacity: 0, duration: 0.5 }, 1.2);

    // Bouncing chevron
    gsap.to(chevronRef.current, {
      y: 6,
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Morphing blob 1
    gsap.to(blob1Ref.current, {
      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Morphing blob 2
    gsap.to(blob2Ref.current, {
      borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.5,
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Morphing background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={blob1Ref}
          className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-accent/5 blur-3xl translate-x-1/3 -translate-y-1/4"
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          ref={blob2Ref}
          className="absolute bottom-0 left-0 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-accent/5 blur-3xl -translate-x-1/3 translate-y-1/4"
          style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }}
        />
      </div>

      <div className="relative">
        <p className="hero-tag text-xs tracking-[0.3em] uppercase font-body text-accent mb-6">
          {data?.main_course ?? "Sport Management Professional"}
        </p>

        <h1 className="hero-title font-sans text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-foreground leading-tight mb-6">
          {data?.fullname ?? "Dayang Ariana Binti Mohd Rizal"}
        </h1>

        <div className="hero-divider w-16 h-[1px] bg-accent mx-auto mb-8" />

        <p className="hero-subtitle font-body text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed font-light">
          Bridging the worlds of sport, business, and community — creating
          meaningful impact through strategic leadership.
        </p>

        <div className="hero-buttons mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => scrollTo("Experience")}
            className="px-8 py-3 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-body hover:bg-accent hover:text-foreground transition-all duration-300"
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("Contact")}
            className="px-8 py-3 border border-border text-foreground text-xs tracking-[0.2em] uppercase font-body hover:border-accent hover:text-accent transition-all duration-300"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground">
          Scroll
        </span>
        <div ref={chevronRef}>
          <ChevronDown size={14} className="text-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
