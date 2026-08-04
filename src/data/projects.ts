export type ProjectCategory = "3D Motion" | "2D Motion" | "Interactive";
export type ProjectFilter = "All" | ProjectCategory;

export type ProjectCoverVideo = {
  webm?: string;
  mp4: string;
};

export type ProjectCoverImage = {
  src: string;
  alt: string;
};

export type ProjectDetailVideo = {
  src: string;
  title: string;
  label?: string;
};

export type ProjectGalleryImage = {
  src: string;
  alt: string;
  aspect: "wide" | "shallow" | "square";
  position?: string;
};

export type ProjectGalleryRow =
  | {
      type: "single";
      image: ProjectGalleryImage;
      width?: "full" | "narrow";
    }
  | {
      type: "pair";
      images: [ProjectGalleryImage, ProjectGalleryImage];
    };

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  categories?: ProjectCategory[];
  client: string[];
  discipline: string;
  year?: string;
  visual: string;
  summary: string;
  description: string;
  services: string[];
  software: string[];
  vimeoId?: string;
  coverVimeoId?: string;
  coverVideo?: ProjectCoverVideo;
  coverImage?: ProjectCoverImage;
  detailVideos?: ProjectDetailVideo[];
  gallery?: ProjectGalleryRow[];
  hidden?: boolean;
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
    client: ["Noro"],
    discipline: "3D Motion · Product Film",
    visual: "orb",
    summary: "A 3D product film created for Noro Watch.",
    description: "A product-focused 3D film created to bring Noro Watch's industrial design and material details into focus. Precise metallic surfaces, dark natural textures and warm red accents shape a tactile visual world built around the character of the watch.",
    services: ["3D motion", "Art direction", "Product visualization"],
    software: ["Figma", "Cinema 4D", "After Effects", "Redshift"],
    vimeoId: "1093804333",
    coverVideo: {
      webm: "/videos/covers/noro-watch.webm",
      mp4: "/videos/covers/noro-watch.mp4",
    },
    gallery: [
      {
        type: "single",
        image: {
          src: "/media/projects/noro-watch/images/noro.webp",
          alt: "A collection of Noro Watch product renders",
          aspect: "wide",
        },
      },
      {
        type: "pair",
        images: [
          {
            src: "/media/projects/noro-watch/images/scene-100-v2-0031.webp",
            alt: "Noro Watch case resting on a dark stone surface",
            aspect: "square",
          },
          {
            src: "/media/projects/noro-watch/images/scene-400-nf0160.webp",
            alt: "Noro Watch product detail with warm red lighting",
            aspect: "square",
          },
        ],
      },
      {
        type: "single",
        image: {
          src: "/media/projects/noro-watch/images/scene-350-0160.webp",
          alt: "Noro Watch floating between dark rock formations",
          aspect: "shallow",
        },
      },
      {
        type: "single",
        width: "narrow",
        image: {
          src: "/media/projects/noro-watch/images/scene-400-nf-blur0159.webp",
          alt: "Noro Watch close-up with motion blur",
          aspect: "square",
        },
      },
    ],
  },
  {
    id: "myotaku-ui-micro-interactions",
    title: "Myotaku — UI Micro Interactions",
    category: "Interactive",
    client: ["Myotaku", "AtomSix Design Studio"],
    discipline: "Interactive · UI Motion",
    visual: "interface",
    summary: "A collection of playful UI micro interactions created for Myotaku.",
    description: "A motion system exploring how small interactions can make a digital product feel more responsive, expressive and alive. Each transition supports clarity while adding a distinct sense of personality to the interface.",
    services: ["UI motion", "Interaction design", "Motion design"],
    software: ["Figma", "After Effects"],
    vimeoId: "1094198704",
    coverVideo: {
      webm: "/videos/covers/myotaku-ui-micro-interactions.webm",
      mp4: "/videos/covers/myotaku-ui-micro-interactions.mp4",
    },
    detailVideos: [
      {
        src: "/media/projects/myotaku-ui-micro-interactions/videos/behind-the-scenes.mp4",
        title: "Myotaku behind the scenes",
        label: "Behind the scenes",
      },
    ],
  },
  {
    id: "jurafuchs",
    title: "Jurafuchs - UI Animation",
    category: "2D Motion",
    categories: ["2D Motion", "Interactive"],
    client: ["Jurafuchs"],
    discipline: "2D Motion · Interactive",
    visual: "interface",
    summary: "A 2D interface motion project created for Jurafuchs.",
    description: "A series of interface animations developed to make complex product moments feel simple and intuitive. The work combines clear visual hierarchy with lightweight, characterful motion across the experience.",
    services: ["2D motion", "UI animation", "Interaction design"],
    software: ["Figma", "After Effects"],
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
    client: ["Sirf"],
    discipline: "2D Motion · Interactive",
    visual: "interface",
    summary: "A 2D interface motion project created for Sirf.",
    description: "A collection of product and interface moments shaped through a direct, rhythmic motion language. The system helps guide attention, connect states and give the experience a more confident personality.",
    services: ["2D motion", "UI animation", "Interaction design"],
    software: ["Figma", "After Effects"],
    coverVideo: {
      webm: "/videos/covers/sirf-ui-animation.webm",
      mp4: "/videos/covers/sirf-ui-animation.mp4",
    },
  },
  {
    id: "meallogix",
    title: "Meallogix - UI Animation",
    category: "2D Motion",
    categories: ["2D Motion", "Interactive"],
    client: ["Meallogix"],
    discipline: "2D Motion · Interactive",
    visual: "interface",
    summary: "A 2D interface motion project created for Meallogix.",
    description: "An interface motion study focused on turning everyday product actions into a clear and approachable flow. Transitions connect information, feedback and navigation while keeping the experience light and easy to follow.",
    services: ["2D motion", "UI animation", "Interaction design"],
    software: ["Figma", "After Effects"],
    vimeoId: "849287986",
    coverVideo: {
      webm: "/videos/covers/meallogix-ui-animation.webm",
      mp4: "/videos/covers/meallogix-ui-animation.mp4",
    },
  },
  {
    id: "volume-based-fees",
    title: "Volume Based Fees — InfinitePay",
    category: "3D Motion",
    client: ["InfinitePay"],
    discipline: "3D Motion · Product Communication",
    visual: "orbit",
    summary: "A 3D motion piece explaining InfinitePay's volume based fees.",
    description: "A product communication film designed to turn a pricing concept into a clear visual story. Bold 3D forms and precise transitions explain the system while staying connected to InfinitePay's energetic brand language.",
    services: ["3D motion", "Look development", "Product communication"],
    software: ["Cinema 4D", "After Effects", "Redshift"],
    vimeoId: "1093901208",
    coverImage: {
      src: "/media/projects/volume-based-fees/images/cover.webp",
      alt: "InfinitePay card machine on a creative studio desk",
    },
  },
  {
    id: "lightness-infinitepay",
    title: "Lightness — InfinitePay",
    category: "3D Motion",
    client: ["InfinitePay"],
    discipline: "3D Motion · Brand Film",
    visual: "kinetic",
    summary: "A 3D brand motion study developed for InfinitePay.",
    description: "A visual exploration of lightness expressed through material, movement and space. The piece combines refined 3D imagery with a playful sense of motion to give the brand idea a physical presence.",
    services: ["3D motion", "Art direction", "Brand animation"],
    software: ["Cinema 4D", "After Effects", "Redshift"],
    vimeoId: "1026277698",
    coverImage: {
      src: "/media/projects/lightness-infinitepay/images/cover.webp",
      alt: "Lightness campaign artwork for InfinitePay by Lucas Souza",
    },
    gallery: [
      {
        type: "pair",
        images: [
          {
            src: "/media/projects/lightness-infinitepay/images/imgi-167-886b65192163515-6723d28debf50.webp",
            alt: "InfinitePay Lightness campaign composition with floating 3D forms",
            aspect: "square",
          },
          {
            src: "/media/projects/lightness-infinitepay/images/imgi-399-4ff636192163515-6724260492068.webp",
            alt: "InfinitePay Lightness 3D campaign frame",
            aspect: "square",
          },
        ],
      },
      {
        type: "single",
        image: {
          src: "/media/projects/lightness-infinitepay/images/imgi-51-954588192163515-672a134fea2fe.webp",
          alt: "Wide InfinitePay Lightness brand animation frame",
          aspect: "wide",
        },
      },
      {
        type: "pair",
        images: [
          {
            src: "/media/projects/lightness-infinitepay/images/imgi-403-11d716192163515-672a134e70fbe.webp",
            alt: "InfinitePay Lightness material study in 3D",
            aspect: "square",
          },
          {
            src: "/media/projects/lightness-infinitepay/images/imgi-46-4ff636192163515-6724260492068.webp",
            alt: "InfinitePay Lightness campaign still with sculptural forms",
            aspect: "square",
          },
        ],
      },
      {
        type: "single",
        image: {
          src: "/media/projects/lightness-infinitepay/images/imgi-52-439306192163515-672a134fe9a02.webp",
          alt: "Wide 3D scene from the InfinitePay Lightness campaign",
          aspect: "wide",
        },
      },
    ],
  },
  {
    id: "teachable-payments",
    title: "Teachable Payments",
    category: "2D Motion",
    client: ["Teachable"],
    discipline: "2D Motion · Product",
    visual: "interface",
    summary: "A 2D product motion project for Teachable Payments.",
    description: "A product film created to introduce a payments experience through clear, friendly motion. Interface details, typography and graphic transitions work together to make the product easy to understand at a glance.",
    services: ["2D motion", "Product animation", "Motion design"],
    software: ["Figma", "Illustrator", "After Effects"],
    coverVideo: {
      mp4: "/videos/covers/teachable-payments.mp4",
    },
  },
  {
    id: "ai-avengers",
    title: "AI Avengers — Teachable",
    category: "2D Motion",
    client: ["Teachable"],
    discipline: "2D Motion · Campaign",
    visual: "type",
    summary: "A campaign motion project created for Teachable.",
    description: "A campaign animation built around a bold cast of ideas and an energetic graphic language. Expressive typography and fast-paced transitions give the story momentum while keeping the message playful and accessible.",
    services: ["2D motion", "Campaign animation", "Motion design"],
    software: ["Illustrator", "After Effects"],
    coverVideo: {
      mp4: "/videos/covers/ai-avengers.mp4",
    },
  },
  {
    id: "customer-journey-program-teachable",
    title: "Customer Journey Program - Teachable",
    category: "2D Motion",
    client: ["Teachable"],
    discipline: "2D Motion · Product",
    visual: "signal",
    summary: "A product communication film for Teachable's Customer Journey Program.",
    description: "A clear, approachable motion story created to guide customers through the Teachable journey. Structured interface moments, typography and graphic transitions connect each stage while keeping the product experience easy to follow.",
    services: ["2D motion", "Product animation", "Visual storytelling"],
    software: ["Figma", "Illustrator", "After Effects"],
    coverVideo: {
      mp4: "/videos/covers/customer-journey-program-teachable.mp4",
    },
  },
  {
    id: "teachable",
    title: "Teachable",
    category: "2D Motion",
    client: ["Teachable"],
    discipline: "2D Motion · Brand",
    visual: "orbit",
    summary: "A 2D brand motion project created for Teachable.",
    description: "A brand motion exploration developed to bring consistency and personality across a wide range of communication moments. The system balances expressive movement with flexible rules that can scale across formats.",
    services: ["2D motion", "Brand animation", "Motion system"],
    software: ["Illustrator", "After Effects"],
    hidden: true,
  },
  {
    id: "ui-motion-atomsix",
    title: "UI Motion — Atomsix",
    category: "2D Motion",
    client: ["AtomSix Design Studio"],
    discipline: "2D Motion · UI",
    visual: "signal",
    summary: "A UI motion study created with Atomsix.",
    description: "A focused study of interface transitions, feedback and micro interactions created with Atomsix. Motion works as a functional layer that connects states, guides attention and makes the product feel more polished.",
    services: ["UI motion", "2D animation", "Motion design"],
    software: ["Figma", "After Effects"],
    vimeoId: "1094261707",
    coverVimeoId: "1094261707",
  },
];

export const visibleProjects = projects.filter((project) => !project.hidden);

export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

export function getProjectCategories(project: Project) {
  return project.categories ?? [project.category];
}
