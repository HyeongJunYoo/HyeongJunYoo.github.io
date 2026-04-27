export type LinkItem = {
  label: string;
  href: string;
  kind?: "email" | "phone" | "external";
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
  role: "Unity Client Developer",
  headline:
    "Unity 기반 PC/VR 메타버스 플랫폼, 실시간 멀티 콘텐츠, SDK/제작 환경, 마커리스 모션 캡처를 개발해 온 클라이언트 개발자입니다.",
  summary:
    "플랫폼 기능을 제품 수준으로 다듬고, 콘텐츠 제작자가 반복 설정 없이 빠르게 개발을 시작할 수 있는 구조를 만드는 데 관심이 많습니다. UI 구조화, XR 입력, 룸/세션 상태 동기화, 아바타 트래킹처럼 사용자 경험과 시스템 안정성이 맞닿는 영역을 주로 다뤄왔습니다.",
  location: "Seoul, Korea",
  updatedAt: "2026.04.25",
  contact: {
    email: "yoojoo97@gmail.com",
    phone: "010-2869-3755"
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
      kind: "external"
    },
    {
      label: "Blog",
      href: "https://yoojoo97.tistory.com/",
      kind: "external"
    },
    {
      label: "Portfolio",
      href: "https://hyeongjunyoo.github.io/#projects",
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
    summary: "Unity 기반 PC/VR 메타버스 플랫폼과 실시간 멀티 콘텐츠 개발",
    details: [
      "PC/VR 메타버스 플랫폼의 UI, Input System, XR 상호작용, 콘텐츠 상태 관리 기능 개발",
      "실시간 멀티 기반 콘텐츠 2종 메인 개발, 2종 서브 개발",
      "메타버스 플랫폼 SDK 개발 및 UPM Git URL 기반 배포 구조 구성",
      "WebView 기반 주요 서비스 화면을 UGUI/MVVM 구조로 전환",
      "XR Interaction Toolkit과 Netcode 기반 교육용 콘텐츠 개발"
    ]
  }
];

export const projects: Project[] = [
  {
    title: "PC/VR 메타버스 플랫폼 고도화",
    period: "2023.09 ~ 2024.06",
    tech: ["Unity", "C#", "UGUI", "OpenXR", "XR Interaction Toolkit", "Addressables"],
    description: [
      "PC/VR 환경에서 공통으로 동작하는 플랫폼 UI, 입력, XR 상호작용, 아바타 관련 기능을 구현했습니다.",
      "VR 포인터, 레이저 UI, 손목 UI, Fader/Lock 등 XR 기본 상호작용과 플랫폼 핵심 UI를 개선했습니다.",
      "PC/VR 모드 전환, 채팅, 이모트, 룸/캐릭터 정보 UI 등 메타버스 플랫폼의 주요 클라이언트 기능을 개발했습니다."
    ],
    results: [
      "PC/VR 환경에서 플랫폼 핵심 기능을 사용할 수 있는 클라이언트 기능 범위 확장",
      "VR UI와 입력 상호작용의 사용성을 개선해 이후 VR 콘텐츠 개발 기반 마련",
      "UI 구조 개선, SDK 개발, 실시간 멀티 콘텐츠 제작으로 이어지는 플랫폼 클라이언트 기반 확보"
    ],
    tags: ["Platform", "PC/VR", "XR"]
  },
  {
    title: "메타버스 플랫폼 입력·사운드·XR 시스템 개선",
    period: "2024.07 ~ 2024.09",
    tech: ["Unity", "C#", "FMOD", "New Input System", "XR Interaction Toolkit", "Addressables"],
    description: [
      "PC/VR/모바일 확장에 대응하기 위해 레거시 입력, 사운드, XR 상호작용 구조를 정리했습니다.",
      "FMOD를 검토 및 적용하고, 효과음·음성·마이크·스피커·볼륨 제어 흐름을 개선했습니다.",
      "New Input System 기반 Action Map과 callback 구조를 적용해 입력 처리 로직을 재구성했습니다.",
      "XR Interaction Toolkit, Addressables, 실시간 상태 처리 관련 안정화 작업에 참여했습니다."
    ],
    results: [
      "입력과 사운드 처리 구조를 플랫폼 확장에 맞게 정리",
      "PC/VR/모바일 대응을 위한 클라이언트 시스템 기반 강화",
      "XR 상호작용과 실시간 상태 처리 안정성을 개선해 이후 콘텐츠 개발의 기술 기반 마련"
    ],
    tags: ["Input", "FMOD", "XR"]
  },
  {
    title: "마커리스 모션 캡처 및 아바타 트래킹 개발",
    period: "2024.10 ~ 2024.12",
    tech: ["Unity", "C#", "MediaPipe", "ARKit", "Avatar Tracking", "Motion Capture"],
    description: [
      "MediaPipe 기반 Face/Pose/Hand Tracking 데이터를 Unity 클라이언트에 통합했습니다.",
      "수집된 트래킹 데이터를 아바타 리깅 구조에 맞게 변환하는 Solver/Setter 로직을 구현했습니다.",
      "PC, iOS, Android에서 들어오는 모션 데이터를 동일한 파이프라인으로 처리하도록 구조화했습니다.",
      "iOS ARKit 및 MediaPipe 기반 입력을 같은 아바타 반영 구조로 연결했습니다."
    ],
    results: [
      "기기별 입력 차이를 흡수할 수 있는 공통 모션 캡처 처리 구조 구축",
      "신규 입력 장비가 추가되어도 기존 아바타 반영 구조에 연결하기 쉬운 기반 마련",
      "마커리스 기반 아바타 트래킹 품질과 확장성 개선"
    ],
    tags: ["Motion Capture", "Avatar", "MediaPipe"]
  },
  {
    title: "메타버스 플랫폼 UI/MVVM 구조 고도화",
    period: "2025.01 ~ 2025.04",
    tech: ["Unity", "C#", "UGUI", "MVVM", "Repository Pattern", "UniTask", "UniRx"],
    description: [
      "WebView 기반 주요 서비스 화면을 Unity UGUI 기반 네이티브 UI로 전환했습니다.",
      "MVVM과 Repository Pattern을 적용해 API 호출, 화면 상태, View 로직의 책임을 분리했습니다.",
      "Home, Room, Chat, Emote, Setting 등 주요 화면과 9-patch, popup, detail page 같은 UI 요소를 구현했습니다.",
      "PC/VR/모바일 해상도와 입력 방식에 대응하는 반응형 UI 구조를 개선했습니다."
    ],
    results: [
      "WebView 기반 화면을 네이티브 UI 구조로 전환해 화면 진입 로딩 시간 개선",
      "내부 비교 기준으로 화면 진입 로딩 시간을 약 50% 단축",
      "UI 구조의 유지보수성과 확장성을 개선하고 모바일 확장 기반 마련"
    ],
    tags: ["UI Architecture", "MVVM", "UGUI"]
  },
  {
    title: "보드게임형 실시간 멀티 콘텐츠 개발",
    period: "2025.05 ~ 2025.06",
    tech: ["Unity", "C#", "UGUI", "Netcode", "Room State Sync"],
    description: [
      "메타버스 플랫폼 위에서 여러 사용자가 동시에 참여하는 보드게임형 콘텐츠를 구현했습니다.",
      "게임 시작, 단계 진행, 종료 흐름, HUD, 상태 UI, NPC 및 컷신 관련 UI/로직을 개발했습니다.",
      "참여자 상태, 선택 결과, 게임 진행 정보를 룸/세션 상태와 연동해 실시간으로 동기화했습니다.",
      "현장 시연과 테스트 피드백을 반영해 진행 버그와 UI 이슈를 안정화했습니다."
    ],
    results: [
      "메타버스 플랫폼에서 동작하는 실시간 멀티 보드게임 콘텐츠 구현",
      "이후 심리상담형, 햅틱 요리형 콘텐츠 개발에 활용할 수 있는 멀티 콘텐츠 구현 경험 축적",
      "진행 단계와 상태 동기화 중심의 멀티 콘텐츠 개발 역량 확보"
    ],
    tags: ["Realtime", "Game Logic", "Sync"]
  },
  {
    title: "심리상담형 메타버스 콘텐츠 개발",
    period: "2025.06 ~ 2025.08",
    tech: ["Unity", "C#", "UGUI", "Host-Client", "Room Property", "WebView API"],
    description: [
      "메타버스 공간에서 상담형 활동과 미니게임형 활동을 진행하는 실시간 멀티 콘텐츠를 구현했습니다.",
      "Session Manager, Content Manager, Authority Manager 기반으로 콘텐츠 진행 관리 구조를 만들었습니다.",
      "관리자/참여자 권한에 따른 시작, 종료, 이동 제한, 진행 제어 로직과 상태 UI를 개발했습니다.",
      "WebView API와 Unity 클라이언트 로직을 연결해 관리자 제어 흐름과 Room Property 상태 동기화를 구성했습니다."
    ],
    results: [
      "관리자와 참여자가 함께 사용하는 상담형 실시간 멀티 콘텐츠 구현",
      "권한 처리, 콘텐츠 진행, 상태 동기화 구조를 설계하고 실제 콘텐츠에 적용",
      "현장 운영과 시연이 가능한 수준으로 콘텐츠 안정화"
    ],
    tags: ["Realtime", "Authority", "Session"]
  },
  {
    title: "햅틱 요리 메타버스 콘텐츠 개발",
    period: "2025.08 ~ 2025.10",
    tech: ["Unity", "C#", "UGUI", "Haptic", "Room State", "Realtime Sync"],
    description: [
      "햅틱 장비와 연동되는 요리형 메타버스 콘텐츠의 주요 클라이언트 로직과 UI를 구현했습니다.",
      "룸 입장/퇴장, 참여자/관전자 상태, 주문 데이터, 재료, 조리 단계 등 콘텐츠 핵심 흐름을 개발했습니다.",
      "룸 상태와 게임 상태에 따른 UI 전환, 진행 제어, 오브젝트 상호작용, 피드백 요소를 구현했습니다.",
      "햅틱 피드백과 상호작용 결과를 콘텐츠 진행 흐름에 연결하고 시연 안정성을 개선했습니다."
    ],
    results: [
      "햅틱 상호작용을 포함한 요리형 실시간 멀티 콘텐츠 구현",
      "참여자/관전자, 룸 상태, 게임 상태를 통합 관리하는 콘텐츠 구조 구축",
      "시연 가능한 수준으로 상호작용 피드백과 성능 안정화"
    ],
    tags: ["Haptic", "Realtime", "Interaction"]
  },
  {
    title: "교육용 VR 침술 콘텐츠 개발",
    period: "2025.11 ~ 2026.02",
    tech: ["Unity", "C#", "OpenXR", "XR Interaction Toolkit", "Netcode", "Haptic Feedback"],
    description: [
      "VR 환경에서 침술 학습, 실습, 평가를 진행하는 교육용 콘텐츠를 구현했습니다.",
      "학습/실습/관찰 모드, 시나리오 진행, 환자 문진, 치료 단계, 결과 UI를 개발했습니다.",
      "침 위치, 자침 각도, 자침 깊이, 추천 각도/깊이 계산 및 시각화 로직을 구현했습니다.",
      "경혈 데이터 네트워크 동기화, 햅틱 피드백, 메뉴/룸 UI, 빌드와 배포 작업에 참여했습니다."
    ],
    results: [
      "VR 기반 침술 학습/실습 콘텐츠를 최종 빌드 및 배포 가능한 형태로 구현",
      "시나리오 기반 교육 흐름과 실습 피드백 구조를 클라이언트에 적용",
      "테스트, 배포, 최종 시연까지 이어지는 콘텐츠 개발 사이클 경험"
    ],
    tags: ["VR Training", "Education", "Haptic"]
  },
  {
    title: "메타버스 플랫폼 SDK 배포 및 제작 환경 고도화",
    period: "2026.03 ~ 현재",
    tech: ["Unity", "Lua", "Unity Package Manager", "Editor Tooling", "Addressables", "Build Profile"],
    description: [
      "신규 콘텐츠 개발자가 SDK를 빠르게 설치하고 개발을 시작할 수 있도록 제작 환경을 개선했습니다.",
      "UPM Git URL 기반 SDK 패키지 배포 구조, SDK 빌드 배포 방식, 버전 관리 흐름을 정리했습니다.",
      "Project Settings, Addressables, Build Profile 등 초기 설정을 Unity Editor Tool로 자동화했습니다.",
      "샘플 Scene, 템플릿 Scene, 콘텐츠 제작 보조용 AI Agent 배포 흐름을 정리했습니다."
    ],
    results: [
      "SDK 설치와 콘텐츠 제작 초기 설정의 반복 작업 감소",
      "신규 콘텐츠 개발 착수 시간을 줄이고 제작 환경의 일관성 개선",
      "내부 비교 기준으로 초기 설정 시간을 약 80% 단축"
    ],
    tags: ["SDK", "Tooling", "Automation"]
  }
];

export const activities = [
  {
    date: "2025.11.12",
    title: "일산 KMF",
    description: "실감미디어 및 메타버스 콘텐츠 시연 참여"
  },
  {
    date: "2025.11.21",
    title: "건대 메타버스 스튜디오 시연 행사",
    description: "메타버스 플랫폼 소개 및 시연 진행"
  },
  {
    date: "2025.11.21",
    title: "일산 AI 페스티벌",
    description: "AI 기반 콘텐츠 시연 참여"
  },
  {
    date: "2025.11.26",
    title: "부산 CO-SHOW",
    description: "실감미디어 전시 부스 운영 및 플랫폼 시연"
  },
  {
    date: "2025.12.22",
    title: "경희대 레벨디자인 워크숍",
    description: "레벨 설계 워크숍 운영 및 프로젝트 피드백 제공"
  },
  {
    date: "2025.12.29",
    title: "실감사업단 집중이수 SHOW-CASE",
    description: "집중이수 과정 결과 공유 및 콘텐츠 시연 참여"
  },
  {
    date: "2026.01.16",
    title: "경희대 레벨디자인 해커톤",
    description: "멘토로 참여하여 레벨 설계 및 프로젝트 피드백 제공"
  },
  {
    date: "2026.02.02",
    title: "경희대 버추얼 프로덕션 콜로키움",
    description: "메타버스 플랫폼을 활용한 실시간 방송 및 행사 운영"
  },
  {
    date: "2026.02.06",
    title: "경희대 버추얼 크리에이터 콜로키움",
    description: "메타버스 플랫폼을 활용한 라이브 콘텐츠 제작 및 진행"
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
    title: "강남대학교 CGVR@KNU 연구팀",
    period: "2022.01 ~ 2023.01",
    meta: "학부연구원 · C++, OpenGL, Fluid Simulation",
    details: [
      "가상현실에서 물감의 물리적 특성을 효율적으로 표현하는 입자 기반 프레임워크 연구 및 개발",
      "2023 한국컴퓨터정보학회 동계학술대회 논문 발표"
    ]
  },
  {
    title: "트웬티온스 / 연구개발팀",
    period: "2023.03 ~ 2023.08",
    meta: "ICT 학점 연계 인턴십 · C#, Unity, Physics Drone Simulation",
    details: [
      "Unity 엔진을 사용하여 PID Controller를 적용한 물리 기반 드론 시뮬레이션 프로젝트 개발"
    ]
  }
];
