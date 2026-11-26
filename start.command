#!/bin/bash
# Mac: double-click to start. Uses Node if present, otherwise Python 3.
cd "$(dirname "$0")"
(sleep 1; open http://localhost:8080) &
if command -v node >/dev/null; then node serve.js; else python3 serve.py; fi
