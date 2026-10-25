# Developer Portfolio Landing Page

A modern, high-performance, single-page developer portfolio landing page featuring a dark glassmorphic design system, custom CSS variables, dynamic matrix rain easter eggs, an interactive CLI terminal, and smooth sound effects.

---

## Technologies Used

- **HTML5**: Semantic elements (`<header>`, `<section>`, `<article>`, `<footer>`) for accessible structure.
- **CSS3**: Modern Flexbox, CSS Grid layouts, custom CSS variables (`:root`), glassmorphism backdrop blurs, and keyframe animations.
- **Vanilla JavaScript (ES6+)**: Intersection Observer for scroll animations, Web Audio API for UI audio feedback, HTML5 Canvas for Matrix rain graphics, and custom DOM handling.
- **Google Fonts**: Inter & Courier New for typography.

---

## Features

- **Dark Glassmorphism Theme**: Sleek UI with custom palette (`#06110C`, `#171717`, `#A31C1B`).
- **Interactive CLI Terminal**: Functional hero terminal accepting commands like `help`, `projects`, `skills`, `contact`, `matrix`, and `clear`.
- **Theme Toggle**: Light/Dark mode switcher with persistent state via `localStorage`.
- **Sound Effects Engine**: Web Audio API-generated synthetic sound feedback on user interactions (toggleable).
- **Matrix Rain Overlay**: Secret canvas-rendered Matrix visual effect triggered via CLI input.
- **Smooth Animations**: Intersection Observer fade-and-slide scroll animations and 3D card perspective tilt.

---

## Project Structure

```text
my-portfolio/
│
├── index.html       # Structural layout & HTML5 content
├── style.css        # Glassmorphism design system & CSS variables
├── script.js        # Terminal, audio, themes, & observer scripts
└── README.md        # Documentation & guide
```

## Setup Instructions

No complex build tools or NPM dependencies required! You can set up and run this project locally in seconds:

1. Clone the repository:

   Bash
   git clone [https://github.com/your-username/portfolio-landing-page.git](https://github.com/ your-username/portfolio-landing-page.git)

2. Navigate into the project directory:

   Bash
   cd portfolio-landing-page

3. Run the application:
   Double-click index.html to open it directly in any browser.

   Alternatively, open the folder in VS Code and use the Live Server extension (Alt + L, Alt + O) to preview live changes.

## GitHub Repository:

Repository: https://github.com/your-username/portfolio-landing-page

Live Demo: https://your-username.github.io/portfolio-landing-page
