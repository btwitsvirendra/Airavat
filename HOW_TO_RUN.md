# 🚀 How to Run Airavat B2B Platform

## Quick Start - Choose Your Method

---

## ⚡ Method 1: Simple Python Server (EASIEST - 30 seconds)

**Run the current working platform with all features:**

```bash
# 1. Navigate to project folder
cd Airavat

# 2. Pull latest changes
git pull origin claude/general-work-011CUtU9phvXasMaVYsGkJ7e

# 3. Start server
python -m http.server 8000
```

**Open browser:**
```
http://localhost:8000
```

**Test Login:**
- Buyer: `9352787989`
- Seller: `9352787951`
- Password: any 6-digit OTP (e.g., `123456`)

✅ All navigation works
✅ All pages accessible
✅ Full functionality

**Stop Server:** Press `Ctrl + C`

---

## 🔥 Method 2: Professional Development Server with Vite (5 minutes)

**For modern development with hot reload and professional features:**

### Prerequisites

**Check if Node.js is installed:**
```bash
node --version
npm --version
```

**If not installed:**
- Download from: https://nodejs.org/
- Install LTS version (recommended)
- Restart terminal after installation

### Setup Steps

#### 1. Install Dependencies

```bash
# Navigate to project
cd Airavat

# Install packages (first time only)
npm install
```

This installs:
- ✅ Vite (lightning-fast dev server)
- ✅ ESLint (code quality checker)
- ✅ Prettier (code formatter)
- ✅ Sass (advanced CSS)
- ✅ Other professional tools

**Wait time:** 1-2 minutes (depends on internet speed)

#### 2. Start Development Server

```bash
# Start Vite dev server
npm run dev
```

**Output you'll see:**
```
  VITE v5.0.10  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Browser opens automatically at:** `http://localhost:3000`

#### 3. Enjoy Modern Features

✅ **Hot Module Replacement** - Changes update instantly without refresh
✅ **Fast refresh** - See changes in milliseconds
✅ **Modern build** - Optimized for production
✅ **Source maps** - Easy debugging

**Stop Server:** Press `Ctrl + C`

---

## 📋 Comparison: Which Method to Use?

| Feature | Python Server | Vite Server |
|---------|--------------|-------------|
| **Setup Time** | 30 seconds | 5 minutes |
| **Speed** | Normal | Very Fast |
| **Hot Reload** | ❌ No (manual refresh) | ✅ Yes (automatic) |
| **Modern Features** | ❌ No | ✅ Yes |
| **Production Build** | ❌ No | ✅ Yes |
| **Recommended For** | Testing, Quick Demo | Development, Production |

**Use Python Server if:**
- ✅ You want to test quickly
- ✅ You don't have Node.js installed
- ✅ You just want to see it work

**Use Vite Server if:**
- ✅ You're actively developing
- ✅ You want modern features
- ✅ You're preparing for production

---

## 🛠️ Troubleshooting

### Python Server Issues

**Problem:** `python: command not found`

**Solution:**
```bash
# Try python3 instead
python3 -m http.server 8000
```

**Problem:** Port 8000 already in use

**Solution:**
```bash
# Use a different port
python -m http.server 8080

# Then open: http://localhost:8080
```

### Vite Server Issues

**Problem:** `npm: command not found`

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Choose LTS version
3. Restart terminal
4. Try again

**Problem:** `npm install` fails

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

**Problem:** Port 3000 already in use

**Solution:**
```bash
# Vite will automatically use next available port (3001, 3002, etc.)
# Or specify custom port:
npm run dev -- --port 3001
```

**Problem:** Module not found errors

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 🎯 What You Should See

### Home Page (index.html)
- ✅ Header with logo "Airavat"
- ✅ Search bar
- ✅ Navigation: Discover, RFQ, Categories
- ✅ Account icon (click to see dropdown)
- ✅ Product listings
- ✅ Footer

### After Login (9352787989)
- ✅ Name appears instead of "Account"
- ✅ Dropdown shows: Home, My Profile, Orders, Messages, etc.
- ✅ Click "My Profile" → Goes to profile page
- ✅ Click "Messages" → Goes to messages page
- ✅ All navigation buttons work

### Dashboard Pages
- ✅ Profile page with enhanced header
- ✅ Orders page with order list
- ✅ Messages page with conversations
- ✅ RFQ page with request forms
- ✅ Payments page
- ✅ Logistics page

---

## 🚀 Next Steps After Running

### For Testing (Python Server)
1. ✅ Test all pages
2. ✅ Try buyer and seller login
3. ✅ Check navigation
4. ✅ Test forms and buttons

### For Development (Vite Server)
1. ✅ Start making changes
2. ✅ See live updates
3. ✅ Follow QUICK_START_GUIDE.md
4. ✅ Integrate API services

---

## 📱 Access from Other Devices (Optional)

**To access from phone/tablet on same network:**

```bash
# Start with host flag
python -m http.server 8000 --bind 0.0.0.0

# Or with Vite
npm run dev -- --host
```

**Find your computer's IP address:**

**On Mac/Linux:**
```bash
ifconfig | grep "inet "
```

**On Windows:**
```bash
ipconfig
```

**Then open on mobile:**
```
http://YOUR_IP_ADDRESS:8000
# Example: http://192.168.1.100:8000
```

---

## 🔐 Login Credentials

### Buyer Account
- **Phone:** `9352787989`
- **OTP:** Any 6 digits (e.g., `123456`)
- **Role:** Buyer
- **Access:** Orders, Messages, RFQ, Payments, Logistics

### Seller Account
- **Phone:** `9352787951`
- **OTP:** Any 6 digits (e.g., `123456`)
- **Role:** Seller
- **Access:** Orders, Messages, RFQ, Payments, Transport, Sales, Inventory, Grow

---

## 📚 Additional Commands (Vite Only)

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Check code quality
npm run lint

# Format code
npm run format

# Run tests (when implemented)
npm run test
```

---

## 💡 Pro Tips

1. **Use Vite for development** - Much better experience
2. **Keep server running** - See changes instantly
3. **Use browser DevTools** - Press F12 to debug
4. **Check console** - See any errors or messages
5. **Clear cache** - If seeing old version, clear browser cache (Ctrl+Shift+R)

---

## ❓ Still Having Issues?

### Check These:

1. **Are you in the right directory?**
   ```bash
   pwd
   # Should show: /path/to/Airavat
   ```

2. **Did you pull latest changes?**
   ```bash
   git pull origin claude/general-work-011CUtU9phvXasMaVYsGkJ7e
   ```

3. **Is the port available?**
   ```bash
   # Check if something is using port 8000/3000
   lsof -i :8000
   lsof -i :3000
   ```

4. **Check browser console for errors:**
   - Press F12
   - Go to Console tab
   - Look for red error messages

---

## 🎉 Success Checklist

After running, you should be able to:

- ✅ Open the website in browser
- ✅ See the Airavat logo and header
- ✅ Click through navigation links
- ✅ Login with test credentials
- ✅ Access profile page
- ✅ Navigate all dashboard pages
- ✅ See smooth transitions

**If all checked, you're good to go! 🚀**

---

## 📖 Next Reading

- **QUICK_START_GUIDE.md** - How to integrate new features
- **MODERNIZATION_PLAN.md** - Complete technical blueprint
- **PROFESSIONAL_UPGRADE_SUMMARY.md** - Overview of improvements

---

**Need help? Check the troubleshooting section or review documentation files.**
