@echo off
cd /d "%~dp0.."
set ASTRO_TELEMETRY_DISABLED=1
node_modules\node\bin\node.exe scripts\astro-runner.mjs preview --host 127.0.0.1 --port 4321
