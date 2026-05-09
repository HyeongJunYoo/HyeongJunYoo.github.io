export type ProjectTone = "hot" | "aqua" | "violet" | "lime" | "orange" | "acid";

export type ProjectStat = {
  value: string;
  label: string;
};

export type ProjectLinks = {
  play?: string;
  source?: string;
  devlog?: string;
};

export type Project = {
  id: string;
  title: string;
  level: "featured" | "core" | "support";
  eyebrow: string;
  period: string;
  role: string;
  engine: string;
  platform: string;
  genre: string;
  team: string;
  status: string;
  summary: string;
  whatIBuilt: string;
  image: string;
  tone: ProjectTone;
  stack: string[];
  stats: ProjectStat[];
  gallery: string[];
  links: ProjectLinks;
  theta: number;
  phi: number;
  width: number;
  height: number;
  gridX: number;
  gridY: number;
};

export const projects: Project[] = [
  {
    id: "project-nemesis",
    title: "PROJECT NEMESIS",
    level: "featured",
    eyebrow: "Featured 01",
    period: "2025 · 9 months",
    role: "Lead Programmer",
    engine: "Unreal 5.3",
    platform: "PC / Steam",
    genre: "Multiplayer Action",
    team: "5명",
    status: "Shipped",
    summary: "한 줄 요약 — 어떤 게임이고 본인이 어떤 시스템을 책임졌는지 한 문장으로.",
    whatIBuilt: "멀티플레이어 동기화 레이어, 무기 lag-compensation, 커스텀 매치메이킹, 인벤토리 직렬화. 30 tickrate에서 64명 동시접속까지 검증.",
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=84",
    tone: "hot",
    stack: ["Unreal 5.3", "C++", "Replication", "EOS", "Niagara"],
    stats: [
      { value: "60", label: "FPS @ 1080p" },
      { value: "64", label: "Concurrent players" },
      { value: "2.1GB", label: "Build size" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      play: "#",
      source: "#",
      devlog: "#"
    },
    theta: 0,
    phi: -8,
    width: 260,
    height: 330,
    gridX: -410,
    gridY: -150
  },
  {
    id: "echo-runner",
    title: "ECHO RUNNER",
    level: "core",
    eyebrow: "Core 02",
    period: "2024 · 4 months",
    role: "Gameplay Programmer",
    engine: "Unity 6",
    platform: "PC",
    genre: "Action",
    team: "Solo",
    status: "Prototype",
    summary: "리듬 기반 액션 러너 프로토타입. 입력 윈도우와 비주얼 큐가 BPM에 맞춰 동기화.",
    whatIBuilt: "오디오 타임라인 동기화, 입력 윈도우 시스템, ScriptableObject 기반 패턴 빌더, URP shader 핏.",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1400&q=84",
    tone: "aqua",
    stack: ["Unity 6", "C#", "URP", "DOTween", "Audio Timeline"],
    stats: [
      { value: "120", label: "FPS @ 1440p" },
      { value: "<8ms", label: "Input latency" },
      { value: "320MB", label: "Build size" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      play: "#",
      source: "#"
    },
    theta: 72,
    phi: 10,
    width: 238,
    height: 294,
    gridX: -120,
    gridY: -160
  },
  {
    id: "rune-tactics",
    title: "RUNE TACTICS",
    level: "core",
    eyebrow: "Core 03",
    period: "2024 · 48-hour jam",
    role: "Tools / Gameplay",
    engine: "Unreal 5.3",
    platform: "PC",
    genre: "FPS",
    team: "3명",
    status: "Game Jam",
    summary: "48시간 잼 출품작 — 룬을 조합해 무기를 만드는 FPS.",
    whatIBuilt: "런타임 룬 결합 시스템, 데이터 드리븐 무기 빌더, 절차적 던전 청크 스폰, AI 패스 그리드.",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=1400&q=84",
    tone: "violet",
    stack: ["Unreal 5.3", "Blueprints", "C++", "Behavior Tree"],
    stats: [
      { value: "48h", label: "Dev time" },
      { value: "12+", label: "Rune combos" },
      { value: "2nd", label: "Jam ranking" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      source: "#",
      devlog: "#"
    },
    theta: 142,
    phi: -4,
    width: 220,
    height: 270,
    gridX: 150,
    gridY: -150
  },
  {
    id: "poly-drift",
    title: "POLY DRIFT",
    level: "core",
    eyebrow: "Core 04",
    period: "2023 · 6 months",
    role: "Gameplay Programmer",
    engine: "Godot 4",
    platform: "PC / Mobile",
    genre: "Puzzle",
    team: "2명",
    status: "Shipped",
    summary: "로우폴리 드리프트 퍼즐. 코너 드리프트 라인을 그려 시간 경쟁.",
    whatIBuilt: "차량 물리 컨트롤러, 시간 압축 리플레이, 모바일 터치 입력 어댑터, 리더보드 백엔드 연동.",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=84",
    tone: "lime",
    stack: ["Godot 4", "GDScript", "C#", "REST"],
    stats: [
      { value: "60", label: "FPS @ 4K" },
      { value: "120", label: "Tracks" },
      { value: "180MB", label: "Build size" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      play: "#",
      source: "#"
    },
    theta: 214,
    phi: 12,
    width: 200,
    height: 240,
    gridX: 400,
    gridY: -110
  },
  {
    id: "render-lab",
    title: "RENDER LAB",
    level: "core",
    eyebrow: "Core 05",
    period: "2023 · ongoing",
    role: "Tech Programmer",
    engine: "Custom (C++/Vulkan)",
    platform: "PC",
    genre: "Tech Demo",
    team: "Solo",
    status: "Prototype",
    summary: "취미 프로젝트 — 자체 C++/Vulkan 렌더러로 PBR 머티리얼·쉐도우 캐스케이드 실험.",
    whatIBuilt: "Vulkan 커맨드 그래프, GLTF 로더, PBR uber shader, CSM, 디퍼드 G-buffer.",
    image: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=84",
    tone: "orange",
    stack: ["C++", "Vulkan", "GLSL", "GLTF"],
    stats: [
      { value: "144", label: "FPS @ 1440p" },
      { value: "6", label: "Cascade splits" },
      { value: "OSS", label: "License" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
    ],
    links: {
      source: "#",
      devlog: "#"
    },
    theta: 288,
    phi: -2,
    width: 200,
    height: 240,
    gridX: -380,
    gridY: 150
  }
];

export const featuredProject = projects[0];
export const otherProjects = projects.slice(1);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.id === slug);
}

export function getProjectNeighbors(slug: string): { prev: Project; next: Project } | null {
  const idx = projects.findIndex((p) => p.id === slug);
  if (idx === -1) return null;
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  return { prev, next };
}
