import { Mail, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import FadeIn from "../components/FadeIn";

export default function ContactSection() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Contact
          </p>
          <h2 className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-4 leading-tight">
            Let&apos;s Connect
          </h2>
          <p className="font-body text-muted-foreground font-light max-w-md mb-16">
            Whether you&apos;re looking to collaborate, partner, or just have a
            conversation about sport — I&apos;d love to hear from you.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-16">
          <FadeIn delay={0.1}>
            <form className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-body text-muted-foreground">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="bg-transparent border-b border-border py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] tracking-[0.2em] uppercase font-body text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-transparent border-b border-border py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-body text-muted-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is this about?"
                  className="bg-transparent border-b border-border py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] tracking-[0.2em] uppercase font-body text-muted-foreground">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Your message..."
                  className="bg-transparent border-b border-border py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="mt-2 self-start px-8 py-3 bg-foreground text-background text-xs tracking-[0.2em] uppercase font-body hover:bg-accent hover:text-foreground transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col gap-10">
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground mb-3">
                  Email
                </p>
                <a
                  href="mailto:ariana@example.com"
                  className="font-sans text-2xl font-light text-foreground hover:text-accent transition-colors flex items-center gap-2 group"
                >
                  ariana@example.com
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground mb-4">
                  Social
                </p>
                <div className="flex flex-col gap-4">
                  {[
                    { icon: Linkedin, label: "LinkedIn", href: "#" },
                    { icon: Instagram, label: "Instagram", href: "#" },
                    { icon: Mail, label: "Email", href: "mailto:ariana@example.com" },
                  ].map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
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
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground mb-2">
                  Based In
                </p>
                <p className="font-sans text-xl font-light text-foreground">
                  New York, USA
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
