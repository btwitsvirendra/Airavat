#!/bin/bash

# Simple Python Server Runner for Airavat B2B Platform
# This script starts a basic HTTP server

echo "🚀 Starting Airavat B2B Platform..."
echo ""
echo "📍 Server will start at: http://localhost:8000"
echo ""
echo "🔑 Login Credentials:"
echo "   Buyer:  9352787989"
echo "   Seller: 9352787951"
echo "   OTP:    any 6 digits (e.g., 123456)"
echo ""
echo "⏹️  Press Ctrl+C to stop the server"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if Python is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ Python is not installed!"
    echo "Please install Python from: https://www.python.org/downloads/"
    exit 1
fi
