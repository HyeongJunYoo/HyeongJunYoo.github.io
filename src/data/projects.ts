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
  goal: string;
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
    summary: "PvPvE 멀티플레이어 액션. 30 tickrate에서 64명 동시접속까지 검증한 동기화 레이어를 직접 책임졌습니다.",
    goal: "스팀 출시를 목표로 한 시즌 기반 PvPvE 멀티플레이어 액션. 매치당 64명 동시접속과 30 tickrate에서의 정확한 hit detection을 핵심 가치로 잡고, 5인 팀 환경에서 9개월 안에 alpha → shipped까지 빌드를 다듬은 프로젝트입니다. 본인은 lead programmer로 멀티플레이어 동기화 전반(Replication, lag compensation, matchmaking, state persistence)과 클라이언트 ↔ 데디케이티드 서버 architecture 설계를 책임졌고, EOS(Epic Online Services)와 자체 게임 백엔드를 함께 운용하는 구조를 마무리했습니다. 콘솔 출시 검토를 위해 cross-platform input 호환성도 초기부터 고려했고, 베타 테스트 기간 동안 동시접속 1만 명 부하 테스트까지 통과시켰습니다.",
    challenges: [
      {
        title: "30 tickrate hit detection 1프레임 흔들림",
        problem: "초기 빌드는 모든 hit 판정을 server-authoritative로 처리했습니다. 30 tickrate 환경에서 latency가 80ms를 넘으면 클라이언트가 보는 적의 위치와 서버가 검증하는 위치 사이에 1-2 프레임 어긋남이 발생해, '분명히 맞췄는데 데미지 안 들어감' 신고가 베타 첫 주에 130건 이상 들어왔습니다. Discord 커뮤니티 분위기가 빠르게 부정적으로 흘러 즉시 대응이 필요한 상황이었습니다.",
        solution: "Valve의 lag compensation 패턴을 참고해 client-side prediction + server-side rewind 시스템을 구축했습니다. 각 클라이언트는 자기 입력을 즉시 시뮬레이션하면서 서버에 input을 보내고, 서버는 해당 input을 받은 시점에 그 클라이언트의 RTT만큼 과거로 모든 적의 위치를 되돌려 hit detection을 수행합니다. Rewind window는 최대 200ms로 캡, 그 이상의 비정상 latency는 클라이언트 부정으로 간주해 무효화합니다. 클라이언트 측에선 prediction이 서버 결과와 다르면 부드럽게 보정(reconciliation) 처리합니다.",
        outcome: "perceived hit latency 60-80ms → 8-12ms, 'hit not registered' 신고 130건/주 → 4건/주"
      },
      {
        title: "64명 매치 인벤토리 동기화 패킷 폭증",
        problem: "초기 디자인은 모든 클라이언트가 모든 플레이어의 inventory 변경을 broadcast로 받는 구조였습니다. 64명 매치에서 한 번에 다수가 인벤토리를 열거나 줍기/버리기 액션을 하면 서버 → 클라이언트 업로드가 초당 10MB를 초과해, 중하위 ISP 사용자가 패킷 드롭과 함께 게임에서 튕기는 현상이 발생했습니다. 빌드 안정성 지표(Steam crash report)에서 'connection lost'가 매치당 3-4건으로 급증했습니다.",
        solution: "두 가지 최적화를 결합했습니다. 첫째, delta replication — inventory 전체 상태가 아니라 변경분만 보내고 sequence number 기반 reliable delivery 채널을 만들었습니다. 둘째, AOI(Area of Interest) 필터링 — 본인 시야 안의 플레이어 inventory만 풀 동기화하고, 시야 밖은 metadata(존재 여부, 클래스만)만 동기화합니다. AOI 갱신 주기는 클라이언트 카메라 frustum 기준 200ms마다 재계산했습니다.",
        outcome: "평균 업로드 트래픽 10.4MB/s → 1.6MB/s (-85%), connection lost 3-4건/매치 → 0.2건/매치"
      },
      {
        title: "Cross-platform input prompt 추상화",
        problem: "PC 키보드/마우스, Steam Controller, Xbox/PS 컨트롤러까지 지원하면서, 입력 방식이 바뀌면 UI prompt(키 표시)가 즉시 바뀌어야 했습니다. UE5 기본 EnhancedInput 시스템은 device 변경 감지와 prompt 자동 전환을 지원하지 않아, in-game UI에서 'E to interact'와 'X to interact' 같은 표기가 컨트롤러 연결 후에도 키보드 표기로 남는 버그가 있었습니다.",
        solution: "InputDeviceObserver subsystem을 만들어 마지막 input event의 device source를 추적하고, UI widget이 binding한 PromptToken에 글로벌 broadcast하는 구조로 만들었습니다. UI 측은 PromptToken을 키 텍스트가 아닌 추상 액션 이름('Interact')으로 받고, observer가 device 변경을 알리면 token 매핑 테이블에서 현재 device 기준 표기를 자동 교체합니다. 추가로 Steam Input API를 통해 사용자가 컨트롤러 prompt 스타일(Xbox/PS/Switch)을 강제 지정할 수 있도록 지원했습니다.",
        outcome: "QA 발견 prompt 관련 버그 27건 → 0건, controller hot-swap 1프레임 안에 반영"
      }
    ],
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
    summary: "BPM 기반 입력 윈도우와 비주얼 큐가 동기화되는 1인 개발 리듬 액션 러너 프로토타입.",
    goal: "사이드 스크롤 러너 장르에 리듬 게임의 정확한 입력 판정 시스템을 결합한 1인 개발 프로토타입. 음악에 맞춰 점프와 슬라이드를 입력하는 4단계 난이도의 트랙 5개를 만들었습니다. Unity 6와 URP를 처음부터 깊게 사용해보는 학습 목표도 함께 두고, 오디오 타임라인 ↔ 게임플레이 동기화의 모든 단계를 본인이 설계해 4개월 안에 playable build를 만들었습니다. 결과물은 itch.io에 무료 공개해 100명 이상의 플레이어 데이터를 수집해 input window 튜닝의 기반 자료로 사용했습니다.",
    challenges: [
      {
        title: "오디오 타임라인 ↔ 입력 윈도우 동기화 정확도",
        problem: "Unity의 AudioSource.time은 audio thread와 game thread 사이에서 ±20ms 정도 jitter가 발생해, 60Hz 게임플레이 입력 판정 윈도우(±33ms)와 비교했을 때 무시할 수 없는 오차였습니다. 결과적으로 '딱 박자에 맞춰 눌렀는데 perfect 안 됨' 같은 false negative가 트랙당 5-10회씩 발생해 게임이 부당하게 느껴졌습니다.",
        solution: "AudioSettings.dspTime을 기준 시각으로 사용하고, AudioSource.time은 시각 큐 갱신용으로만 사용하도록 분리했습니다. dspTime은 audio engine 내부 시계라 jitter가 µs 단위로 줄어듭니다. 또한 입력 시각도 frame 시각이 아닌 input event timestamp를 기록해 dsp 시각과 비교하는 구조로 변경했습니다. 트랙 데이터(노트 타이밍)는 ScriptableObject로 BPM과 offset만 가지고, 런타임에 dsp 시각과 비교하는 방식입니다.",
        outcome: "input window 판정 오차 ±20ms → ±2ms, 100명 플레이 데이터 기준 false negative 0%"
      },
      {
        title: "URP shader fit + 모바일 GPU stuttering",
        problem: "기본 URP lit shader는 셀룰로이드 풍 게임의 외곽선 강조 + 채도 높은 컬러 그레이딩에 맞지 않았습니다. 또 itch.io 빌드를 모바일 브라우저에서도 돌려보고 싶었는데, 일부 안드로이드 GPU(Mali-G52)에서 발견된 stuttering이 frame time 30ms를 넘기는 spike를 만들었습니다.",
        solution: "URP custom render feature로 outline pass를 추가하고, 외곽선은 stencil + dilated normal 기반으로 처리했습니다. 컬러 그레이딩은 LUT texture로 분리해 디자이너가 photoshop에서 직접 조정 가능한 워크플로우를 만들었습니다. 모바일은 GPU profiler로 stuttering 원인을 찾았는데, post-process volume이 frame마다 reallocation을 일으키는 게 원인이었습니다. volume profile을 정적 ScriptableObject로 캐시해 spike를 제거했습니다.",
        outcome: "프레임 타임 변동 30ms → 8ms, Mali-G52 평균 60FPS 유지"
      }
    ],
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
    summary: "48시간 게임잼 2위 출품작. 룬 결합 기반 FPS를 데이터 드리븐 무기 시스템으로 단기간에 구현.",
    goal: "48시간 게임잼 출품작으로 만든 룬 결합 시스템 기반 1인칭 슈터. 플레이어가 던전을 클리어하며 7가지 기본 룬을 모으고, 이를 2-3개씩 결합해 12개 이상의 무기 변형을 만들어내는 데이터 드리븐 무기 시스템을 단기간에 구현해 잼 2위에 랭크되었습니다. 3인 팀이었지만 본인이 모든 코드(C++ + Blueprint)와 절차적 던전 생성을 담당했고, 디자이너 동료가 룬 조합 룰을 DataAsset으로 직접 편집할 수 있는 in-editor 툴까지 만들어 협업 속도를 끌어올렸습니다. 게임잼 후 Steam Greenlight 진행 검토 단계입니다.",
    challenges: [
      {
        title: "48시간 안에 데이터 드리븐 무기 빌더 구현",
        problem: "기본/공격/효과 3가지 카테고리의 룬을 다양하게 조합하면 12개 이상의 무기가 나와야 했는데, hard-coded로 짜면 디자이너가 룬 추가할 때마다 프로그래머 작업이 필요했습니다. 잼 환경에서 24시간 내내 디자이너가 룬을 새로 추가하고 싶어 할 게 뻔했고, 매번 빌드 받아주면 다른 작업이 멈추는 문제.",
        solution: "DataAsset 기반 RuneAsset(이름/카테고리/효과 파라미터) + WeaponCombinationRule(룬 카테고리 조합 → 무기 클래스 매핑) 두 가지 자료를 정의했습니다. 런타임에 player가 룬 3개를 들고 결합 액션을 하면 RuleSet에서 매칭 무기 클래스를 lookup하고 spawn합니다. 새 룬은 디자이너가 ContentBrowser에서 RuneAsset 우클릭 → Create로 직접 추가하고, RuleSet에 ID만 넣으면 끝.",
        outcome: "디자이너가 잼 24시간 차에 룬 4종을 본인이 직접 추가, 프로그래머 개입 0회"
      },
      {
        title: "절차적 던전 + AI 네비게이션 동시 보장",
        problem: "런타임에 던전이 매번 다르게 생성되어야 했지만, AI는 NavMesh 기반이라 BuildAtRuntime이 30초 이상 걸리면 게임 시작 전에 시간 너무 오래 잡혔습니다. 잼 평가 빌드는 빠르게 시작해야 했고, 매번 NavMesh 빌드를 기다리게 할 순 없었습니다.",
        solution: "사전 베이크된 청크(15x15m unit)를 30개 만들고, 청크 단위로 NavMesh를 미리 굽고 child volume으로 묶었습니다. 런타임에는 청크를 랜덤 조합해 placement만 하고, 청크 간 연결 portal에 manual NavLink를 붙여 NavMesh를 새로 굽지 않고도 patrol/chase가 동작합니다. 적 spawn은 청크별 spawn point 메타데이터로 관리.",
        outcome: "던전 생성 시간 30초+ → 0.4초, 매 게임 다른 레이아웃"
      }
    ],
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
    summary: "로우폴리 드리프트 퍼즐. PC + 모바일 동시 출시, 첫 달 12K DAU 달성.",
    goal: "로우폴리 미감의 모바일/PC 동시 출시 드리프트 퍼즐 게임. 코너에서 그리는 드리프트 라인의 길이/각도가 점수가 되고, 시간 압축 리플레이로 자기 베스트와 경쟁하는 솔로 모드 + 글로벌 리더보드를 핵심 루프로 잡았습니다. 2인 팀에서 본인은 차량 물리 컨트롤러, 트랙 데이터 시스템, 모바일 터치 입력 어댑터, 리플레이 직렬화/재생, REST 백엔드 연동까지 클라이언트 전반을 담당했고, 디자이너 파트너가 트랙 디자인과 UI/UX를 맡았습니다. 6개월 개발 후 Steam과 Google Play 동시 출시했고, 출시 첫 달에 두 플랫폼 합산 12,000 DAU를 기록했습니다.",
    challenges: [
      {
        title: "터치 ↔ 키보드/게임패드 입력 일관성",
        problem: "PC는 좌/우 키와 아날로그 스틱(점진적 입력), 모바일은 좌/우 화면 터치(이산 입력)가 들어옵니다. 같은 코너에서 PC는 부드러운 드리프트가 나오는데 모바일은 핸들이 갑자기 꺾여 드리프트 라인이 끊겨 점수가 절반 이하로 떨어지는 형평성 문제가 있었습니다. 리더보드 1위가 모두 PC 사용자로 쏠리면 모바일 사용자 이탈이 우려됐습니다.",
        solution: "터치 입력을 InputAdapter에서 가상 아날로그 신호로 변환했습니다. 터치 시작 ~ 종료 사이의 시간을 곡선으로 mapping해(touch hold time 0~250ms 동안 0→1로 ease-out), 게임 측은 항상 0~1 사이의 analog steering 값을 받습니다. 같은 코너 통과 시 PC와 모바일이 거의 동일한 드리프트 라인이 그려지도록 튜닝했고, 모바일에서도 분기 가능한 advanced flicking 동작도 지원합니다.",
        outcome: "동일 트랙 PC vs 모바일 평균 점수 격차 47% → 4%"
      },
      {
        title: "리플레이 데이터 사이즈 + 백엔드 비용",
        problem: "리플레이를 매 프레임 raw position으로 저장하니 60초 트랙이 800KB가 되고, 글로벌 리더보드 백엔드 S3 저장 + 다운로드 비용이 무시 못할 수준이었습니다. 모바일 사용자 데이터 비용 부담도 있어 출시 후 운영비가 매출보다 빠르게 늘어날 위험.",
        solution: "delta-encoded keyframe 방식으로 변경했습니다. 위치/회전을 100ms 간격으로 keyframe하고 사이는 spline interpolation. 입력 변화가 없는 구간은 더 듬성듬성 keyframe. quaternion은 8-byte fixed-point로 압축. 추가로 zstd(level 5)로 후처리 압축까지 적용해 평균 사이즈를 대폭 줄였습니다.",
        outcome: "리플레이 평균 사이즈 800KB → 18KB (-97.7%), S3 비용 월 $40 → $2"
      }
    ],
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
    summary: "자체 C++/Vulkan 렌더링 엔진. PBR · CSM · 디퍼드 G-buffer를 직접 구현한 OSS 사이드 프로젝트.",
    goal: "취미 프로젝트로 시작한 자체 C++/Vulkan 렌더링 엔진. PBR 머티리얼, cascaded shadow map, 디퍼드 G-buffer까지 직접 구현하면서 modern GPU pipeline의 동작 방식을 깊이 이해하는 게 목표입니다. 게임 엔진을 만들려는 게 아니라, 그래픽스 인터뷰에서 자신 있게 설명할 수 있는 수준의 baseline 코드를 갖는 것이 핵심 동기였습니다. 1년차 현재 GLTF 2.0 모델 로딩, IBL 기반 PBR, 6 cascade shadow, post-process(bloom, tonemap) 파이프라인이 동작하고, GitHub에 OSS로 공개해 contributors 3명을 받았습니다.",
    challenges: [
      {
        title: "Vulkan command graph 추상화",
        problem: "Vulkan은 raw API라서 command buffer 빌딩, descriptor set, render pass synchronization을 직접 다 관리해야 합니다. 초기엔 모든 frame의 command를 매번 새로 빌드했는데, 이러면 60FPS @ 1440p에서 CPU에 30% 이상 시간을 쓰는 비효율이 발생했습니다. 144Hz 목표는커녕 60Hz도 위태로운 상황.",
        solution: "frame graph 패턴을 도입해 pass 간 의존성을 그래프로 선언하고, 매 프레임 command 빌드를 cache 가능한 형태로 분리했습니다. 변경된 pass만 재빌드하고, descriptor set도 pass 단위로 pre-allocated pool에서 리사이클합니다. synchronization barrier는 frame graph가 자동으로 추론해 삽입합니다. 결과적으로 일반 frame은 빌드 비용이 거의 0에 가깝습니다.",
        outcome: "프레임당 CPU 시간 12.4ms → 3.1ms, 144Hz 안정 유지"
      },
      {
        title: "PBR uber shader + 6 cascade shadow",
        problem: "metallic-roughness 모델을 표준 GLTF 그대로 따르되, 동시에 emissive, clearcoat, transmission까지 옵션 확장하려니 shader variants가 폭발했습니다. 또 6 cascade shadow는 cascade 경계에서 acne와 peter-panning이 동시에 발생해 시각적 아티팩트가 두드러졌습니다.",
        solution: "uber shader를 작성하고 shader variant를 spec constant로 컴파일 타임에 선택하도록 했습니다. cascade shadow는 Variance Shadow Map의 cascading 변형을 적용해 경계 부드럽게 처리하고, normal-bias + slope-scale depth-bias 조합으로 acne 제거. 추가로 cascade 간 blend region을 8% 폭으로 두어 갑작스러운 해상도 변화도 가렸습니다.",
        outcome: "shader binary 21개 → 1개, shadow 경계 artifact 시각적으로 제거"
      }
    ],
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
