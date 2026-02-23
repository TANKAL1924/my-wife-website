import FadeIn from "../components/FadeIn";

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            About
          </p>
          <h2 className="font-sans text-5xl sm:text-6xl font-light text-foreground leading-tight mb-6">
            Passion for Sport,
            <br />
            <span className="italic">Driven by Purpose</span>
          </h2>
          <div className="w-10 h-[1px] bg-accent mb-8" />
          <p className="font-body text-muted-foreground leading-relaxed mb-5 font-light">
            I am a sport management professional dedicated to the business,
            culture, and community surrounding sport. From managing high-stakes
            events to forging strategic partnerships, I thrive where sport
            meets leadership.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed font-light">
            With a background in event operations, marketing, and athlete
            relations, I bring a holistic perspective to every role. I believe
            sport has the power to transform lives — and I am committed to
            making that transformation as broad and inclusive as possible.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-accent/30 rounded" />
            <div className="relative bg-secondary rounded p-10">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { number: "5+", label: "Years of Experience" },
                  { number: "30+", label: "Events Managed" },
                  { number: "$1.7M+", label: "Sponsorship Value" },
                  { number: "3", label: "Industry Awards" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="font-sans text-4xl font-light text-accent mb-1">
                      {stat.number}
                    </p>
                    <p className="text-xs tracking-wide font-body text-muted-foreground uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
