import { useEffect, useRef } from "react";
import { Code2, Palette, Zap, Coffee } from "lucide-react";
import { Card } from "@/components/ui/card";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code with best practices",
    color: "neon-pink",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Crafting beautiful interfaces that engage users",
    color: "neon-blue",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing for speed and seamless experiences",
    color: "neon-green",
  },
  {
    icon: Coffee,
    title: "Dedication",
    description: "Passionate about continuous learning and growth",
    color: "neon-purple",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".highlight-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-neon-pink font-mono text-sm tracking-widest uppercase">
                About Me
              </p>
              <h2 className="about-title font-display text-4xl sm:text-5xl font-bold">
                Crafting Digital
                <br />
                <span className="gradient-text">Experiences</span>
              </h2>
            </div>

            <div className="about-text space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a passionate full-stack developer with over 5 years of experience
                building modern web applications. My journey began with curiosity about
                how things work on the internet, and evolved into a deep love for
                creating exceptional digital experiences.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with the
                developer community. I believe in the power of technology to transform
                ideas into reality.
              </p>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-neon-pink" data-testid="text-years-experience">5+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-neon-blue" data-testid="text-projects-completed">50+</p>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-neon-purple" data-testid="text-happy-clients">30+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </div>

          <div ref={cardsRef} className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <Card
                key={item.title}
                className={`highlight-card p-6 glass border-0 group transition-all duration-300 hover:neon-glow-${item.color.replace("neon-", "")}`}
                data-testid={`card-highlight-${index}`}
              >
                <div className="space-y-4">
                  <div
                    className={`inline-flex p-3 rounded-lg bg-${item.color}/10`}
                  >
                    <item.icon className={`h-6 w-6 text-${item.color}`} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
