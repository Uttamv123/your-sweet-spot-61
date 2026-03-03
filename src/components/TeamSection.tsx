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
    linkedin: "https://www.linkedin.com/in/manishgoyal08",
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="gradient-border-card rounded-2xl p-8 hover-lift group"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="font-display text-2xl font-bold text-foreground">{member.name}</h3>
                <span className="text-sm font-semibold gradient-text">{member.role}</span>
                <p className="text-xs text-muted-foreground/60 mt-2 leading-relaxed">{member.tagline}</p>
              </div>

              {/* Bio */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{member.bio}</p>

              {/* Philosophy Card */}
              <div className="glass rounded-xl p-5 mb-6">
                <h4 className="font-display text-sm font-semibold text-foreground mb-2">Core Philosophy & Vision</h4>
                <p className="text-xs text-muted-foreground/70 leading-relaxed">{member.philosophy}</p>
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="font-display text-sm font-semibold text-foreground mb-3">Core Expertise:</h4>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] px-3 py-1.5 rounded-full border border-primary/20 text-muted-foreground/80 bg-primary/[0.04] hover:border-primary/40 hover:bg-primary/[0.08] transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* LinkedIn */}
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="w-full group/btn">
                  <Linkedin size={16} className="mr-2" />
                  Connect with {member.name.split(" ")[0]} on LinkedIn
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
