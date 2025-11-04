@echo off
echo Starting EventMate Application...

echo Starting Backend...
start "Backend" cmd /k "cd backend && mvn spring-boot:run"

timeout /t 30

echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm start"

echo Both applications are starting. Please wait for the frontend to compile successfully.
echo Once both are running, open your browser and go to http://localhost:3000
echo.
echo Backend API will be available at http://localhost:8082
echo.
echo Press any key to exit this script...
pause >nul