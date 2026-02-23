import FadeIn from "../components/FadeIn";
import { EXPERIENCES } from "../data/resume-data";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-28 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Experience
          </p>
          <h2 className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight">
            Career Journey
          </h2>
        </FadeIn>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border hidden md:block" />

          <div className="flex flex-col gap-0">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={exp.role} delay={i * 0.12}>
                <div className="md:pl-12 pb-12 relative group">
                  {/* Dot */}
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-accent hidden md:block group-hover:scale-150 transition-transform" />

                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 mb-3">
                    <span className="text-xs tracking-widest font-body text-accent whitespace-nowrap">
                      {exp.year}
                    </span>
                    <div>
                      <h3 className="font-sans text-2xl font-medium text-foreground">
                        {exp.role}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground tracking-wide">
                        {exp.org}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-muted-foreground leading-relaxed font-light text-sm sm:text-base md:max-w-2xl">
                    {exp.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
