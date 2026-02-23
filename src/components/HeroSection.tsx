import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-accent/5 blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] rounded-full bg-accent/5 blur-3xl -translate-x-1/3 translate-y-1/4" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-6"
        >
          Sport Management Professional
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-6xl sm:text-8xl md:text-9xl font-light tracking-tight text-foreground leading-none mb-6"
        >
          Ariana
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-16 h-[1px] bg-accent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="font-body text-base sm:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed font-light"
        >
          Bridging the worlds of sport, business, and community — creating
          meaningful impact through strategic leadership.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollTo("Projects")}
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
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase font-body text-muted-foreground">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown size={14} className="text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
