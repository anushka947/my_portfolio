import { useEffect, useRef } from "react";
import { ArrowDown, Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroScene } from "./HeroScene";
import gsap from "gsap";

const socialLinks = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <HeroScene />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-neon-blue font-mono text-sm sm:text-base tracking-widest uppercase animate-slide-up opacity-0" style={{ animationDelay: "0.2s" }}>
              Hello, I'm
            </p>
            <h1
              ref={titleRef}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="gradient-text animate-gradient-shift" style={{ backgroundSize: "200% 200%" }}>
                Anushka Kumari
              </span>
              <br />
              <span className="text-foreground">Creative Developer</span>
            </h1>
          </div>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            I craft immersive digital experiences with cutting-edge technologies.
            Specializing in <span className="text-neon-pink">React</span>,{" "}
            <span className="text-neon-blue">Three.js</span>, and{" "}
            <span className="text-neon-purple">TypeScript</span>.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-neon-pink hover:bg-neon-pink/90 text-white neon-glow-pink transition-all duration-300"
              onClick={() => scrollToSection("projects")}
              data-testid="button-view-work"
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-muted-foreground/30 hover:border-neon-blue hover:text-neon-blue transition-all duration-300"
              onClick={() => scrollToSection("contact")}
              data-testid="button-contact"
            >
              Get In Touch
            </Button>
          </div>

          <div className="pt-6 flex justify-center">
            <img
              src="/Anushka.jpg"
              alt="Anushka Kumari"
              className="w-32 h-32 rounded-full object-cover border-2 border-neon-pink shadow-lg"
            />
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass transition-all duration-300 hover:neon-glow-pink group"
                aria-label={social.label}
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-neon-pink transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle"
        aria-label="Scroll to about section"
        data-testid="button-scroll-down"
      >
        <div className="p-3 rounded-full glass hover:neon-glow-pink transition-all duration-300">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </button>
    </section>
  );
}
