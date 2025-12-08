import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Star, GitFork, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    id: 1,
    title: "3D Portfolio Experience",
    description:
      "An immersive portfolio website featuring interactive 3D elements, particle animations, and smooth page transitions. Built with React Three Fiber and GSAP.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    techStack: ["React", "Three.js", "TypeScript", "GSAP"],
    stats: { stars: 234, forks: 45, views: 1200 },
    featured: true,
    color: "pink",
  },
  {
    id: 2,
    title: "AI Chat Application",
    description:
      "Real-time AI-powered chat application with natural language processing, voice commands, and multi-language support.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    techStack: ["Next.js", "OpenAI", "WebSocket", "Tailwind"],
    stats: { stars: 189, forks: 32, views: 890 },
    featured: true,
    color: "blue",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description:
      "Full-stack e-commerce solution with real-time inventory, secure payments, and admin dashboard for managing products.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    techStack: ["React", "Node.js", "Stripe", "PostgreSQL"],
    stats: { stars: 156, forks: 28, views: 670 },
    featured: false,
    color: "purple",
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "Collaborative task management with real-time updates, drag-and-drop interface, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    techStack: ["React", "Firebase", "Redux", "Material-UI"],
    stats: { stars: 112, forks: 19, views: 450 },
    featured: false,
    color: "green",
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description:
      "Beautiful weather dashboard with interactive maps, 7-day forecasts, and location-based weather alerts.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    techStack: ["Vue.js", "OpenWeather API", "Chart.js", "Leaflet"],
    stats: { stars: 98, forks: 15, views: 380 },
    featured: false,
    color: "orange",
  },
  {
    id: 6,
    title: "Music Streaming App",
    description:
      "Spotify-like music streaming application with playlist management, audio visualization, and social features.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop",
    demoUrl: "https://example.com",
    githubUrl: "https://github.com",
    techStack: ["React Native", "Node.js", "MongoDB", "AWS S3"],
    stats: { stars: 145, forks: 24, views: 560 },
    featured: false,
    color: "pink",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const colorClasses: Record<string, { border: string; glow: string; text: string }> = {
    pink: { border: "border-neon-pink/30", glow: "neon-glow-pink", text: "text-neon-pink" },
    blue: { border: "border-neon-blue/30", glow: "neon-glow-blue", text: "text-neon-blue" },
    purple: { border: "border-neon-purple/30", glow: "neon-glow-purple", text: "text-neon-purple" },
    green: { border: "border-neon-green/30", glow: "neon-glow-green", text: "text-neon-green" },
    orange: { border: "border-neon-orange/30", glow: "neon-glow-pink", text: "text-neon-orange" },
  };

  return (
    <div
      ref={cardRef}
      className={`project-card tilt-card ${project.featured ? "md:col-span-2 md:row-span-2" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
          : "none",
        transition: "transform 0.3s ease-out",
      }}
      data-testid={`card-project-${project.id}`}
    >
      <Card
        className={`h-full overflow-hidden glass border-0 group transition-all duration-500 ${
          isHovered ? colorClasses[project.color].glow : ""
        }`}
      >
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full ${project.featured ? "h-64 md:h-80" : "h-48"} object-cover transition-transform duration-500 group-hover:scale-110`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {project.techStack.slice(0, project.featured ? 4 : 3).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs bg-background/50 backdrop-blur-sm"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass"
              data-testid={`link-project-demo-${project.id}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full glass"
              data-testid={`link-project-github-${project.id}`}
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h3 className={`font-display text-xl font-semibold mb-2 ${colorClasses[project.color].text}`}>
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              <span>{project.stats.stars}</span>
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" />
              <span>{project.stats.forks}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-3.5 w-3.5" />
              <span>{project.stats.views}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".projects-grid",
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32"
      data-testid="section-projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-neon-orange font-mono text-sm tracking-widest uppercase">
            My Work
          </p>
          <h2 className="projects-title font-display text-4xl sm:text-5xl font-bold">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A showcase of my best work, from concept to deployment
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
            data-testid="button-view-all-projects"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
