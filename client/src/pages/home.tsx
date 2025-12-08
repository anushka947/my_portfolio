import {
  Navigation,
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  EducationSection,
  ProjectsSection,
  ContactSection,
  Footer,
  CustomCursor,
} from "@/components/portfolio";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
