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
      href: "https://hyeongjunyoo.github.io/#projects",
      displayText: "hyeongjunyoo.github.io",
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
      "개발팀 리더로 프로젝트 일정 관리, 작업 분배, 기술 방향성 조율 및 개발 이슈 대응",
      "실시간 멀티 콘텐츠 4종 개발 참여, 2종은 주 담당으로 진행 로직과 상태 동기화 구현",
      "UGUI 기반 네이티브 UI 전환, SDK 배포 구조, Unity Editor 제작 환경 개선"
    ]
  }
];

export const projects: Project[] = [
  {
    title: "메타버스 플랫폼 SDK 배포 및 제작 환경 자동화",
    period: "2026.03 ~ 현재",
    tech: ["Unity", "Lua", "Unity Package Manager", "Editor Tooling", "Addressables", "Build Profile"],
    description: [
      "신규 콘텐츠 개발자가 SDK를 빠르게 설치하고 개발을 시작할 수 있도록 제작 환경 개선",
      "UPM Git URL 기반 SDK 패키징 및 배포 구조, 버전 관리 흐름 정리",
      "Project Settings, Addressables, Build Profile 등 초기 설정을 Unity Editor Tool로 자동화",
      "샘플 Scene, 템플릿 Scene, 콘텐츠 제작 보조 도구 배포 흐름 구성"
    ],
    results: [
      "반복적인 Unity 프로젝트 초기 설정 작업을 Editor Tool 실행 방식으로 전환",
      "신규 콘텐츠 개발 착수 시간을 줄이고 제작 환경 편차 감소",
      "SDK 초기 설정 6~8단계를 Editor Tool 3개 버튼으로 자동화"
    ],
    tags: ["SDK", "Tooling", "Automation"]
  },
  {
    title: "교육용 VR 침술 실습 콘텐츠 개발",
    period: "2025.11 ~ 2026.02",
    tech: ["Unity", "C#", "OpenXR", "XR Interaction Toolkit", "Netcode", "Haptic Feedback"],
    description: [
      "VR 환경에서 침술 학습, 실습, 평가를 진행하는 교육용 콘텐츠 구현",
      "학습/실습/관찰 모드, 시나리오 진행, 환자 문진, 치료 단계, 결과 UI 개발",
      "침 위치, 자침 각도, 자침 깊이, 추천 각도/깊이 계산과 시각화 로직 구현",
      "경혈 데이터 동기화, 햅틱 피드백, 메뉴/룸 UI, 빌드 및 배포 작업 참여"
    ],
    results: [
      "VR 기반 침술 학습/실습 콘텐츠를 최종 빌드 및 시연 가능한 형태로 구현",
      "자침 위치, 각도, 깊이에 따른 실습 피드백 구조를 클라이언트에 적용",
      "테스트, 배포, 최종 시연까지 이어지는 VR 교육 콘텐츠 개발 사이클 수행"
    ],
    tags: ["VR Training", "Education", "Haptic"]
  },
  {
    title: "햅틱 요리형 실시간 멀티 게임 콘텐츠 개발",
    period: "2025.08 ~ 2025.10",
    tech: ["Unity", "Lua", "UGUI", "Metaverse SDK", "Haptic", "Room State Sync"],
    description: [
      "플랫폼 SDK 환경에서 동작하는 Lua 기반 햅틱 요리형 실시간 멀티 게임 콘텐츠 구현",
      "룸 입장/퇴장, 참여자/관전자 상태, 주문 데이터, 재료, 조리 단계 등 게임 진행 흐름 개발",
      "룸 상태와 게임 상태에 따른 UI 전환, 진행 제어, 오브젝트 상호작용, 피드백 요소 구현",
      "햅틱 피드백과 사용자 상호작용 결과를 게임 진행 흐름에 연결"
    ],
    results: [
      "햅틱 장비 연동을 포함한 요리형 실시간 멀티 게임 플레이 흐름 구현",
      "참여자/관전자, 룸 상태, 게임 상태를 통합 관리해 멀티 플레이 흐름 안정화",
      "현장 시연 단계에서 햅틱 피드백, UI 전환, 진행 오류 안정화"
    ],
    tags: ["Haptic", "Realtime", "Interaction"]
  },
  {
    title: "심리상담형 실시간 멀티 콘텐츠 개발",
    period: "2025.06 ~ 2025.08",
    tech: ["Unity", "Lua", "UGUI", "Metaverse SDK", "Room Property", "Admin Control API"],
    description: [
      "Lua 기반 SDK 콘텐츠로 상담 세션과 미니게임 활동이 연결되는 실시간 멀티 콘텐츠 구현",
      "세션, 콘텐츠 진행, 권한 관리를 담당하는 매니저 구조 설계",
      "상담 흐름과 미니게임 활동을 연결하고 관리자/참여자 권한별 진행 제어 로직 개발",
      "관리자 제어 API와 Unity 클라이언트 로직을 연결해 참여자 상태와 진행 정보를 동기화"
    ],
    results: [
      "상담 흐름과 미니게임 활동을 하나의 세션 안에서 운영할 수 있도록 진행 제어 로직 적용",
      "관리자 제어 API와 Room Property 기반 상태 동기화로 참여자별 진행 상태 불일치 방지",
      "해당 콘텐츠 기반 연구가 국제학술대회 우수 연구자 장려상 수상"
    ],
    tags: ["Realtime", "Authority", "Session"]
  },
  {
    title: "보드게임형 실시간 멀티 콘텐츠 UI 및 일부 로직 개발",
    period: "2025.05 ~ 2025.06",
    tech: ["Unity", "Lua", "UGUI", "Metaverse SDK", "Room State Sync"],
    description: [
      "Lua 기반 SDK 보드게임 콘텐츠 개발에 서브 개발자로 참여",
      "상점 시스템, HUD, 상태 UI 등 콘텐츠 진행에 필요한 클라이언트 UI 로직 개발",
      "NPC, 컷신, 일부 진행 이벤트를 콘텐츠 흐름에 맞게 연동",
      "SDK 룸/세션 상태를 활용해 UI 표시 상태와 일부 진행 정보를 동기화"
    ],
    results: [
      "보드게임형 콘텐츠의 상점, HUD, 상태 UI가 실시간 진행 흐름에 맞게 동작하도록 구현",
      "서브 개발 범위에서 UI와 일부 콘텐츠 로직 안정화에 기여"
    ],
    tags: ["Realtime", "Game Logic", "Sync"]
  },
  {
    title: "메타버스 플랫폼 네이티브 UI 전환 및 로딩 성능 개선",
    period: "2025.01 ~ 2025.04",
    tech: ["Unity", "C#", "UGUI", "MVVM", "Repository Pattern", "UniTask"],
    description: [
      "WebView 기반 주요 서비스 화면을 Unity UGUI 기반 네이티브 UI로 전환",
      "MVVM과 Repository Pattern을 적용한 API 호출, 화면 상태, View 로직 책임 분리",
      "Home, Room, Chat, Emote, Setting 등 주요 서비스 화면 10개 이상 구현",
      "PC/VR/모바일 해상도와 입력 방식에 대응하는 반응형 UI 구조 개선"
    ],
    results: [
      "WebView 화면 진입 대기 시간을 1~2초에서 약 0.2초 수준으로 단축",
      "주요 서비스 화면의 WebView 의존도를 제거하고 Unity 네이티브 UI로 전환",
      "PC/VR 중심 화면 구조를 모바일 환경까지 확장할 수 있도록 네이티브 UI 대응 범위 확대"
    ],
    tags: ["UI Architecture", "MVVM", "UGUI"]
  },
  {
    title: "마커리스 모션 캡처 기반 아바타 트래킹 개발",
    period: "2024.10 ~ 2024.12",
    tech: ["Unity", "C#", "MediaPipe", "ARKit", "Avatar Tracking", "Motion Capture"],
    description: [
      "MediaPipe 기반 Face/Pose/Hand Tracking 데이터를 Unity 클라이언트에 통합",
      "수집된 모션 데이터를 아바타 리깅 구조에 맞게 변환하고 표정, 손, 상하체 움직임에 반영하는 로직 구현",
      "PC, iOS, Android에서 수집된 모션 데이터를 공통 파이프라인으로 처리하도록 구조화",
      "iOS ARKit 및 MediaPipe 기반 입력을 동일한 아바타 트래킹 구조에 연결"
    ],
    results: [
      "PC, iOS, Android 입력 차이를 공통 파이프라인에서 처리할 수 있도록 모션 데이터 변환 흐름 정리",
      "신규 입력 장비가 추가되어도 동일한 변환/반영 단계로 연결할 수 있도록 처리 경로 단순화",
      "축 보정, 손목/손가락/상하체 Rotation 보정으로 마커리스 아바타 트래킹 품질 개선"
    ],
    tags: ["Motion Capture", "Avatar", "MediaPipe"]
  },
  {
    title: "메타버스 플랫폼 입력·사운드·리소스 구조 개선",
    period: "2024.07 ~ 2024.09",
    tech: ["Unity", "C#", "FMOD", "New Input System", "XR Interaction Toolkit", "Addressables"],
    description: [
      "PC/VR/모바일 확장 대응을 위한 입력, 사운드, 리소스 로드 구조 정리",
      "New Input System 기반 Action Map과 callback 구조를 적용한 입력 처리 로직 재구성",
      "FMOD 기반 효과음, 음성, 마이크, 스피커, 볼륨 제어 흐름 개선",
      "ScriptableObject 기반 리소스 직접 참조 구조를 Addressables 기반 로드 구조로 전환"
    ],
    results: [
      "PC, Mobile, XR 환경을 공통 대응할 수 있는 입력 처리 구조로 기기별 입력 대응 범위 확대",
      "PC/VR 사운드 입출력 기기 전환 기능 구현으로 플랫폼 사운드 제어 범위 확장",
      "Addressables 기반 리소스 로드 방식으로 전환해 클라이언트 메모리 사용량과 빌드 용량 개선"
    ],
    tags: ["Input", "FMOD", "Addressables"]
  },
  {
    title: "PC/VR 메타버스 플랫폼 고도화",
    period: "2023.09 ~ 2024.06",
    tech: ["Unity", "C#", "UGUI", "OpenXR", "XR Interaction Toolkit", "Addressables"],
    description: [
      "PC/VR 환경에서 공통으로 사용하는 플랫폼 UI, XR 상호작용, 아바타 관련 클라이언트 기능 고도화",
      "VR 포인터, Ray 기반 UI, 손목 UI, Fader 등 XR 기본 상호작용과 플랫폼 핵심 UI 개선",
      "PC/VR 모드 전환, 채팅, 이모트, 룸/캐릭터 정보 UI 등 메타버스 플랫폼 주요 클라이언트 기능 개발"
    ],
    results: [
      "PC/VR 환경에서 플랫폼 핵심 기능을 사용할 수 있는 클라이언트 기능 범위 확장",
      "VR UI와 XR 상호작용 사용성을 개선해 이후 VR 콘텐츠 개발 기반 마련",
      "운영에 지장을 줄 수 있는 주요 기능 버그를 수정해 플랫폼 안정성 확보",
      "이후 UI 구조 전환, SDK 개발, 실시간 멀티 콘텐츠 제작에 재사용되는 플랫폼 클라이언트 기능 정리"
    ],
    tags: ["Platform", "PC/VR", "XR"]
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
    meta: "가상현실전공 / 소프트웨어전공 · 학점 4.2 / 4.5 · 차석 졸업",
    details: []
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
