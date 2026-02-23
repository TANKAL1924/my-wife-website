import { ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";
import { PROJECTS } from "../data/resume-data";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Projects
          </p>
          <h2 className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight">
            Selected Work
          </h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-6">
          {PROJECTS.map((proj, i) => (
            <FadeIn key={proj.title} delay={i * 0.1}>
              <div className="group bg-card border border-border p-8 hover:border-accent/50 transition-all duration-400 cursor-default h-full flex flex-col">
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
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
