import { useEffect, useRef } from "react";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const education = [
  {
    id: 1,
    degree: "Master of Computer Science",
    institution: "Stanford University",
    period: "2016 - 2018",
    description:
      "Specialized in Human-Computer Interaction and Web Technologies. Thesis on immersive web experiences using WebGL.",
    achievements: ["GPA: 3.9/4.0", "Dean's List", "Research Assistant"],
    icon: GraduationCap,
    color: "pink",
  },
  {
    id: 2,
    degree: "Bachelor of Science in Software Engineering",
    institution: "MIT",
    period: "2012 - 2016",
    description:
      "Comprehensive foundation in software development, algorithms, and system design. Active participant in hackathons and coding competitions.",
    achievements: ["Magna Cum Laude", "ACM Member", "Hackathon Winner"],
    icon: BookOpen,
    color: "blue",
  },
];

const certifications = [
  {
    name: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    year: "2023",
  },
  {
    name: "Google Cloud Professional",
    issuer: "Google",
    year: "2022",
  },
  {
    name: "React Advanced Concepts",
    issuer: "Meta",
    year: "2021",
  },
  {
    name: "TypeScript Master",
    issuer: "Microsoft",
    year: "2020",
  },
];

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".education-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".education-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".education-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".education-timeline",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".cert-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".certifications-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-card/30"
      data-testid="section-education"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-neon-green font-mono text-sm tracking-widest uppercase">
            Academic Background
          </p>
          <h2 className="education-title font-display text-4xl sm:text-5xl font-bold">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div className="education-timeline relative space-y-6">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-neon-pink to-neon-blue hidden sm:block" />

            {education.map((edu) => (
              <Card
                key={edu.id}
                className="education-card p-6 glass border-0 relative sm:ml-16"
                data-testid={`card-education-${edu.id}`}
              >
                <div
                  className={`absolute left-0 sm:-left-16 top-6 w-12 h-12 rounded-full glass flex items-center justify-center hidden sm:flex neon-glow-${edu.color}`}
                >
                  <edu.icon className={`h-6 w-6 text-neon-${edu.color}`} />
                </div>

                <div className="space-y-4">
                  <div>
                    <p className={`text-sm font-mono text-neon-${edu.color} mb-1`}>{edu.period}</p>
                    <h3 className="font-display text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-muted-foreground">{edu.institution}</p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {edu.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {edu.achievements.map((achievement) => (
                      <Badge
                        key={achievement}
                        variant="outline"
                        className={`border-neon-${edu.color}/50 text-neon-${edu.color} text-xs`}
                      >
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-lg glass neon-glow-purple">
                <Award className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="font-display text-2xl font-semibold">Professional Certifications</h3>
            </div>

            <div className="certifications-grid grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <Card
                  key={cert.name}
                  className="cert-card p-4 glass border-0 transition-all duration-300 hover:neon-glow-purple"
                  data-testid={`card-certification-${index}`}
                >
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-neon-purple">{cert.year}</p>
                    <h4 className="font-semibold text-sm">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
