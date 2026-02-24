import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Phone, ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { fetchPortfolio, type PortfolioData } from "../services/portfolioService";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ContactSection() {
  const [data, setData] = useState<PortfolioData | null>(null);
  useEffect(() => { fetchPortfolio().then(setData); }, []);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // SplitText morph on heading
    const heading = headingRef.current;
    if (heading) {
      const split = new SplitText(heading, { type: "chars" });
      gsap.from(split.chars, {
        opacity: 0,
        y: 60,
        scale: 0.7,
        skewX: 10,
        duration: 0.6,
        stagger: 0.025,
        ease: "power4.out",
        clearProps: "skewX,scale",
        scrollTrigger: {
          trigger: heading,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Stagger morph each contact block
    gsap.from(".contact-block", {
      opacity: 0,
      y: 40,
      scale: 0.92,
      skewY: 1.5,
      duration: 0.7,
      stagger: 0.15,
      ease: "power4.out",
      clearProps: "skewY,scale",
      scrollTrigger: {
        trigger: ".contact-blocks",
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Contact
          </p>
        </FadeIn>
        <h2
          ref={headingRef}
          className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-4 leading-tight"
        >
          Let&apos;s Connect
        </h2>
        <FadeIn delay={0.1}>
          <p className="font-body text-muted-foreground font-light max-w-md mb-16">
            Whether you&apos;re looking to collaborate, partner, or just have a
            conversation about sport — I&apos;d love to hear from you.
          </p>
        </FadeIn>

        <div className="contact-blocks max-w-md flex flex-col gap-10">
          <div className="contact-block">
            <p className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground mb-3">
              Email
            </p>
            <a
              href={`mailto:${data?.email ?? ""}`}
              className="font-sans text-2xl font-light text-foreground hover:text-accent transition-colors flex items-center gap-2 group"
            >
              {data?.email ?? "—"}
              <ArrowUpRight
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </div>
          <div className="contact-block">
            <p className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground mb-4">
              Social
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: data?.linkedin
                    ? data.linkedin.startsWith("http")
                      ? data.linkedin
                      : `https://${data.linkedin}`
                    : "#",
                  external: true,
                },
                { icon: Phone, label: data?.phone ?? "Phone", href: `tel:${data?.phone ?? ""}`, external: false },
              ].map(({ icon: Icon, label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 group text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon size={16} className="group-hover:text-accent transition-colors" />
                  <span className="text-sm font-body tracking-wide">{label}</span>
                  <ArrowUpRight
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="contact-block">
            <p className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground mb-2">
              Based In
            </p>
            <p className="font-sans text-xl font-light text-foreground">
              {data ? `${data.district}, ${data.country}` : "—"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
