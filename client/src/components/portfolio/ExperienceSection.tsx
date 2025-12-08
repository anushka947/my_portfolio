import { useEffect, useRef, useState } from "react";
import { ChevronDown, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description:
      "Leading the frontend development team, architecting scalable React applications, and implementing cutting-edge animations with Three.js. Reduced load time by 40% through performance optimizations.",
    techStack: ["React", "TypeScript", "Three.js", "GraphQL", "AWS"],
    color: "pink",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "StartupHub",
    location: "New York, NY",
    period: "2020 - 2022",
    description:
      "Built and maintained multiple web applications from scratch. Collaborated with designers and product managers to deliver user-centric solutions. Implemented CI/CD pipelines and automated testing.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "Tailwind"],
    color: "blue",
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Digital Agency",
    location: "Los Angeles, CA",
    period: "2019 - 2020",
    description:
      "Developed responsive web applications for diverse clients across industries. Focused on creating accessible, performant interfaces with smooth animations and interactions.",
    techStack: ["React", "JavaScript", "SCSS", "Redux", "Figma"],
    color: "purple",
  },
  {
    id: 4,
    role: "Junior Developer",
    company: "WebDev Studios",
    location: "Remote",
    period: "2018 - 2019",
    description:
      "Started my professional journey building websites and learning modern web technologies. Gained experience in agile methodologies and collaborative development.",
    techStack: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress"],
    color: "green",
  },
];

function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const colorClasses: Record<string, { border: string; bg: string; text: string }> = {
    pink: { border: "border-neon-pink/50", bg: "bg-neon-pink/10", text: "text-neon-pink" },
    blue: { border: "border-neon-blue/50", bg: "bg-neon-blue/10", text: "text-neon-blue" },
    purple: { border: "border-neon-purple/50", bg: "bg-neon-purple/10", text: "text-neon-purple" },
    green: { border: "border-neon-green/50", bg: "bg-neon-green/10", text: "text-neon-green" },
  };

  return (
    <div
      ref={cardRef}
      className={`experience-card relative ${index % 2 === 0 ? "lg:pr-8" : "lg:pl-8 lg:col-start-2"}`}
      data-testid={`card-experience-${experience.id}`}
    >
      <div
        className={`absolute top-8 ${
          index % 2 === 0 ? "lg:right-0 lg:translate-x-1/2" : "lg:left-0 lg:-translate-x-1/2"
        } hidden lg:flex items-center justify-center w-4 h-4 rounded-full ${colorClasses[experience.color].bg} ${colorClasses[experience.color].border} border-2 z-10`}
      >
        <div className={`w-2 h-2 rounded-full ${colorClasses[experience.color].bg}`} />
      </div>

      <Card
        className={`p-6 glass border-0 cursor-pointer transition-all duration-300 ${
          isExpanded ? `neon-glow-${experience.color}` : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <h3 className="font-display text-xl font-semibold">{experience.role}</h3>
              <p className={`font-medium ${colorClasses[experience.color].text}`}>
                {experience.company}
              </p>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{experience.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{experience.location}</span>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pt-4 space-y-4 border-t border-border">
              <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className={`${colorClasses[experience.color].border} ${colorClasses[experience.color].text} text-xs`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".experience-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".experience-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".experience-card",
        { opacity: 0, x: (i) => (i % 2 === 0 ? -30 : 30) },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 80%",
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
      id="experience"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      data-testid="section-experience"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-neon-purple font-mono text-sm tracking-widest uppercase">
            Career Path
          </p>
          <h2 className="experience-title font-display text-4xl sm:text-5xl font-bold">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My professional journey through innovative companies and challenging projects
          </p>
        </div>

        <div className="experience-timeline relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-pink via-neon-purple to-neon-blue" />

          <div className="grid lg:grid-cols-2 gap-8">
            {experiences.map((experience, index) => (
              <ExperienceCard key={experience.id} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
