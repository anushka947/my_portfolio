import { Heart } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: SiGithub, href: "https://github.com", label: "GitHub" },
  { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiX, href: "https://x.com", label: "X" },
];

export function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative py-12 border-t border-border/50" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="font-display text-2xl font-bold gradient-text"
              data-testid="link-footer-logo"
            >
              &lt;DEV/&gt;
            </a>
            <p className="text-sm text-muted-foreground text-center md:text-left">
              Building digital experiences that matter.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`link-footer-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-neon-pink transition-colors"
                aria-label={social.label}
                data-testid={`link-footer-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p data-testid="text-copyright">
              {new Date().getFullYear()} All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-neon-pink animate-pulse" /> using React & Three.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
