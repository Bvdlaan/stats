@echo off
rem Windows: double-click to start. Uses Node if present, otherwise Python.
cd /d "%~dp0"
start "" http://localhost:8080
where node >nul 2>nul && (node serve.js & goto :eof)
where python >nul 2>nul && (python serve.py & goto :eof)
py serve.py
