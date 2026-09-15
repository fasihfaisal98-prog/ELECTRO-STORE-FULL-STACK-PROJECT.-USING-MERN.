@echo off
title Seeding MongoDB with 12 Sample Products...
echo ===================================================
echo   Seeding Products into Database
echo ===================================================
echo.
cd /d %~dp0backend
node src/seed.js
echo.
echo Seeding complete! You can now start the website.
pause
