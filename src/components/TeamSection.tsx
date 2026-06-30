import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Manish Goyal",
    role: "Consultant",
    tagline: "11+ Years of IT Experience | Cloud Technologies Expert | Technical Architect",
    bio: "Manish Goyal, the Founder of TheCodeReflections, brings over 11 years of extensive IT experience specifically in Cloud technologies. His deep technical knowledge and hands-on expertise in building scalable, robust solutions are the backbone of our technological capabilities.",
    philosophy: "Manish's vision is to empower businesses by simplifying technology. He believes that IT should not be complex, but rather an accessible and easy path for both startups and established businesses to achieve their goals. He is dedicated to creating seamless digital experiences that drive real-world success.",
    expertise: ["Cloud Architecture", "Scalable Solutions", "Technical Leadership", "System Design", "DevOps", "Enterprise Solutions"],
    linkedin: "",
  },
  {
    name: "Dipti Jain",
    role: "Founder",
    tagline: "Master's in Industrial and Product Design | Former Educator | Technology Advocate",
    bio: "Dipti Jain, the visionary Co-Founder of TheCodeReflections, brings a unique blend of pedagogical insight and design thinking to the tech world. With a background as a teacher and holding a Master's in Industrial and Product Design, Dipti understands the power of clear communication and user-centric solutions, especially for non-technical users.",
    philosophy: "Her foundational belief is simple yet profound: technology should never be a barrier to personal or professional development. Beyond technology, Dipti is a strong advocate for women's empowerment and work-life balance, guiding TheCodeReflections' commitment to sustainable growth and harmony.",
    expertise: ["Industrial Design", "Product Design", "User Experience", "Educational Technology", "Business Development", "Team Leadership"],
    linkedin: "https://www.linkedin.com/in/dipti-jain-74b509240",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-28 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-secondary/80 uppercase tracking-[0.3em]">Our Team</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 leading-tight">
            Meet the <span className="gradient-text">Minds Behind</span> the Innovation
          </h2>
          <p className="text-muted-foreground/70 mt-4 max-w-2xl mx-auto">
            A passionate team of technologists and designers building intelligent systems for modern businesses.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
              className="gradient-border-card rounded-2xl p-8 hover-lift group relative overflow-hidden"
            >
              {/* Sheen sweep on hover */}
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1400ms] ease-out"
                style={{
                  background:
                    "linear-gradient(115deg, transparent 35%, hsl(250 60% 58% / 0.08) 50%, transparent 65%)",
                }}
              />

              {/* Header */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.18 + 0.15 }}
              >
                <h3 className="font-display text-2xl font-bold text-foreground transition-transform duration-500 group-hover:-translate-y-0.5">
                  {member.name}
                </h3>
                <span className="text-sm font-semibold gradient-text">{member.role}</span>
                <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">{member.tagline}</p>
              </motion.div>

              {/* Bio */}
              <motion.p
                className="text-sm text-muted-foreground leading-relaxed mb-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.18 + 0.25 }}
              >
                {member.bio}
              </motion.p>

              {/* Philosophy Card */}
              <motion.div
                className="glass rounded-xl p-5 mb-6 transition-transform duration-500 group-hover:-translate-y-0.5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.18 + 0.35 }}
              >
                <h4 className="font-display text-sm font-semibold text-foreground mb-2">Core Philosophy & Vision</h4>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">{member.philosophy}</p>
              </motion.div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="font-display text-sm font-semibold text-foreground mb-3">Core Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, j) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.18 + 0.45 + j * 0.04,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                      whileHover={{ scale: 1.08, y: -2, transition: { duration: 0.2 } }}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-primary/20 text-muted-foreground/80 bg-primary/[0.04] hover:border-primary/40 hover:bg-primary/[0.08] cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* LinkedIn */}
              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.18 + 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block"
                >
                  <Button variant="outline" size="sm" className="w-full group/btn">
                    <Linkedin
                      size={16}
                      className="mr-2 transition-transform duration-500 group-hover/btn:rotate-[-8deg] group-hover/btn:scale-110"
                    />
                    Connect with {member.name.split(" ")[0]} on LinkedIn
                  </Button>
                </motion.a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
