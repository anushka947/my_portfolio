import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const skillCategories = [
  {
    title: "Frontend",
    color: "pink",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Three.js", level: 82 },
      { name: "Tailwind CSS", level: 95 },
    ],
  },
  {
    title: "Backend",
    color: "blue",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "REST APIs", level: 92 },
    ],
  },
  {
    title: "Tools & DevOps",
    color: "green",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 78 },
      { name: "AWS", level: 72 },
      { name: "CI/CD", level: 80 },
      { name: "Figma", level: 85 },
    ],
  },
  {
    title: "Other",
    color: "purple",
    skills: [
      { name: "Python", level: 75 },
      { name: "WebGL", level: 70 },
      { name: "Testing", level: 82 },
      { name: "Agile", level: 88 },
      { name: "UI/UX", level: 78 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 1.2,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, barRef);

    return () => ctx.revert();
  }, [level, delay]);

  const colorClasses: Record<string, { bg: string; glow: string }> = {
    pink: { bg: "bg-neon-pink", glow: "neon-glow-pink" },
    blue: { bg: "bg-neon-blue", glow: "neon-glow-blue" },
    green: { bg: "bg-neon-green", glow: "neon-glow-green" },
    purple: { bg: "bg-neon-purple", glow: "neon-glow-purple" },
  };

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground font-mono">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className={`h-full rounded-full ${colorClasses[color].bg} progress-glow transition-all duration-300`}
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".skills-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".skill-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skill-cards-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-card/30"
      data-testid="section-skills"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-neon-blue font-mono text-sm tracking-widest uppercase">
            My Expertise
          </p>
          <h2 className="skills-title font-display text-4xl sm:text-5xl font-bold">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit built over years of hands-on experience
          </p>
        </div>

        <div className="skill-cards-container grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.title}
              className="skill-card p-6 glass border-0"
              data-testid={`card-skill-${category.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-semibold">{category.title}</h3>
                  <Badge
                    variant="outline"
                    className={`border-neon-${category.color}/50 text-neon-${category.color}`}
                  >
                    {category.skills.length} skills
                  </Badge>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                      delay={categoryIndex * 0.1 + skillIndex * 0.05}
                    />
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
