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

export type Project = {
  title: string;
  period: string;
  tech: string[];
  definition: string;
  description: string[];
  results: string[];
  tags: string[];
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

export const projects: Project[] = [
  {
    title: "SDK 배포 및 제작 환경 자동화",
    period: "2026.03 ~ 현재",
    tech: ["Unity", "Lua", "Unity Package Manager", "Editor Tooling", "Addressables", "Build Profile"],
    definition: "신규 콘텐츠 개발자가 SDK 설치와 초기 설정을 반복해야 하는 문제를 줄이고 제작 환경을 표준화하는 작업",
    description: [
      "Git URL 기반 SDK 설치와 버전 관리 흐름을 정리해 콘텐츠 개발 시작 절차 단순화",
      "콘텐츠 제작에 필요한 프로젝트 설정과 빌드 관련 초기 작업을 Editor Tool에서 처리하도록 구성",
      "샘플 Scene과 템플릿 Scene을 정리해 신규 콘텐츠 제작 시작점 표준화"
    ],
    results: [
      "SDK 초기 설정 6~8단계를 Editor Tool 3개 버튼으로 자동화해 설정 누락으로 인한 개발 환경 오류를 대폭 감소",
      "필수 패키지와 의존성을 자동 설치하도록 구성해 개발자별 환경 차이로 인한 버그 발생 가능성 감소",
      "SDK 버전 관리 체계를 마련해 수동 재설치 없이 Update 버튼으로 패키지 버전 갱신 가능"
    ],
    tags: ["SDK", "Tooling", "Automation"]
  },
  {
    title: "교육용 VR 침술 실습 콘텐츠 개발",
    period: "2025.11 ~ 2026.02",
    tech: ["Unity", "C#", "OpenXR", "XR Interaction Toolkit", "Netcode", "Haptic Feedback"],
    definition: "VR 환경에서 침술 학습, 실습, 평가를 진행할 수 있는 교육용 콘텐츠 클라이언트 개발",
    description: [
      "학습, 실습, 관찰 모드별 진행 흐름과 환자 문진, 치료 단계, 결과 UI를 하나의 실습 시나리오로 연결",
      "침 위치, 각도, 깊이 데이터를 기준으로 실습 결과를 평가하고 사용자에게 피드백하는 시각화 로직 구현",
      "경혈 데이터 동기화, 햅틱 피드백, 메뉴/룸 UI, 빌드 및 배포까지 콘텐츠 완성에 필요한 클라이언트 작업 수행"
    ],
    results: [
      "완성된 VR 침술 실습 콘텐츠를 실제 한의대 수업에 적용해 교육 현장에서의 활용 가능성 확인",
      "교육 참여자 만족도 평가에서 4.20 / 5.0점을 기록해 학습 콘텐츠로서의 사용성 확인",
      "Meta Horizon 비공개 앱 빌드와 배포까지 수행해 VR 교육 콘텐츠의 배포 과정 경험"
    ],
    tags: ["VR Training", "Education", "Haptic"]
  },
  {
    title: "실시간 멀티 콘텐츠 개발",
    period: "2025.05 ~ 2025.10",
    tech: ["Unity", "Lua", "UGUI", "Metaverse SDK", "Room State Sync", "Haptic"],
    definition: "플랫폼 SDK 기반으로 여러 참여자의 상태와 진행 흐름을 동기화하는 실시간 멀티 콘텐츠 개발",
    description: [
      "햅틱 요리형 콘텐츠의 룸 상태, 주문·조리 흐름, 햅틱 피드백 연동 개발 주도",
      "심리상담형 콘텐츠의 미니게임 4종 로직, 관리자 제어, 참여자 상태 동기화 개발 주도",
      "보드게임형 콘텐츠에서는 서브 개발로 상점, HUD, 상태 UI 및 일부 진행 로직 구현"
    ],
    results: [
      "실시간 멀티 콘텐츠 3종 개발 과정에서 플랫폼 SDK의 개선 필요 기능과 반복 구현 요소를 정리",
      "완성된 콘텐츠를 행사 및 시연에 활용해 요리, 심리상담, 보드게임 등 다양한 실시간 상호작용 경험 제공",
      "참여자 상태, 화면 진행, 룸 흐름을 공통 관점으로 정리해 이후 콘텐츠 개발에 활용 가능한 구현 경험 확보"
    ],
    tags: ["Realtime", "Game Logic", "Sync"]
  },
  {
    title: "메타버스 플랫폼 UI 고도화",
    period: "2025.01 ~ 2025.04",
    tech: ["Unity", "C#", "UGUI", "MVVM", "Repository Pattern", "UniTask"],
    definition: "WebView 기반 UI의 로딩 지연과 높은 메모리 사용 문제를 개선하기 위해 주요 화면을 Unity 네이티브 UI로 전환",
    description: [
      "API 호출, 화면 상태, View 로직을 분리해 UI 코드 구조를 유지보수하기 쉽게 개선",
      "Home, Room, Chat, Emote, Setting 등 주요 서비스 화면 10개 이상 구현",
      "PC/VR/모바일 해상도와 입력 방식에 대응하는 UI 구조 개선"
    ],
    results: [
      "WebView 기반 화면의 진입 대기 시간을 1~2초에서 약 0.1초 수준으로 단축",
      "주요 서비스 화면을 Unity 네이티브 UI로 전환해 WebView 의존도를 제거하고 메모리 사용량 약 50% 절감",
      "PC/VR 중심으로 구성된 화면 구조를 모바일 환경까지 확장할 수 있도록 네이티브 UI 대응 범위 확대"
    ],
    tags: ["UI Architecture", "MVVM", "UGUI"]
  },
  {
    title: "마커리스 모션 캡처 기반 아바타 트래킹 개발",
    period: "2024.10 ~ 2024.12",
    tech: ["Unity", "C#", "MediaPipe", "ARKit", "Avatar Tracking", "Motion Capture"],
    definition: "카메라 기반 모션 데이터를 Unity 아바타에 반영해 별도 마커 없이 움직임을 표현하는 기능 개발",
    description: [
      "MediaPipe 기반 Face/Pose/Hand Tracking 데이터 처리 및 아바타 리깅 연동 구조 구현",
      "기기별로 다른 모션 데이터를 아바타 리깅 구조에 맞게 변환하는 공통 처리 흐름 구성",
      "표정, 손, 상하체 움직임을 아바타에 적용하고 iOS ARKit 입력도 동일한 구조에 연결"
    ],
    results: [
      "PC, iOS, Android에서 들어오는 서로 다른 모션 데이터를 하나의 처리 흐름으로 통합",
      "웹캠 연결만으로 아바타 트래킹을 사용할 수 있도록 개선해 별도 모션 캡처 프로그램 실행 절차 제거",
      "축, 손목, 손가락, 상하체 회전값을 보정해 마커리스 아바타 트래킹 품질 개선"
    ],
    tags: ["Motion Capture", "Avatar", "MediaPipe"]
  },
  {
    title: "메타버스 플랫폼 고도화",
    period: "2023.09 ~ 2024.09",
    tech: ["Unity", "C#", "OpenXR", "XR Interaction Toolkit", "New Input System", "FMOD", "Addressables"],
    definition: "PC/VR/모바일 환경 확장을 위해 입력, 사운드, 리소스 로드 구조를 공통화하고 개선",
    description: [
      "PC, 모바일, XR 환경에서 입력 방식을 공통으로 처리할 수 있도록 New Input System 기반 입력 구조 재구성",
      "효과음, 음성 입출력, 스피커, 볼륨 제어 흐름을 FMOD 기반으로 개선",
      "직접 참조되던 리소스를 Addressables 기반 로드 방식으로 전환"
    ],
    results: [
      "공통 입력 처리 구조를 마련해 모바일, 컨트롤러 등 신규 입력 기기 확장 시 수정 범위 감소",
      "PC/VR 음성 입출력 기기 전환을 런타임 중 처리하도록 개선해 프로그램 재실행 없이 사운드 설정 변경 가능",
      "Addressables 기반 리소스 로드 방식으로 전환해 클라이언트 메모리 사용량을 16GB 이상에서 4GB 이하로 감소"
    ],
    tags: ["Platform", "PC/VR", "Architecture"]
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
    title: "트웬티온스 / 연구개발팀",
    period: "2023.03 ~ 2023.08",
    meta: "ICT 학점 연계 인턴십 · C#, Unity, Physics Drone Simulation",
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
