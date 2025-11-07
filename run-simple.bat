@echo off
REM Simple Python Server Runner for Airavat B2B Platform (Windows)

echo.
echo ========================================
echo   Airavat B2B Platform
echo ========================================
echo.
echo Server will start at: http://localhost:8000
echo.
echo Login Credentials:
echo   Buyer:  9352787989
echo   Seller: 9352787951
echo   OTP:    any 6 digits (e.g., 123456)
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

REM Try python3 first, then python
python -m http.server 8000 2>nul || python3 -m http.server 8000 2>nul || (
    echo Python is not installed!
    echo Please install Python from: https://www.python.org/downloads/
    pause
    exit /b 1
)
