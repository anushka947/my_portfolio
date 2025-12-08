import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-3" : "py-6"
      }`}
      data-testid="navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="font-display text-2xl font-bold gradient-text"
            data-testid="link-logo"
          >
            &lt;DEV/&gt;
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-md ${
                  activeSection === item.href.slice(1)
                    ? "text-neon-pink"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-pink neon-glow-pink" />
                )}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <Button
              variant="outline"
              className="border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
              onClick={() => handleNavClick("#contact")}
              data-testid="button-hire-me"
            >
              Hire Me
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass-strong mt-2 mx-4 rounded-lg overflow-hidden animate-scale-in">
          <div className="py-4 px-2 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`px-4 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-neon-pink bg-neon-pink/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 px-2">
              <Button
                variant="outline"
                className="w-full border-neon-pink/50 text-neon-pink hover:bg-neon-pink/10"
                onClick={() => handleNavClick("#contact")}
                data-testid="button-mobile-hire-me"
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
