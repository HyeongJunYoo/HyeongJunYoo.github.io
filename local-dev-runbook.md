# Local Dev Runbook

이 문서는 로컬 이력서 페이지를 빠르게 띄우기 위한 기록입니다.
Codex 환경에서는 dev server 실행과 브라우저 열기에서 샌드박스나 Node 런타임 문제로 몇 번씩 실패할 수 있으므로, 아래 최우선 실행 절차를 먼저 사용합니다.

## 기본 정보

- 프로젝트 경로: `C:\Users\jun\Desktop\Resume\HyeongJunYoo.github.io`
- 로컬 주소: `http://127.0.0.1:4321/`
- 실행 스크립트: `npm run dev -- --host 127.0.0.1 --port 4321`

## 최우선 실행 절차

2026.05.01 기준, Codex 샌드박스에서는 `npm run dev`나 `npm.cmd` 백그라운드 실행이 느리게 실패할 수 있었습니다.
다음부터는 시간을 줄이기 위해 **아래 절차를 우선 사용합니다.**

1. 먼저 서버가 이미 살아 있는지 확인합니다.

```powershell
try { (Invoke-WebRequest -Uri http://127.0.0.1:4321 -UseBasicParsing -TimeoutSec 2).StatusCode } catch { "DOWN" }
```

2. `DOWN`이면 `npm run dev` 대신 로컬 Node 실행 파일을 직접 사용해 dev server를 백그라운드로 실행합니다.

Codex에서 실행할 때는 `require_escalated` 권한으로 실행하는 것을 우선합니다. 샌드박스 안에서는 Vite가 내부 child process를 띄우는 단계에서 `spawn EPERM`이 발생할 수 있습니다.

```powershell
$p = Start-Process -FilePath "C:\Users\jun\Desktop\Resume\HyeongJunYoo.github.io\node_modules\.bin\node.cmd" -ArgumentList @("scripts\astro-runner.mjs", "dev", "--host", "127.0.0.1", "--port", "4321") -WorkingDirectory "C:\Users\jun\Desktop\Resume\HyeongJunYoo.github.io" -WindowStyle Hidden -PassThru
"PID=$($p.Id)"
```

3. 서버 응답을 다시 확인합니다.

```powershell
Start-Sleep -Seconds 2
try { (Invoke-WebRequest -Uri http://127.0.0.1:4321 -UseBasicParsing -TimeoutSec 5).StatusCode } catch { "DOWN" }
```

`200`이 나오면 서버가 정상 실행 중입니다.

4. 브라우저를 엽니다.

```powershell
Start-Process "http://127.0.0.1:4321/"
```

Codex 환경에서 GUI 앱을 여는 작업은 샌드박스 밖 실행 권한이 필요할 수 있습니다.

## 실패 패턴 기록

- 샌드박스 안에서 `npm run dev -- --host 127.0.0.1 --port 4321`를 직접 실행하면 출력 없이 종료될 수 있습니다.
- 2026.05.01 확인: `npm run dev -- --host 127.0.0.1 --port 4321`는 출력 없이 `Exit code 1`로 종료되었습니다.
- 2026.05.01 확인: `npm.cmd`를 `Start-Process`로 백그라운드 실행하면 `cmd`/`node` 프로세스는 생기지만 `127.0.0.1:4321`에서 응답하지 않는 경우가 있었습니다.
- 2026.05.01 확인: `node_modules\.bin\node.cmd scripts\astro-runner.mjs dev --host 127.0.0.1 --port 4321`를 샌드박스 안에서 직접 실행하면 `[vite] connected.` 이후 `spawn EPERM`으로 실패했습니다.
- 2026.05.01 확인: 위 로컬 Node 직접 실행 방식을 `require_escalated`로 백그라운드 실행하니 `200` 응답을 확인했고 브라우저 열기까지 성공했습니다.
- `Start-Process`에 `-RedirectStandardOutput`, `-RedirectStandardError`를 붙이면 현재 Windows 환경에서 `Path/PATH` 중복 문제로 실패할 수 있습니다. 로그 리다이렉션 없이 실행하는 쪽이 안정적이었습니다.
- 인앱 브라우저 자동 이동은 Node REPL 런타임 문제로 실패했습니다.
  - 현재 감지된 Node: `v16.17.0`
  - 요구 Node: `>= v22.22.0`
  - 따라서 인앱 브라우저 자동 제어 대신 `Start-Process "http://127.0.0.1:4321/"`로 기본 브라우저를 여는 방식이 안정적입니다.
- `install_workspace_dependencies()`도 런타임 설치에 실패했으므로, 당장은 브라우저 자동 제어 복구 경로로 보지 않습니다.

## 이전 성공 절차였지만 이제 후순위로 둘 것

아래 방식은 과거에 성공한 적이 있으나, 2026.05.01에는 프로세스만 뜨고 서버 응답이 없어서 시간을 많이 소모했습니다.
다음부터는 최우선 실행 절차가 실패했을 때만 참고합니다.

```powershell
$p = Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "dev", "--", "--host", "127.0.0.1", "--port", "4321") -WorkingDirectory "C:\Users\jun\Desktop\Resume\HyeongJunYoo.github.io" -WindowStyle Hidden -PassThru
"PID=$($p.Id)"
```

## Codex에게 요청할 때의 추천 문장

```text
local-dev-runbook.md의 최우선 실행 절차대로 서버를 띄우고 http://127.0.0.1:4321/ 를 열어줘.
```
