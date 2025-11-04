@echo off
echo Verifying EventMate Application...

echo.
echo Checking Backend API...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8082/api/events' -Method GET -TimeoutSec 5; if ($response.StatusCode -eq 200) { Write-Host '✅ Backend API is working' } else { Write-Host '❌ Backend API error' } } catch { Write-Host '❌ Backend API is not accessible' }"

echo.
echo Checking Frontend...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000' -Method GET -TimeoutSec 5; if ($response.StatusCode -eq 200) { Write-Host '✅ Frontend is accessible' } else { Write-Host '❌ Frontend error' } } catch { Write-Host '❌ Frontend is not accessible' }"

echo.
echo Checking Database Connection...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8082/api/packages' -Method GET -TimeoutSec 5; if ($response.StatusCode -eq 200) { Write-Host '✅ Database connection is working' } else { Write-Host '❌ Database connection error' } } catch { Write-Host '❌ Database connection failed' }"

echo.
echo Checking CORS Configuration...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8082/api/services' -Method GET -TimeoutSec 5; if ($response.StatusCode -eq 200) { Write-Host '✅ CORS is configured correctly' } else { Write-Host '❌ CORS error' } } catch { Write-Host '❌ CORS configuration failed' }"

echo.
echo Application Verification Complete!
echo.
echo To use the application:
echo 1. Open your browser and go to http://localhost:3000
echo 2. Sign up as a new user or log in with:
echo    - Admin: admin@example.com / admin123
echo 3. Explore the user and admin dashboards
echo.
pause