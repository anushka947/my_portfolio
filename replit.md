# Gen-Z Dark Rave Portfolio

## Overview
A stunning, fully animated portfolio website with a Gen-Z dark rave theme. Features interactive 3D graphics, smooth scroll animations, neon color scheme, and glassmorphism effects.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite
- **3D Graphics**: React Three Fiber, Three.js, @react-three/drei
- **Animations**: GSAP (GreenSock), Framer Motion
- **Styling**: Tailwind CSS with custom rave theme
- **UI Components**: shadcn/ui
- **Backend**: Express.js (Node.js)
- **Routing**: Wouter

## Project Structure
```
client/
  src/
    components/
      portfolio/           # Portfolio-specific components
        HeroScene.tsx      # 3D Three.js scene with particles
        HeroSection.tsx    # Hero section with animated text
        Navigation.tsx     # Glassmorphic navigation bar
        AboutSection.tsx   # About me with stats
        SkillsSection.tsx  # Skills with animated progress bars
        ExperienceSection.tsx  # Work timeline
        EducationSection.tsx   # Education & certifications
        ProjectsSection.tsx    # Project showcase with 3D tilt
        ContactSection.tsx     # Contact form
        Footer.tsx         # Footer with links
        CustomCursor.tsx   # Custom neon cursor
      ui/                  # shadcn/ui components
    pages/
      home.tsx             # Main portfolio page
    hooks/
    lib/
server/
  routes.ts               # API endpoints
  storage.ts              # Data storage
shared/
  schema.ts               # TypeScript types
```

## Design Theme
- **Colors**: Neon pink (#ff3399), Electric blue (#00d4ff), Acid green (#00ff88), Purple (#9966ff), Orange (#ff9900)
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **Effects**: Glassmorphism, neon glows, particle effects, 3D transforms

## Features
- Interactive 3D hero with floating geometric shapes
- Mouse-responsive particle system
- Smooth scroll-triggered animations (GSAP ScrollTrigger)
- Glassmorphic cards with neon glow effects
- Expandable experience timeline
- 3D tilt effect on project cards
- Custom neon cursor (desktop only)
- Fully responsive design

## Running the App
The app runs on port 5000 using Vite for the frontend and Express for the backend.

## Recent Changes
- Initial portfolio implementation with all sections
- Added Three.js 3D hero scene
- Implemented GSAP scroll animations
- Created custom rave theme with neon colors
