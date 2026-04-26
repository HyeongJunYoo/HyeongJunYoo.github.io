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
  role: string[];
  purpose: string[];
  details: string[];
  outcome: string[];
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
      label: "Email",
      href: "mailto:yoojoo97@gmail.com",
      kind: "email"
    },
    {
      label: "Phone",
      href: "tel:010-2869-3755",
      kind: "phone"
    },
    {
      label: "GitHub",
      href: "https://github.com/HyeongJunYoo/",
      kind: "external"
    },
    {
      label: "Blog",
      href: "https://yoojoo97.tistory.com/",
      kind: "external"
    }
  ] satisfies LinkItem[]
};

export const highlights = [
  {
    value: "9",
    label: "Key Projects"
  },
  {
    value: "4",
    label: "Realtime Contents"
  },
  {
    value: "PC/VR",
    label: "Client Platform"
  },
  {
    value: "SDK",
    label: "Creator Tooling"
  }
];

export const skills: SkillGroup[] = [
  {
    title: "Client",
    items: ["Unity Engine", "C#", "Lua", "UGUI", "Addressables", "UniTask", "UniRx"]
  },
  {
    title: "Networking / Multiplayer",
    items: [
      "Netcode for GameObjects",
      "Host-Client Architecture",
      "Room/Session State Synchronization"
    ]
  },
  {
    title: "XR / VR",
    items: ["OpenXR", "XR Interaction Toolkit", "VR Interaction", "Avatar Tracking"]
  },
  {
    title: "Tooling / Workflow",
    items: [
      "Unity Package Manager",
      "Editor Tooling",
      "Build Profile",
      "Repository Pattern",
      "MVVM"
    ]
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
      "PC/VR 메타버스 플랫폼의 UI, 입력, XR 상호작용, 콘텐츠 상태 관리 기능 개발",
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
    role: [
      "Unity 클라이언트 개발자로 PC/VR 메타버스 플랫폼의 UI, 입력, XR 상호작용, 아바타 관련 기능 구현 담당",
      "PC와 VR 환경에서 공통으로 동작해야 하는 화면, 포인터, 인터랙션, 상태 처리 기능 개발"
    ],
    purpose: [
      "PC/VR 메타버스 플랫폼의 사용성과 안정성 개선",
      "VR 환경에서도 플랫폼 핵심 기능을 자연스럽게 사용할 수 있도록 XR 입력과 UI 상호작용 개선",
      "콘텐츠 제작, 플랫폼 확장, SDK 개발로 이어질 수 있는 클라이언트 기반 정리"
    ],
    details: [
      "VR 포인터, 레이저 UI, 손목 UI, Fader/Lock 등 XR 환경의 기본 상호작용 기능 구현 및 개선",
      "PC/VR 모드 전환, 앉기 기능, 드론 모드, 채팅, 이모트, 룸/캐릭터 정보 UI 등 플랫폼 핵심 기능 개발",
      "아바타 및 VMotion 관련 설정 UI, 캐릭터 프리뷰, 오프셋 조정 기능 구현",
      "WebView 기반 UI가 VR 환경에서 자연스럽게 동작하도록 hover, click, drag, wheel 등 상호작용 처리 개선",
      "XR Interaction Toolkit 전환과 플랫폼 코드 안정화 작업 참여"
    ],
    outcome: [
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
    role: [
      "Unity 클라이언트 시스템 개선 담당",
      "입력 처리, 사운드 시스템, XR 인터랙션, Addressables 기반 리소스 구조 개선 작업 참여"
    ],
    purpose: [
      "레거시 입력 및 사운드 처리 구조를 개선해 PC/VR/모바일 확장에 대응",
      "플랫폼 기능 증가로 복잡해진 클라이언트 시스템을 유지보수하기 쉬운 구조로 정리",
      "XR 상호작용과 네트워크 상태 처리 안정성 개선"
    ],
    details: [
      "FMOD 기술 검토 및 플랫폼 사운드 시스템 적용",
      "효과음, 음성, 마이크/스피커, 볼륨 처리 등 사운드 관련 제어 흐름 개선",
      "Unity New Input System 기반 Action Map, callback, 입력 상태 처리 구조 설계 및 적용",
      "PC/VR 입력, UI 선택/스크롤, 이동/회전, 손 애니메이션 등 입력 처리 로직 개선",
      "XR Interaction Toolkit 기반 상호작용 구조 정리 및 관련 버그 수정",
      "Addressables 기반 맵/리소스 관리 구조 개선 참여",
      "Network Tick, 상태 패킷, 예외 처리 등 실시간 상태 처리 안정화 작업 참여"
    ],
    outcome: [
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
    role: [
      "마커리스 모션 캡처 데이터를 Unity 아바타에 반영하는 핵심 로직 개발 담당",
      "PC, iOS, Android 등 다양한 입력 환경의 트래킹 데이터를 공통 처리하는 구조 설계 및 구현"
    ],
    purpose: [
      "별도 마커 장비 없이 Face, Pose, Hand 데이터를 수집해 아바타 움직임으로 표현",
      "입력 장비나 플랫폼이 달라져도 동일한 아바타 반영 구조를 사용할 수 있는 트래킹 파이프라인 구축",
      "아바타 표정, 손, 상체/하체 움직임의 표현 품질 개선"
    ],
    details: [
      "MediaPipe 기반 Face/Pose/Hand Tracking 데이터를 Unity 클라이언트에 통합",
      "수집된 트래킹 데이터를 아바타 리깅 구조에 맞게 변환하는 Solver/Setter 로직 구현",
      "표정, 손, 손가락, 손목, 상체, 하체 회전값을 아바타에 반영하는 로직 개발",
      "iOS ARKit 및 MediaPipe 기반 입력 데이터를 공통 처리 구조로 연결",
      "PC와 모바일에서 들어오는 모션 데이터를 동일한 파이프라인으로 처리하도록 구조화",
      "축 보정, 손목/손가락/상하체 Rotation 보정으로 트래킹 품질 개선"
    ],
    outcome: [
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
    role: [
      "WebView 기반 주요 서비스 화면을 Unity UGUI 기반 네이티브 UI로 전환하는 클라이언트 구현 담당",
      "MVVM 구조와 Repository Pattern을 적용해 화면 상태, API 호출, View 로직 분리"
    ],
    purpose: [
      "WebView 의존도가 높던 서비스 화면을 Unity 네이티브 UI로 전환해 로딩 속도와 유지보수성 개선",
      "PC/VR/모바일 해상도와 입력 방식에 대응 가능한 반응형 UI 구조 마련",
      "API 연동, 화면 상태 관리, View 갱신 흐름을 분리해 UI 확장성 확보"
    ],
    details: [
      "Home, Room, Object, Chat, Emote, Setting, Friend 등 주요 서비스 화면을 UGUI 기반으로 구현",
      "MVVM 패턴을 적용해 Model, ViewModel, View의 책임 분리",
      "Repository Pattern을 적용해 API 호출과 UI 상태 갱신 로직 분리",
      "9-patch, dynamic UI, blur, dock, popup, detail page 등 주요 UI 요소 구현",
      "PC/VR/모바일 대응을 위한 반응형 UI, safe area, 입력 방식별 UI 처리 개선",
      "설정 화면의 DataModel/ViewModel/View 구조 설계 및 기존 설정 기능 마이그레이션"
    ],
    outcome: [
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
    role: [
      "실시간 멀티 기반 보드게임형 콘텐츠의 클라이언트 로직과 UI 구현 담당",
      "게임 진행, 상태 UI, 상호작용 로직, 네트워크 상태 동기화 기능 개발"
    ],
    purpose: [
      "메타버스 플랫폼 위에서 여러 사용자가 동시에 참여하는 보드게임형 콘텐츠 구현",
      "진행 단계, 참여자 상태, 게임 결과가 실시간으로 동기화되는 멀티 콘텐츠 제작"
    ],
    details: [
      "게임 시작, 진행 단계, 종료 흐름 등 전체 콘텐츠 진행 로직 구현",
      "마나, 인벤토리, 카드 드로우, 캐릭터/오브젝트 상호작용 등 보드게임 핵심 기능 개발",
      "HUD, 가이드 UI, 상태 UI, NPC 및 컷신 관련 UI/로직 구현",
      "참여자 상태, 선택 결과, 게임 진행 정보를 룸/세션 상태와 연동",
      "현장 시연 및 테스트 피드백을 반영해 진행 버그와 UI 이슈 수정"
    ],
    outcome: [
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
    role: [
      "심리상담형 메타버스 콘텐츠의 주요 클라이언트 로직과 UI 구현 담당",
      "관리자/참여자 흐름, 콘텐츠 진행, 권한 처리, 상태 동기화 구조 개발"
    ],
    purpose: [
      "메타버스 공간에서 상담형 활동과 미니게임형 활동을 진행할 수 있는 실시간 멀티 콘텐츠 구현",
      "관리자와 참여자의 역할을 구분하고, 세션 단위로 콘텐츠 진행 상태를 안정적으로 관리"
    ],
    details: [
      "Session Manager, Content Manager, Authority Manager 등 콘텐츠 진행 관리 구조 구현",
      "관리자/참여자 권한에 따른 콘텐츠 시작, 종료, 이동 제한, 진행 제어 로직 개발",
      "선택형, 탐색형, 문답형 미니게임의 진행 UI와 상태 처리 구현",
      "WebView API와 Unity 클라이언트 로직을 연결해 관리자 제어 흐름 구성",
      "Room Property 기반 상태 동기화, HUD, 반응형 UI, 진행 상태 UI 구현",
      "테스트 및 피드백을 반영해 진행 버그, 반응형 UI, 관리자 제어 이슈 안정화"
    ],
    outcome: [
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
    role: [
      "햅틱 요리 콘텐츠의 주요 클라이언트 로직, UI, 상호작용 처리 담당",
      "룸 상태, 참여자 상태, 주문/조리 흐름, 햅틱 피드백 연동 기능 개발"
    ],
    purpose: [
      "햅틱 장비와 연동되는 요리형 메타버스 콘텐츠 구현",
      "참여자와 관전자 흐름을 구분하고, 요리 진행 상태와 상호작용 결과를 실시간으로 관리"
    ],
    details: [
      "룸 입장/퇴장, 최초 입장자 처리, 참여자/관전자 추가 및 삭제 로직 구현",
      "주문 데이터, 상점/트레이, 재료, 조리 단계 등 콘텐츠 핵심 로직 개발",
      "룸 상태와 게임 상태에 따른 UI 전환 및 진행 제어 로직 구현",
      "오브젝트 상호작용, Try Grab, 조명, 시계 애니메이션, 재료 풀, 효과음 등 피드백 요소 구현",
      "햅틱 피드백 및 상호작용 결과를 콘텐츠 진행 흐름과 연결",
      "테스트 및 프레임 최적화를 통해 시연 안정성 개선"
    ],
    outcome: [
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
    role: [
      "교육용 VR 침술 콘텐츠의 Unity 클라이언트 구현 담당",
      "침술 상호작용, 시나리오 진행, 네트워크 동기화, UI 및 빌드/배포 작업 참여"
    ],
    purpose: [
      "VR 환경에서 침술 학습, 실습, 평가를 진행할 수 있는 교육용 콘텐츠 구현",
      "침 위치, 각도, 깊이 등 실습 데이터를 기반으로 사용자 행동을 판정하고 피드백 제공"
    ],
    details: [
      "학습 모드, 실습 모드, 관찰 모드 등 콘텐츠 진행 모드 구현",
      "침 위치, 자침 각도, 자침 깊이, 추천 각도/깊이 계산 및 시각화 로직 개발",
      "시나리오 기반 진행, 환자 문진, 치료 단계, 중간 평가, 결과 UI 구현",
      "침과 경혈 데이터의 네트워크 동기화 및 상태 처리 구현",
      "햅틱 피드백, 애니메이션, 가이드 UI, 메뉴/룸 UI 구현",
      "앱 빌드, 배포, 통합 테스트, 운영 가이드 문서 작성 참여"
    ],
    outcome: [
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
    role: [
      "메타버스 플랫폼 SDK 배포 구조와 콘텐츠 제작 환경 개선 담당",
      "Unity Package Manager, Editor Tool, Build Profile, 버전 관리 관련 자동화 작업 진행"
    ],
    purpose: [
      "신규 콘텐츠 개발자가 메타버스 플랫폼 SDK를 빠르게 설치하고 개발을 시작할 수 있는 환경 제공",
      "반복적인 프로젝트 초기 설정과 빌드 설정 과정을 자동화",
      "SDK 배포, 버전 관리, 콘텐츠 제작 흐름을 안정화"
    ],
    details: [
      "UPM Git URL 기반 SDK 패키지 배포 구조 개선",
      "SDK 빌드 배포 방식 및 버전 관리 흐름 개선",
      "Project Settings, Addressables, Build Profile 등 콘텐츠 개발 초기 설정 자동화",
      "Unity Editor Tool 기반 설정 적용 UI 및 실행 로직 개선",
      "샘플 Scene과 템플릿 Scene 기반의 콘텐츠 제작 시작점 정리",
      "콘텐츠 제작 보조용 AI Agent 배포 흐름 정리"
    ],
    outcome: [
      "SDK 설치와 콘텐츠 제작 초기 설정의 반복 작업 감소",
      "신규 콘텐츠 개발 착수 시간을 줄이고 제작 환경의 일관성 개선",
      "내부 비교 기준으로 초기 설정 시간을 약 80% 단축"
    ],
    tags: ["SDK", "Tooling", "Automation"]
  }
];

export const activities = [
  {
    title: "행사",
    items: [
      "일산 AI 페스티벌: AI 기반 콘텐츠 시연 참여",
      "부산 CO-SHOW: 실감미디어 전시 부스 운영 및 플랫폼 시연",
      "건대 메타버스 스튜디오 시연 행사: 메타버스 플랫폼 소개 및 시연 진행"
    ]
  },
  {
    title: "교육 / 멘토링",
    items: [
      "경희대 레벨디자인 해커톤: 멘토로 참여하여 레벨 설계 및 프로젝트 피드백 제공",
      "경희대 버추얼 프로덕션 콜로키움: 메타버스 플랫폼을 활용한 실시간 방송 및 행사 운영",
      "경희대 버추얼 크리에이터 콜로키움: 메타버스 플랫폼을 활용한 라이브 콘텐츠 제작 및 진행"
    ]
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
