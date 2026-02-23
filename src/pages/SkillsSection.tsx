import { motion } from "framer-motion";
import FadeIn from "../components/FadeIn";
import SkillBar from "../components/SkillBar";
import { SKILLS } from "../data/resume-data";

export default function SkillsSection() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <p className="text-xs tracking-[0.3em] uppercase font-body text-accent mb-4">
            Skills
          </p>
          <h2 className="font-sans text-5xl sm:text-6xl font-light text-foreground mb-16 leading-tight">
            Areas of Expertise
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-x-20">
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <SkillBar {...skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
