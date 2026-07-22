export type ProjectCategory = "3D Motion" | "2D Motion" | "Interactive";
export type ProjectFilter = "All" | ProjectCategory;

export type ProjectCoverVideo = {
  webm: string;
  mp4: string;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  categories?: ProjectCategory[];
  discipline: string;
  year?: string;
  visual: string;
  summary: string;
  services: string[];
  vimeoId?: string;
  coverVideo?: ProjectCoverVideo;
};

export const filters: ProjectFilter[] = [
  "All",
  "3D Motion",
  "2D Motion",
  "Interactive",
];

export const projects: Project[] = [
  {
    id: "noro-watch",
    title: "Noro Watch",
    category: "3D Motion",
    discipline: "3D Motion · Product Film",
    visual: "orb",
    summary: "A 3D product film created for Noro Watch.",
    services: ["3D motion", "Art direction", "Product visualization"],
    vimeoId: "1093804333",
    coverVideo: {
      webm: "/videos/covers/noro-watch.webm",
      mp4: "/videos/covers/noro-watch.mp4",
    },
  },
  {
    id: "myotaku-ui-micro-interactions",
    title: "Myotaku — UI Micro Interactions",
    category: "Interactive",
    discipline: "Interactive · UI Motion",
    visual: "interface",
    summary: "A collection of playful UI micro interactions created for Myotaku.",
    services: ["UI motion", "Interaction design", "Motion design"],
    coverVideo: {
      webm: "/videos/covers/myotaku-ui-micro-interactions.webm",
      mp4: "/videos/covers/myotaku-ui-micro-interactions.mp4",
    },
  },
  {
    id: "jurafuchs",
    title: "JuraFuchs",
    category: "2D Motion",
    categories: ["2D Motion", "Interactive"],
    discipline: "2D Motion · Interactive",
    visual: "interface",
    summary: "A 2D interface motion project created for JuraFuchs.",
    services: ["2D motion", "UI animation", "Interaction design"],
    coverVideo: {
      webm: "/videos/covers/jurafuchs-ui-animation.webm",
      mp4: "/videos/covers/jurafuchs-ui-animation.mp4",
    },
  },
  {
    id: "sirf",
    title: "Sirf",
    category: "2D Motion",
    categories: ["2D Motion", "Interactive"],
    discipline: "2D Motion · Interactive",
    visual: "interface",
    summary: "A 2D interface motion project created for Sirf.",
    services: ["2D motion", "UI animation", "Interaction design"],
    coverVideo: {
      webm: "/videos/covers/sirf-ui-animation.webm",
      mp4: "/videos/covers/sirf-ui-animation.mp4",
    },
  },
  {
    id: "meallogix",
    title: "MealLogix",
    category: "2D Motion",
    categories: ["2D Motion", "Interactive"],
    discipline: "2D Motion · Interactive",
    visual: "interface",
    summary: "A 2D interface motion project created for MealLogix.",
    services: ["2D motion", "UI animation", "Interaction design"],
    coverVideo: {
      webm: "/videos/covers/meallogix-ui-animation.webm",
      mp4: "/videos/covers/meallogix-ui-animation.mp4",
    },
  },
  {
    id: "volume-based-fees",
    title: "Volume Based Fees — InfinitePay",
    category: "3D Motion",
    discipline: "3D Motion · Product Communication",
    visual: "orbit",
    summary: "A 3D motion piece explaining InfinitePay's volume based fees.",
    services: ["3D motion", "Look development", "Product communication"],
    vimeoId: "1093901208",
  },
  {
    id: "lightness-infinitepay",
    title: "Lightness — InfinitePay",
    category: "3D Motion",
    discipline: "3D Motion · Brand Film",
    visual: "kinetic",
    summary: "A 3D brand motion study developed for InfinitePay.",
    services: ["3D motion", "Art direction", "Brand animation"],
    vimeoId: "1093848809",
  },
  {
    id: "teachable-payments",
    title: "Teachable Payments",
    category: "2D Motion",
    discipline: "2D Motion · Product",
    visual: "interface",
    summary: "A 2D product motion project for Teachable Payments.",
    services: ["2D motion", "Product animation", "Motion design"],
  },
  {
    id: "ai-avengers",
    title: "AI Avengers — Teachable",
    category: "2D Motion",
    discipline: "2D Motion · Campaign",
    visual: "type",
    summary: "A campaign motion project created for Teachable.",
    services: ["2D motion", "Campaign animation", "Motion design"],
  },
  {
    id: "b2b-bulk-distribution",
    title: "B2B Bulk Distribution — Teachable",
    category: "2D Motion",
    discipline: "2D Motion · Product",
    visual: "signal",
    summary: "A 2D product communication piece created for Teachable.",
    services: ["2D motion", "Product animation", "Visual storytelling"],
  },
  {
    id: "teachable",
    title: "Teachable",
    category: "2D Motion",
    discipline: "2D Motion · Brand",
    visual: "orbit",
    summary: "A 2D brand motion project created for Teachable.",
    services: ["2D motion", "Brand animation", "Motion system"],
  },
  {
    id: "enterprise-teachable",
    title: "Enterprise — Teachable",
    category: "Interactive",
    discipline: "Interactive · Product",
    visual: "interface",
    summary: "An interactive product experience created for Teachable Enterprise.",
    services: ["Interaction design", "UX/UI motion", "Creative development"],
  },
  {
    id: "threejs-game-vibejam",
    title: "Three.js Game Vibejam",
    category: "Interactive",
    discipline: "Interactive · Creative Development",
    visual: "kinetic",
    summary: "An interactive Three.js game experiment created for Vibejam.",
    services: ["Creative development", "Three.js", "Interaction design"],
  },
  {
    id: "ui-motion-atomsix",
    title: "UI Motion — Atomsix",
    category: "2D Motion",
    discipline: "2D Motion · UI",
    visual: "signal",
    summary: "A UI motion study created with Atomsix.",
    services: ["UI motion", "2D animation", "Motion design"],
    vimeoId: "1094261707",
  },
];

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProjectCategories(project: Project) {
  return project.categories ?? [project.category];
}
