import { readdirSync } from "node:fs";

// Format priority — user-uploaded modern formats win, .jpg (default placeholder) last.
// Case-insensitive: .PNG, .JPG also matched. Returns default .jpg path if no file exists
// so missing slots still render (broken icon) instead of throwing.
const IMAGE_PRIORITY = ["webp", "png", "jpeg", "jpg"] as const;

function resolveImage(slug: string, slot: string): string {
  try {
    const files = readdirSync(`public/projects/${slug}`);
    for (const ext of IMAGE_PRIORITY) {
      const match = files.find((f) => f.toLowerCase() === `${slot}.${ext}`);
      if (match) return `/projects/${slug}/${match}`;
    }
  } catch {
    // Directory missing — fall through to default
  }
  return `/projects/${slug}/${slot}.jpg`;
}

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

export type ProjectChallenge = {
  title: string;
  problem: string;
  solution: string;
  outcome?: string;
  /**
   * Optional 16:9 inline image rendered inside the challenge card
   * between the title and the first label. Each challenge defaults to
   * `/projects/<slug>/challenge-NN.jpg` (overwrite that file to swap).
   * Remove this field to suppress the inline image entirely — the
   * detail template handles missing values cleanly.
   */
  image?: string;
};

export type Project = {
  id: string;
  title: string;
  /** 홈 카드용 한글 제목 (포트폴리오 hero/archive/상세는 영문 title 사용). */
  cardTitle: string;
  level: "featured" | "core" | "support";
  eyebrow: string;
  period: string;
  role: string;
  engine: string;
  platform: string;
  genre: string;
  team: string;
  status: string;
  /** 홈 카드 "업무 정의" (1문장). */
  definition: string;
  /** 홈 카드 "주요 업무 내용" 불릿. */
  description: string[];
  summary: string;
  goal: string;
  /**
   * Optional 1-sentence intro shown above the Challenges & Solutions
   * card list. Frames "what kind of problems" without repeating the
   * Project goal text. Leave undefined to render just the heading.
   */
  challengeIntro?: string;
  challenges: ProjectChallenge[];
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
    id: "metaverse-ui",
    title: "METAVERSE UI",
    cardTitle: "메타버스 플랫폼 UI 네이티브 전환",
    level: "featured",
    eyebrow: "Featured 01",
    period: "2025.01 ~ 2025.04",
    role: "Client Developer / Team Lead",
    engine: "Unity 2022 LTS",
    platform: "PC / VR / Mobile",
    genre: "UI Architecture",
    team: "개발팀",
    status: "Live",
    definition: "WebView 기반 UI의 로딩 지연과 높은 메모리 사용 문제를 개선하기 위해 주요 화면을 Unity 네이티브 UI로 전환",
    description: [
      "API 호출, 화면 상태, View 로직을 분리해 UI 코드 구조를 유지보수하기 쉽게 개선",
      "Home, Room, Chat, Emote, Setting 등 주요 서비스 화면 10개 이상 구현",
      "PC/VR/모바일 해상도와 입력 방식에 대응하는 UI 구조 개선"
    ],
    summary: "메타버스 플랫폼 주요 화면을 WebView에서 Unity 네이티브 UGUI로 전환해 진입 지연과 메모리 사용을 개선한 작업입니다.",
    goal: "WebView 기반 주요 화면의 1~2초 로딩 지연과 높은 메모리 점유를 해결하기 위해 Home·Room·Chat·Emote·Setting 등 10개+ 화면을 Unity 네이티브 UGUI로 재구현했습니다. MVVM 패턴으로 View / ViewModel / Repository 계층을 분리하고, Canvas Scaler·Auto Layout·EventTrigger 추상화로 PC/VR/모바일 해상도·입력을 단일 codebase로 대응했습니다.",
    challengeIntro: "WebView 기반 화면을 Unity 네이티브로 전환하며 부딪힌 케이스.",
    challenges: [
      {
        title: "UI 고도화 · WebView → 네이티브 (10+ 화면, 4개월)",
        problem: "메타버스 플랫폼 주요 화면이 WebView 기반이라 매 진입마다 [[1-2초]] 로딩 지연이 발생했고, WebView 인스턴스가 [[수십~수백 MB]] 메모리를 점유했습니다. Home·Room 같은 자주 진입하는 화면의 누적 지연이 체감 속도를 크게 떨어뜨리고, 모바일 확장 시 메모리 한계가 가장 큰 병목이었습니다.",
        solution: "Unity 네이티브 UGUI로 Home·Room·Chat·Emote·Setting 등 [[10개+ 화면]]을 재구현했습니다. MVVM 패턴으로 View / ViewModel / Repository 계층을 분리하고, Repository에서 UniTask 비동기 처리, ViewModel이 View에 바인딩하는 흐름. 화면 객체는 초기 1회 생성 후 활성/비활성 토글로 재사용. Canvas Scaler·Auto Layout·EventTrigger 추상화로 PC/VR/모바일 해상도와 입력 방식까지 단일 codebase로 대응.",
        outcome: "화면 진입 대기 [[1-2초 → 약 0.1초]], 클라이언트 메모리 [[약 -50%]] 절감, 모바일 확장 가능 베이스 확보"
      }
    ],
    image: resolveImage("metaverse-ui", "hero"),
    tone: "hot",
    stack: ["Unity 2022", "C#", "MVVM", "Repository Pattern", "UniTask", "UGUI"],
    stats: [
      { value: "0.1s", label: "Entry latency" },
      { value: "-50%", label: "Memory" },
      { value: "10+", label: "Native screens" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=900&q=80"
    ],
    links: { source: "#", devlog: "#" },
    theta: 0, phi: -8, width: 240, height: 300, gridX: -410, gridY: -150
  },
  {
    id: "metaverse-platform",
    title: "METAVERSE PLATFORM",
    cardTitle: "메타버스 플랫폼 시스템 고도화",
    level: "core",
    eyebrow: "Core 02",
    period: "2023.09 ~ 2024.09",
    role: "Client Developer / Team Lead",
    engine: "Unity 2022 LTS",
    platform: "PC / VR / Mobile",
    genre: "Platform Architecture",
    team: "개발팀",
    status: "Live",
    definition: "PC/VR/모바일 환경 확장을 위해 입력, 사운드, 리소스 로드 구조를 공통화하고 개선",
    description: [
      "PC, 모바일, XR 환경의 입력을 New Input System 기반 공통 구조로 재구성",
      "효과음, 음성 입출력, 볼륨 제어 흐름을 FMOD 기반으로 개선",
      "직접 참조되던 리소스를 Addressables 기반 로드 방식으로 전환"
    ],
    summary: "PC/VR/모바일 환경 확장을 위해 입력·사운드·리소스 로드 구조를 공통화하고 메모리를 절감한 플랫폼 고도화 작업입니다.",
    goal: "환경별로 분리되어 있던 입력 처리, 재실행을 강제하던 음성 기기 전환, 직접 참조로 메모리를 16GB 이상 점유하던 리소스 로드를 차례로 통합했습니다. New Input System 공통 action map, FMOD audio bus + OS device 감시, Addressables 기반 dependency 자동 추적·unload로 환경 무관 구조를 만들었습니다.",
    challengeIntro: "입력·사운드·리소스 로드를 환경 무관하게 공통화한 케이스.",
    challenges: [
      {
        title: "플랫폼 고도화 · 입력·사운드·리소스 구조 공통화 (1년)",
        problem: "기존 입력 처리는 PC·모바일·XR 환경별로 분리되어 신규 입력 기기 추가 시 [[3개 환경]] 코드를 모두 수정해야 했습니다. PC/VR 음성 기기 전환은 [[프로그램 재실행]]이 강제됐고, 리소스는 prefab/scene이 직접 참조되어 클라이언트 메모리 사용량이 [[16GB 이상]]까지 상승, 모바일 한계로 즉시 충돌하는 수준이었습니다.",
        solution: "세 영역을 차례로 통합했습니다. New Input System 기반 공통 action map으로 PC/모바일/XR 입력을 일원화하고 device 변경 시 UI prompt도 자동 전환. FMOD 기반 audio bus 계층 + OS device enumeration 감시로 음성 기기 런타임 전환. 직접 참조를 AssetReference로 교체하고 Addressables group으로 dependency 자동 추적·unload.",
        outcome: "신규 입력 기기 확장 시 수정 범위 [[3곳 → 1곳]], 음성 기기 [[재실행 없이]] 런타임 전환, 메모리 [[16GB+ → 4GB 이하]]"
      }
    ],
    image: resolveImage("metaverse-platform", "hero"),
    tone: "orange",
    stack: ["Unity 2022", "C#", "New Input System", "FMOD", "Addressables", "OpenXR"],
    stats: [
      { value: "16GB→4GB", label: "Memory" },
      { value: "3→1", label: "Input scope" },
      { value: "Runtime", label: "Audio switch" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556438064-2d7646166914?auto=format&fit=crop&w=900&q=80"
    ],
    links: { source: "#", devlog: "#" },
    theta: 51, phi: 8, width: 230, height: 286, gridX: -100, gridY: 160
  },
  {
    id: "markerless-mocap",
    title: "MARKERLESS MOCAP",
    cardTitle: "마커리스 모션 캡처 아바타 트래킹",
    level: "core",
    eyebrow: "Core 03",
    period: "2024.10 ~ 2024.12",
    role: "Client Developer",
    engine: "Unity 2022 LTS",
    platform: "PC / iOS / Android",
    genre: "Avatar Tracking",
    team: "개발팀",
    status: "Live",
    definition: "카메라 기반 모션 데이터를 Unity 아바타에 반영해 별도 마커 없이 움직임을 표현하는 기능 개발",
    description: [
      "MediaPipe 기반 Face/Pose/Hand Tracking 데이터 처리 및 아바타 리깅 연동",
      "기기별로 다른 모션 데이터를 아바타 리깅 구조에 맞게 변환하는 공통 처리 흐름 구성",
      "표정·손·상하체 움직임을 아바타에 적용하고 iOS ARKit 입력도 동일 구조에 연결"
    ],
    summary: "별도 마커 없이 카메라 입력만으로 아바타가 사용자 움직임을 따라가는 마커리스 모션 캡처를 PC/iOS/Android 단일 흐름으로 통합했습니다.",
    goal: "MediaPipe(정규화 keypoint)와 ARKit(blend shape)의 좌표계·단위·축이 모두 달라 source별 리깅 로직이 중복되던 구조를, 중간 추상 계층 'AvatarMotionFrame'으로 통합했습니다. source별 adapter가 표준 좌표계로 변환하고, 본 회전 constraint·IK 후처리·1-Euro filter로 손목·손가락 꼬임과 jitter를 보정했습니다.",
    challengeIntro: "이종 모션 데이터를 단일 처리 흐름으로 통합한 케이스.",
    challenges: [
      {
        title: "마커리스 모션 캡처 · PC/iOS/Android 통합 (3개월)",
        problem: "MediaPipe는 정규화 keypoint coordinate를, ARKit은 ARFaceAnchor blend shape weight를 반환합니다. 두 데이터는 좌표계·단위·축 정의가 모두 달라 source별로 별도 아바타 리깅 로직을 만들면 [[3개 환경]]에 코드 중복이 빠르게 늘어나는 구조였습니다. 또 손목·손가락은 평면 좌표 + depth 추정 기반이라 3D rotation 변환 시 [[비현실적 꼬임]](impossible joint angle)이 자주 발생했습니다.",
        solution: "중간 추상 계층 'AvatarMotionFrame'을 정의해 모든 source가 일단 이 구조로 변환되고, 아바타 리깅은 이 구조만 소비하도록 분리. AvatarMotionFrame은 표준 좌표계(Unity 좌표 + meter 단위)와 표준 본 매핑을 가지고, source별 adapter(MediaPipeAdapter / ARKitAdapter)가 conversion을 책임집니다. 본 단위 회전 constraint를 human anatomy 기준으로 clamp, 손가락은 인접 본 회전 의존성을 IK 후처리로 보정, frame jitter는 1-Euro filter로 부드럽게 처리.",
        outcome: "PC·iOS·Android 모션 데이터를 [[단일 처리 흐름]]으로 통합, 손목·손가락 회전 자연스러움 시각적으로 개선"
      }
    ],
    image: resolveImage("markerless-mocap", "hero"),
    tone: "acid",
    stack: ["Unity 2022", "C#", "MediaPipe", "ARKit", "IK", "1-Euro Filter"],
    stats: [
      { value: "3", label: "Platforms" },
      { value: "1", label: "처리 흐름" },
      { value: "Markerless", label: "Capture" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
    ],
    links: { source: "#", devlog: "#" },
    theta: 103, phi: -4, width: 220, height: 274, gridX: 180, gridY: 150
  },
  {
    id: "vr-acupuncture-lab",
    title: "VR ACUPUNCTURE LAB",
    cardTitle: "교육용 VR 침술 실습 콘텐츠",
    level: "core",
    eyebrow: "Core 04",
    period: "2025.11 ~ 2026.02",
    role: "Client Developer",
    engine: "Unity 2022 LTS",
    platform: "VR (Meta Horizon)",
    genre: "Educational VR",
    team: "개발팀",
    status: "Shipped",
    definition: "VR 환경에서 침술 학습, 실습, 평가를 진행할 수 있는 교육용 콘텐츠 클라이언트 개발",
    description: [
      "학습/실습/관찰 모드 흐름과 환자 문진·치료 단계·결과 UI를 하나의 실습 시나리오로 연결",
      "침 위치·각도·깊이 데이터를 기준으로 실습 결과를 평가하는 시각화 로직 구현",
      "경혈 데이터 동기화, 햅틱 피드백, 메뉴/룸 UI, Meta Horizon 빌드·배포 수행"
    ],
    summary: "VR 환경에서 침술 학습·실습·평가를 진행하는 교육용 콘텐츠. 한의대 수업에 실제 적용해 만족도 4.20/5.0을 기록했습니다.",
    goal: "VR 헤드셋에서 침술 학습→실습→평가까지 하나의 시나리오로 연결되는 교육용 콘텐츠를 클라이언트 측에서 책임진 4개월 프로젝트입니다. 학습/실습/관찰 3가지 모드를 환자 문진·치료 단계·결과 UI 흐름으로 연결하고, 침의 위치·각도·깊이 데이터를 기준으로 실습 결과를 평가하는 시각화 로직을 직접 구현했습니다. 경혈 데이터 동기화, 햅틱 피드백, 메뉴/룸 UI, Meta Horizon 비공개 앱 빌드와 배포까지 콘텐츠 완성에 필요한 클라이언트 작업을 수행했고, 완성된 빌드를 실제 한의대 수업에 적용해 교육 현장 활용 가능성을 검증했습니다.",
    challengeIntro: "VR 침술 실습 평가 시스템과 멀티 참여자 동기화에서 부딪힌 두 가지 케이스.",
    challenges: [
      {
        title: "침 위치·각도·깊이 평가 시각화",
        problem: "침술 실습 평가는 침이 경혈에 정확히 들어갔는지를 위치·각도·깊이 [[세 축]]에서 판정해야 했습니다. 초기 구현은 단순히 [[hit/miss]]만 boolean으로 표시했는데, 강사진 피드백에서 '왜 틀렸는지' 학생이 이해할 단서가 부족하다는 의견이 반복됐습니다. 학습 콘텐츠 본래 목적과 어긋나는 상황.",
        solution: "침 데이터를 위치(경혈 중심점과의 거리), 각도(권장 각도와의 편차), 깊이(권장 깊이와의 편차) 세 축으로 분해해 평가하고, 각 축마다 시각화 피드백을 다르게 줬습니다. 위치는 평면 marker, 각도는 3D arrow, 깊이는 단면도 indicator로 표시하고 권장 범위 안에 들어오면 점진적으로 색이 바뀌도록 구현했습니다.",
        outcome: "한의대 수업 적용 결과 만족도 [[4.20 / 5.0]], 강사진 피드백에서 '학습 단서가 풍부하다' 평가 확보",
        image: resolveImage("vr-acupuncture-lab", "challenge-01")
      },
      {
        title: "멀티 실습 룸 동기화 + Meta Horizon 배포",
        problem: "여러 학생이 동일한 환자 데이터를 보며 침술 실습을 진행할 때, 룸 상태(현재 시나리오 단계, 환자 상태, 선택된 경혈)가 클라이언트 간에 즉시 동기화되어야 했습니다. 초기 구현은 매 단계 변경마다 [[전체 상태]]를 브로드캐스트해 네트워크 대역폭과 latency 둘 다 부담이 컸습니다. 또 Meta Horizon 비공개 앱 빌드/배포는 팀 내 첫 경험으로 procedure도 함께 정리 필요.",
        solution: "Netcode 기반 변경분(delta) 동기화로 전환했습니다. 시나리오 단계·환자 상태·선택 경혈을 각각 NetworkVariable로 분리해 변경된 항목만 send. Meta Horizon 배포는 Quest 전용 IL2CPP build profile 분리, 앱 서명, 비공개 채널 업로드 과정을 internal wiki에 정리해 이후 팀이 동일 프로세스를 재사용할 수 있게 했습니다.",
        outcome: "룸 상태 동기화 패킷량 감소, Meta Horizon 비공개 채널 [[첫 배포 성공]]",
        image: resolveImage("vr-acupuncture-lab", "challenge-02")
      }
    ],
    image: resolveImage("vr-acupuncture-lab", "hero"),
    tone: "aqua",
    stack: ["Unity 2022", "C#", "OpenXR", "XR Interaction Toolkit", "Netcode", "Meta Horizon"],
    stats: [
      { value: "4.20", label: "Satisfaction / 5.0" },
      { value: "3", label: "Practice modes" },
      { value: "4mo", label: "Dev period" }
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
    id: "haptic-cooking",
    title: "HAPTIC COOKING",
    cardTitle: "햅틱 요리형 실시간 멀티 콘텐츠",
    level: "core",
    eyebrow: "Core 05",
    period: "2025.08 ~ 2025.10",
    role: "Client Developer (Lead)",
    engine: "Unity 2022 LTS",
    platform: "VR",
    genre: "Realtime Multiplayer",
    team: "개발팀",
    status: "Shipped",
    definition: "플랫폼 SDK 기반으로 여러 참여자가 함께 요리 미션을 수행하는 실시간 멀티 콘텐츠 개발 주도",
    description: [
      "룸 상태와 주문→조리→서빙 진행 흐름을 클라이언트 간 동기화",
      "재료 점유를 atomic lock으로 처리해 동시 동작 시 재료 충돌 제거",
      "동작별 햅틱 프로필을 정의하고 시각 피드백과 동기화해 VR 컨트롤러 햅틱 연동"
    ],
    summary: "주문·조리 흐름과 햅틱 피드백을 동기화하는 실시간 멀티 요리형 콘텐츠. 행사·시연에 활용.",
    goal: "플랫폼 SDK 기반으로 여러 참여자가 함께 요리 미션을 수행하는 실시간 멀티 콘텐츠를 개발 주도한 작업입니다. 룸 상태(현재 주문, 조리 단계, 완료 여부), 주문→조리→서빙으로 이어지는 진행 흐름, 그리고 햅틱 피드백을 함께 동기화하는 클라이언트 로직을 책임졌습니다. 결과적으로 행사 및 시연에 활용해 실시간 협력형 콘텐츠의 사용 경험을 검증했고, 동시에 플랫폼 SDK의 개선 필요 기능을 정리할 수 있었습니다.",
    challengeIntro: "주문·조리 흐름과 햅틱 피드백을 멀티 환경에서 동기화한 두 가지 케이스.",
    challenges: [
      {
        title: "멀티 주문·조리 흐름 동기화",
        problem: "여러 참여자가 동시에 다른 요리를 진행하고 같은 재료를 공유하는 환경에서, 주문→조리→서빙 단계가 클라이언트 간에 즉시 동기화되어야 했습니다. 초기 구현은 매 단계마다 전체 룸 상태를 브로드캐스트해 네트워크 부담이 컸고, 동시 동작 시 [[race condition]]으로 같은 재료를 두 사람이 동시에 집어드는 충돌이 발생했습니다.",
        solution: "주문·재료·요리 상태를 도메인별로 분리해 변경된 항목만 전송하도록 SDK 동기화 API를 정리했습니다. 재료 점유는 atomic 단위로 처리 — 한 클라이언트가 집어드는 순간 lock을 걸고 권한 검증을 거쳐야 다른 클라이언트가 동일 재료를 집을 수 없게 했습니다. 조리 단계 전환은 host-authoritative 검증으로 일관성 보장.",
        outcome: "동시 동작 시 [[재료 충돌]] 제거, 룸 상태 동기화 패킷량 감소",
        image: resolveImage("haptic-cooking", "challenge-01")
      },
      {
        title: "VR 컨트롤러 햅틱 피드백 연동",
        problem: "요리 콘텐츠의 핵심은 '손에 닿는 감각'이라 단순 buzz 진동이 아니라 동작별로 다른 햅틱 패턴이 필요했습니다. 칼질·끓이기·붓기 같은 동작이 모두 동일한 진동으로 들리면 몰입이 깨지는 문제. 또 햅틱 트리거 타이밍이 시각 피드백과 [[수십 ms]] 어긋나도 사용자가 즉시 인지하는 민감도.",
        solution: "동작 카테고리별 햅틱 프로필(amplitude curve + frequency + duration)을 ScriptableObject로 정리. 시각 피드백 trigger와 햅틱 trigger를 같은 frame에 묶어 timing drift 최소화. VR 컨트롤러 양손에 독립 채널로 보내, 양손 동작(예: 도마+칼)이 자연스럽게 분리되도록 했습니다.",
        outcome: "동작별 햅틱 차별화로 몰입감 향상, 행사 시연에서 사용자 반응 [[즉각적 피드백]] 확보",
        image: resolveImage("haptic-cooking", "challenge-02")
      }
    ],
    image: resolveImage("haptic-cooking", "hero"),
    tone: "violet",
    stack: ["Unity 2022", "Lua", "Metaverse SDK", "OpenXR", "Haptic", "Room State Sync"],
    stats: [
      { value: "VR", label: "Platform" },
      { value: "Realtime", label: "Sync mode" },
      { value: "3mo", label: "Dev period" }
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
    id: "therapy-minis",
    title: "THERAPY MINIS",
    cardTitle: "심리상담형 실시간 멀티 콘텐츠",
    level: "core",
    eyebrow: "Core 06",
    period: "2025.06 ~ 2025.08",
    role: "Client Developer (Lead)",
    engine: "Unity 2022 LTS",
    platform: "PC / VR",
    genre: "Realtime Multiplayer",
    team: "개발팀",
    status: "Shipped",
    definition: "심리상담사가 내담자와 함께 진행하는 미니게임 4종과 관리자 제어·참여자 상태 동기화를 책임진 실시간 멀티 콘텐츠",
    description: [
      "MiniGameBase 추상 클래스로 미니게임 4종의 공통 인터페이스를 정의하고 게임별 로직만 구현",
      "관리자/참여자 권한을 Authority 단위로 분리하고 host 검증으로 보안 허점 제거",
      "권한 모델에 따라 UI 자동 분기 — 관리자는 제어판, 참여자는 게임 화면"
    ],
    summary: "심리상담 세션을 위한 미니게임 4종 + 관리자 제어 + 참여자 상태 동기화 실시간 콘텐츠.",
    goal: "심리상담사가 내담자와 함께 진행할 수 있는 미니게임 4종과 관리자 제어, 참여자 상태 동기화를 책임진 실시간 멀티 콘텐츠입니다. 상담사 측에서는 관리자 모드로 게임 진행을 통제하고 참여자 상태를 모니터링하며, 참여자는 상담 세션 중 미니게임을 수행하는 비대칭 구조. 4종의 미니게임은 각자 다른 규칙과 입력 방식을 가지지만, 동일한 상태 동기화·관리자 제어 인터페이스를 따르는 공통 레이어 위에 올렸습니다.",
    challengeIntro: "비대칭 관리자/참여자 구조와 미니게임 4종 공통 레이어를 다듬은 두 가지 케이스.",
    challenges: [
      {
        title: "미니게임 4종 공통 레이어",
        problem: "미니게임 [[4종]]은 각자 다른 규칙·입력·진행 방식을 가졌지만, 모두 동일한 관리자 제어와 참여자 상태 동기화를 필요로 했습니다. 게임마다 별도 구현하면 동일 로직이 [[4번]] 중복되고, 룰만 다른데 동기화 코드가 분기점이 되면 유지보수 비용이 빠르게 늘어나는 구조였습니다.",
        solution: "MiniGameBase 추상 클래스에 공통 인터페이스(StartGame / PauseGame / SubmitInput / GetState)를 정의하고, 4종 미니게임이 각자 상속해 게임별 로직만 구현했습니다. 관리자 제어와 상태 동기화는 base class 레벨에서 처리되어, 신규 미니게임 추가 시에도 동일하게 동작합니다.",
        outcome: "미니게임 [[4종]]을 공통 인터페이스 위에 구현, 신규 미니게임 추가 시 동기화 코드 재구현 불필요",
        image: resolveImage("therapy-minis", "challenge-01")
      },
      {
        title: "관리자/참여자 비대칭 동기화",
        problem: "상담사(관리자)와 내담자(참여자)는 같은 세션을 보지만 권한과 화면 구성이 완전히 다릅니다. 관리자는 미니게임 시작·정지·난이도 조정·결과 확인 권한, 참여자는 게임 입력 권한만. 동기화 시 권한 검증을 빼먹으면 참여자가 임의로 게임을 정지하거나 결과를 조작할 수 있는 [[보안 허점]].",
        solution: "권한 모델을 Authority 단위로 분리했습니다. 관리자 권한 변수는 host(상담사) 전용 write, 참여자 입력 변수는 client write 후 host validate. UI도 권한 모델에 따라 자동 분기 — 관리자 클라이언트는 control panel, 참여자 클라이언트는 게임 화면만 보이도록 했습니다.",
        outcome: "관리자/참여자 권한 분리로 [[보안 허점]] 제거, 동일 codebase로 비대칭 UI 자동 분기",
        image: resolveImage("therapy-minis", "challenge-02")
      }
    ],
    image: resolveImage("therapy-minis", "hero"),
    tone: "lime",
    stack: ["Unity 2022", "Lua", "Metaverse SDK", "UGUI", "Authority Model"],
    stats: [
      { value: "4", label: "Mini-games" },
      { value: "Realtime", label: "Sync mode" },
      { value: "3mo", label: "Dev period" }
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
    id: "sdk-tooling",
    title: "SDK TOOLING",
    cardTitle: "SDK 배포·제작 환경 자동화",
    level: "core",
    eyebrow: "Core 07",
    period: "2026.03 ~ 현재",
    role: "Client Developer / Tools",
    engine: "Unity 2022 LTS",
    platform: "Internal Tooling",
    genre: "Dev Pipeline",
    team: "개발팀",
    status: "Ongoing",
    definition: "신규 콘텐츠 개발자가 SDK 설치와 초기 설정을 반복해야 하는 문제를 줄이고 제작 환경을 표준화하는 작업",
    description: [
      "Git URL 기반 SDK 설치와 버전 관리 흐름을 정리해 콘텐츠 개발 시작 절차 단순화",
      "프로젝트 설정과 빌드 관련 초기 작업을 Editor Tool에서 처리하도록 구성",
      "샘플 Scene과 템플릿 Scene을 정리해 신규 콘텐츠 제작 시작점 표준화"
    ],
    summary: "Unity Package Manager + Editor Tool 3개 버튼으로 SDK 초기 설정 6~8단계를 자동화한 사내 도구.",
    goal: "신규 콘텐츠 개발자가 SDK 설치와 초기 프로젝트 설정에 매번 6~8단계를 반복해야 하는 문제를 줄이고, 제작 환경을 표준화하기 위해 진행 중인 사내 도구 작업입니다. Git URL 기반 SDK 설치와 버전 관리 흐름을 정리하고, 콘텐츠 제작에 필요한 프로젝트 설정과 빌드 관련 초기 작업을 Editor Tool로 옮겼습니다. 샘플 Scene과 템플릿 Scene을 정리해 신규 콘텐츠 제작의 시작점을 표준화했고, 결과적으로 환경 차이로 인한 초기 셋업 버그를 줄이는 게 목표입니다.",
    challengeIntro: "SDK 설치 마찰과 환경 차이로 인한 셋업 버그를 줄이기 위한 두 가지 케이스.",
    challenges: [
      {
        title: "SDK 초기 설정 6~8단계 → Editor Tool 3개 버튼",
        problem: "신규 콘텐츠 개발자가 SDK를 처음 적용할 때 [[6-8단계]]의 수동 설정(패키지 설치, 프로젝트 설정 조정, Addressables 그룹 생성, build profile 추가, 샘플 scene 복사 등)이 필요했습니다. 한 단계라도 놓치면 빌드 실패나 런타임 에러가 발생해, 신규 개발자가 환경 셋업에만 [[하루 이상]] 쓰는 일이 반복됐습니다.",
        solution: "Editor Tool로 'Install SDK', 'Configure Project', 'Create Template'의 3개 버튼을 만들었습니다. Install SDK 버튼은 Unity Package Manager로 Git URL을 통해 패키지를 추가하고 의존 패키지까지 자동 설치. Configure Project 버튼은 PlayerSettings·GraphicsSettings·Addressables 기본 group을 한 번에 적용. Create Template 버튼은 표준 sample scene과 빈 콘텐츠 scene을 생성합니다.",
        outcome: "SDK 초기 설정 [[6-8단계 → 3버튼]], 설정 누락으로 인한 환경 오류 대폭 감소",
        image: resolveImage("sdk-tooling", "challenge-01")
      },
      {
        title: "SDK 버전 관리 + 패키지 갱신",
        problem: "기존 워크플로우에서 SDK 업데이트는 폴더 단위 [[수동 재설치]]였습니다. 신규 SDK 버전이 나올 때마다 모든 콘텐츠 개발자가 SDK 폴더를 삭제 후 재배치하는 절차를 거쳐야 했고, 그 과정에서 로컬 수정사항이 덮어쓰이거나 의존 패키지 버전 mismatch가 발생했습니다.",
        solution: "Unity Package Manager의 Git URL 의존 기능을 활용해 SDK 자체를 패키지로 패키징했습니다. manifest.json에 SDK Git URL과 commit hash가 기록되고, Update 버튼은 manifest 항목의 hash를 최신 release tag로 변경 + Package Manager에 reload 요청. 의존 패키지는 SDK 패키지의 package.json dependencies에서 자동 해석.",
        outcome: "SDK 갱신이 수동 재설치 → [[Update 버튼 1회 클릭]]으로 단축, 버전 mismatch 가능성 감소",
        image: resolveImage("sdk-tooling", "challenge-02")
      }
    ],
    image: resolveImage("sdk-tooling", "hero"),
    tone: "orange",
    stack: ["Unity 2022", "C#", "Lua", "Unity Package Manager", "Addressables", "Editor Tooling"],
    stats: [
      { value: "3", label: "Tool buttons" },
      { value: "6~8", label: "Steps automated" },
      { value: "Ongoing", label: "Status" }
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

// Featured hero 캐러셀에 띄울 프로젝트와 순서. 숫자는 위 projects[] 배열의 1-based 위치:
//   1=metaverse-ui 2=metaverse-platform 3=markerless-mocap 4=vr-acupuncture-lab
//   5=haptic-cooking 6=therapy-minis 7=sdk-tooling
export const heroOrder = [1, 4, 5];
export const heroProjects = heroOrder
  .map((n) => projects[n - 1])
  .filter((p): p is Project => Boolean(p));

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
