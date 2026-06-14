export type LinkItem = {
  label: string;
  href: string;
  displayText: string;
  iconUrl: string;
  kind?: "email" | "external";
};

export type SkillGroup = {
  title: string;
  items: string[];
};

export const profile = {
  name: "유형준",
  initials: "YJ",
  role: "Unity Client Developer",
  headline:
    "Unity 기반 PC/VR 메타버스 플랫폼, 실시간 멀티 콘텐츠, SDK/제작 환경, 마커리스 모션 캡처를 개발해 온 클라이언트 개발자입니다.",
  summary: [
    "Unity 기반 PC/VR 메타버스 플랫폼에서 클라이언트 기능, XR 상호작용, 실시간 멀티 콘텐츠, 제작 환경 자동화까지 이어지는 개발을 경험했습니다. 사용자 입장에서는 자연스럽게 동작하고, 개발자 입장에서는 반복 설정 없이 빠르게 제작을 시작할 수 있는 구조를 만드는 데 관심이 많습니다.",
    "UGUI 기반 네이티브 UI 전환, 룸/세션 상태 동기화, 아바타 트래킹, XR 입력 처리, Unity Editor Tool 개발처럼 사용자 경험과 시스템 안정성이 맞닿는 영역을 주로 다뤄왔습니다."
  ],
  location: "Seoul, Korea",
  updatedAt: "2026.04.25",
  contact: {
    email: "yoojoo97@gmail.com",
    iconUrl: "/icons/email.svg"
  },
  keywords: [
    "Unity",
    "C#",
    "PC/VR",
    "Realtime Multiplayer",
    "SDK Tooling",
    "Avatar Tracking"
  ],
  links: [
    {
      label: "GitHub",
      href: "https://github.com/HyeongJunYoo/",
      displayText: "github.com/HyeongJunYoo",
      iconUrl: "/icons/github.svg",
      kind: "external"
    },
    {
      label: "Blog",
      href: "https://yoojoo97.tistory.com/",
      displayText: "yoojoo97.tistory.com",
      iconUrl: "/icons/blog.svg",
      kind: "external"
    },
    {
      label: "Portfolio",
      href: "/portfolio/",
      displayText: "hyeongjunyoo.github.io/portfolio",
      iconUrl: "/icons/portfolio.svg",
      kind: "external"
    }
  ] satisfies LinkItem[]
};

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    items: ["C#", "Lua"]
  },
  {
    title: "Game Engine",
    items: ["Unity"]
  },
  {
    title: "XR / VR",
    items: ["OpenXR", "XR Interaction Toolkit"]
  }
];

export const career = [
  {
    company: "트웬티온스",
    team: "개발팀",
    role: "클라이언트 개발자",
    period: "2023.09 ~ 현재",
    summary: "",
    details: [
      "Unity 기반 PC/VR 메타버스 플랫폼 클라이언트 개발",
      "개발팀 리더로 일정 관리, 작업 분배, 기술 방향성 조율, 운영 배포 관리와 개발 이슈 대응 수행",
      "메타버스 플랫폼 콘텐츠 3종과 VR 교육용 멀티 실습 콘텐츠 1종의 진행 로직 및 상태 동기화 구현",
      "UGUI 기반 네이티브 UI 전환, SDK 배포 구조, Unity Editor 제작 환경 개선"
    ]
  }
];

export const activities = [
  {
    date: "2026.02.06",
    title: "경희대 버추얼 크리에이터 콜로키움",
    description: "메타버스 플랫폼을 활용한 라이브 콘텐츠 제작 및 진행"
  },
  {
    date: "2026.02.02",
    title: "경희대 버추얼 프로덕션 콜로키움",
    description: "메타버스 플랫폼을 활용한 실시간 방송 및 행사 운영"
  },
  {
    date: "2026.01.16",
    title: "경희대 레벨디자인 해커톤",
    description: "멘토로 참여하여 레벨 설계 및 프로젝트 피드백 제공"
  },
  {
    date: "2025.12.29",
    title: "실감사업단 집중이수 SHOW-CASE",
    description: "집중이수 과정 결과 공유 및 콘텐츠 시연 참여"
  },
  {
    date: "2025.12.22",
    title: "경희대 레벨디자인 워크숍",
    description: "레벨 설계 워크숍 운영 및 프로젝트 피드백 제공"
  },
  {
    date: "2025.11.26",
    title: "부산 CO-SHOW",
    description: "실감미디어 전시 부스 운영 및 플랫폼 시연"
  },
  {
    date: "2025.11.21",
    title: "일산 AI 페스티벌",
    description: "AI 기반 콘텐츠 시연 참여"
  },
  {
    date: "2025.11.12",
    title: "일산 KMF",
    description: "실감미디어 및 메타버스 콘텐츠 시연 참여"
  },
  {
    date: "2025.10.21",
    title: "건대 메타버스 스튜디오 시연 행사",
    description: "메타버스 플랫폼 소개 및 시연 진행"
  }
];

export const education = [
  {
    title: "강남대학교 / 소프트웨어응용학부 학사",
    period: "2020.03 ~ 2024.02",
    meta: "가상현실전공 / 소프트웨어전공",
    details: ["학점 4.2 / 4.5 · 차석 졸업"]
  },
  {
    title: "트웬티온스 / ICT 학점 연계 인턴십",
    period: "2023.03 ~ 2023.08",
    meta: "연구개발팀 · C#, Unity, Physics Drone Simulation",
    details: [
      "Unity 엔진을 사용하여 PID Controller를 적용한 물리 기반 드론 시뮬레이션 프로젝트 개발"
    ]
  },
  {
    title: "강남대학교 CGVR@KNU 연구팀",
    period: "2022.01 ~ 2023.01",
    meta: "학부연구원 · C++, OpenGL, Fluid Simulation",
    details: [
      "가상현실에서 물감의 물리적 특성을 효율적으로 표현하는 입자 기반 프레임워크 연구 및 개발",
      "2023 한국컴퓨터정보학회 동계학술대회 논문 발표"
    ]
  }
];
