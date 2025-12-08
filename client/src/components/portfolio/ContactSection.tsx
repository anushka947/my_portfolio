import { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, Check, Loader2 } from "lucide-react";
import { SiGithub, SiLinkedin, SiX, SiDribbble } from "react-icons/si";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
  },
];

const socialLinks = [
  { icon: SiGithub, href: "https://github.com", label: "GitHub", color: "hover:text-white" },
  { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-[#0077b5]" },
  { icon: SiX, href: "https://x.com", label: "X", color: "hover:text-white" },
  { icon: SiDribbble, href: "https://dribbble.com", label: "Dribbble", color: "hover:text-[#ea4c89]" },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".contact-title",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".contact-grid",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: "", email: "", message: "" });
        }, 3000);
      } else {
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-card/30"
      data-testid="section-contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <p className="text-neon-pink font-mono text-sm tracking-widest uppercase">
            Get In Touch
          </p>
          <h2 className="contact-title font-display text-4xl sm:text-5xl font-bold">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something amazing.
          </p>
        </div>

        <div className="contact-grid grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-8">
            <Card className="contact-card p-6 glass border-0">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-neon-pink focus:ring-neon-pink/20"
                      data-testid="input-name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-neon-pink focus:ring-neon-pink/20"
                      data-testid="input-email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-background/50 border-border/50 focus:border-neon-pink focus:ring-neon-pink/20 resize-none"
                      data-testid="input-message"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-neon-pink hover:bg-neon-pink/90 neon-glow-pink"
                  disabled={isSubmitting || isSubmitted}
                  data-testid="button-send-message"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          <div className="space-y-8">
            <Card className="contact-card p-6 glass border-0">
              <div className="space-y-6">
                <h3 className="font-display text-xl font-semibold">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-neon-pink/10">
                        <item.icon className="h-5 w-5 text-neon-pink" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-medium hover:text-neon-pink transition-colors"
                            data-testid={`link-contact-${item.label.toLowerCase()}`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-medium" data-testid={`text-contact-${item.label.toLowerCase()}`}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="contact-card p-6 glass border-0">
              <div className="space-y-6">
                <h3 className="font-display text-xl font-semibold">Connect With Me</h3>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 rounded-lg glass transition-all duration-300 hover:neon-glow-pink ${social.color}`}
                      aria-label={social.label}
                      data-testid={`link-social-footer-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="h-6 w-6" />
                    </a>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="contact-card p-6 glass border-0">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-75" />
                </div>
                <div>
                  <p className="font-medium">Available for new projects</p>
                  <p className="text-sm text-muted-foreground">
                    Currently open to freelance work and collaborations
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
