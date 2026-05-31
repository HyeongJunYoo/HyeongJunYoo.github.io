# Project Images

이 폴더는 포트폴리오 페이지(`/portfolio` 인덱스 + 각 프로젝트 디테일)에 사용되는 사진을 담는 곳입니다. **파일명이 곧 슬롯 계약**이라, 같은 파일명으로 본인 사진을 덮어쓰기만 하면 사이트에 즉시 반영됩니다.

## 폴더 구조

```
public/projects/
  README.md                     ← 이 문서
  <project-slug>/
    hero.jpg                    ← 프로젝트 대표 사진 (인덱스 카드 + 디테일 상단 hero)
    challenge-01.jpg            ← 첫 번째 챌린지 inline 스크린샷
    challenge-02.jpg            ← 두 번째 챌린지
    challenge-03.jpg            ← (있으면)
```

## 지원 포맷

`.webp` · `.png` · `.jpg` · `.jpeg` 모두 자동 인식 (대소문자 무관 — `.PNG`, `.JPG`도 OK).

**우선순위**: `webp` → `png` → `jpeg` → `jpg`. 같은 슬롯에 여러 포맷이 공존하면 우선순위 높은 게 선택됩니다. 본인 사진(예: `hero.png`)을 올리면 기본 placeholder(`hero.jpg`)는 그대로 둬도 자동으로 본인 것이 표시됩니다. 원하면 placeholder를 삭제해도 됩니다.

## 교체 방법

1. 본인 사진을 `.webp` / `.png` / `.jpg` / `.jpeg` 중 하나로 준비 (권장 해상도: Hero 1600×900 이상 / Challenge 1280×720 이상, 16:9)
2. 슬롯 이름(`hero` 또는 `challenge-NN`)에 본인 포맷 확장자를 붙여 저장 (예: `public/projects/project-nemesis/hero.png`)
3. **포맷을 바꿨다면 dev 서버 재시작** (또는 `npm run build` 재실행) — 자동 인식은 build 시점에 확정됨. **같은 포맷 내 덮어쓰기**(예: `hero.png`을 새 `hero.png`으로)는 HMR로 즉시 반영
4. 브라우저 캐시가 옛 사진을 계속 보여주면 강제 새로고침 (Ctrl/Cmd+Shift+R)

## 슬러그 ↔ 챌린지 매핑

각 챌린지 번호는 `src/data/projects.ts`의 `challenges[]` 배열 순서(1-based)와 일치합니다.

| 슬러그 | 챌린지 번호 | 챌린지 제목 (요약) |
|---|---|---|
| `project-nemesis` | 01 | UI 고도화 · WebView → 네이티브 |
| `project-nemesis` | 02 | 플랫폼 고도화 · 입력·사운드·리소스 통합 |
| `project-nemesis` | 03 | 마커리스 모션 캡처 · PC/iOS/Android |
| `echo-runner` | 01 | 침 위치·각도·깊이 평가 시각화 |
| `echo-runner` | 02 | 멀티 실습 룸 동기화 + Meta Horizon |
| `rune-tactics` | 01 | 멀티 주문·조리 흐름 동기화 |
| `rune-tactics` | 02 | VR 컨트롤러 햅틱 피드백 |
| `poly-drift` | 01 | 미니게임 4종 공통 레이어 |
| `poly-drift` | 02 | 관리자/참여자 비대칭 동기화 |
| `render-lab` | 01 | SDK 초기 설정 → Editor Tool |
| `render-lab` | 02 | SDK 버전 관리 + 패키지 갱신 |

## 사진 없는 슬롯을 비우고 싶을 때

특정 챌린지에 사진을 넣고 싶지 않으면 `src/data/projects.ts`에서 해당 챌린지의 `image:` 필드를 삭제(또는 주석 처리). 디테일 페이지의 챌린지 카드는 `image`가 없으면 자동으로 이미지 슬롯을 생략합니다.

Hero(`project.image`)는 데이터 타입상 필수이므로 제거 불가. 사진 없는 상태로 두려면 placeholder 그대로 유지.

## 현재 placeholder 상태

이 폴더의 모든 `.jpg`는 1280×720 단색 다크 그레이(`#1a1a1a`) placeholder입니다. 본인 사진이 준비되면 같은 파일명으로 덮어쓰면 됩니다.
