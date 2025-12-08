# Gen-Z Dark Rave Portfolio Design Guidelines

## Design Approach
**Aesthetic Direction:** Cyberpunk/Dark Rave inspired by platforms like Awwwards-winning portfolios, CodePen experiments, and modern gaming interfaces. Think neon-lit underground club meets futuristic tech showcase.

**Core Principles:**
- Maximum visual impact through depth and dimensionality
- High contrast between dark backgrounds and luminous elements
- Kinetic energy through purposeful animations
- Rebellious asymmetry balanced with functional clarity

## Typography

**Font Stack:**
- Primary Display: "Space Grotesk" or "Orbitron" (Google Fonts) - bold, geometric, tech-forward for headings
- Secondary/Body: "Inter" or "DM Sans" - clean, readable for content
- Accent/Code: "JetBrains Mono" - for tech stack tags and technical details

**Hierarchy:**
- Hero Title: text-6xl to text-8xl, font-bold, tracking-tight
- Section Headers: text-4xl to text-5xl, font-bold
- Subsections: text-2xl to text-3xl, font-semibold
- Body: text-base to text-lg, leading-relaxed
- Labels/Tags: text-sm, font-medium, uppercase tracking-wide

## Layout System

**Spacing Scale:** Use Tailwind units of 4, 8, 12, 16, 24, 32 (p-4, m-8, gap-12, etc.)

**Container Strategy:**
- Full-bleed sections with max-w-7xl inner containers
- Asymmetric grid layouts: mix of 60/40 and 70/30 splits
- Generous breathing room: py-24 to py-32 for desktop sections, py-12 to py-16 mobile

**Grid Patterns:**
- Skills: Bento-box style grid with varying card sizes (mix of 1x1, 1x2, 2x1 cells)
- Projects: Masonry or staggered grid layout, not uniform
- Experience: Diagonal timeline with alternating left/right placement

## Component Library

**3D Interactive Hero:**
- Full viewport canvas background with Three.js scene
- Floating geometric primitives (cubes, toruses, spheres) with glow materials
- Particle system responding to cursor movement
- Centered title stack with name, role, and glowing CTA button
- Scroll indicator with pulsing animation at bottom

**Skill Cards:**
- Glassmorphic cards with backdrop blur
- Animated progress rings or bars for proficiency levels
- Skill icons with glow effects on hover
- Category badges with outlined borders
- Stagger animations on scroll trigger

**Experience Timeline:**
- Vertical connector line with animated dot indicators
- Expandable cards revealing detailed descriptions
- Company logos with subtle float animation
- Tech stack pills with hover expand effect
- Date markers positioned along timeline

**Project Showcase:**
- Large preview cards with 3D tilt on hover
- Live demo and GitHub buttons with icon integration
- Tech stack badges arranged in arc or scattered pattern
- Quick-view overlay on card hover showing project highlights
- Featured projects get 2x size treatment

**Navigation:**
- Fixed header with blur backdrop during scroll
- Animated hamburger to X transition for mobile
- Section indicators/dots for scroll progress
- Magnetic hover effect on nav links

**Footer:**
- Split layout: Contact form on left, social links and quick info on right
- Animated social icons with platform-specific glow colors
- Availability status indicator with pulse effect
- Background pattern with subtle Three.js ambient animation

## Animations & Interactions

**Page Transitions (Barba.js):**
- Glitch/distortion effect between page loads
- Liquid morph transitions for smooth feel
- Exit: elements scatter/dissolve
- Enter: elements reconstruct with stagger

**Scroll Animations:**
- Parallax depth on background elements
- Reveal animations: slide-up with opacity fade
- Number counters for stats/achievements
- Horizontal scroll sections for project galleries
- Section-based scroll snapping for intentional pacing

**Micro-interactions:**
- Custom cursor with trailing glow particles
- Button hover: glow intensity increase with scale
- Card hover: 3D transform with shadow depth
- Link underline: animated scan-line effect
- Form inputs: neon border pulse on focus

**Performance Balance:**
- Three.js optimized for 60fps (limit particles to 2000-3000)
- Lazy load animations below fold
- Reduce motion support for accessibility
- GPU-accelerated transforms only

## Images

**Hero Section:** NO static image - interactive 3D Three.js scene only

**Project Thumbnails:** 
- High-quality screenshots or mockups (16:9 ratio)
- Positioned within project cards with subtle parallax on scroll
- Apply scanline or grain overlay for rave aesthetic

**About/Profile:**
- Professional photo with duotone treatment or glow outline effect
- Positioned in dedicated About section with diagonal crop or geometric frame

**Company Logos (Experience):**
- Monochrome versions with glow effect matching brand colors
- Small format (80x80px) positioned at card tops

## Mobile Optimization

- Single column layouts throughout
- Touch-friendly card sizes (min 80px tap targets)
- Simplified Three.js scene for performance
- Reduced particle count and animation complexity
- Collapsible sections for experience/education details
- Sticky mobile navigation with minimal height

This portfolio prioritizes **bold visual presence** over conservative restraint - every section should feel energetic and showcase technical prowess through design execution itself.