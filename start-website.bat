@echo off
title Launching MERN E-Commerce Website...
echo ===================================================
echo   Starting MERN E-Commerce Full-Stack Website
echo ===================================================
echo.

echo [1/3] Starting Backend API Server (Port 5000)...
start "E-Commerce Backend API" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Frontend React Application (Port 5173)...
start "E-Commerce Frontend App" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 2 /nobreak >nul

echo [3/3] Opening Website in Browser...
start http://localhost:5173

echo.
echo ===================================================
echo   Application is now running!
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:5000/api
echo ===================================================
timeout /t 5
