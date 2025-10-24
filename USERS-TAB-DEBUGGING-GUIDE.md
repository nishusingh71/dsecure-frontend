# Users Tab Data Loading - Debugging Guide

## Changes Made ✅

### 1. **Added useEffect for Auto-Loading**
```typescript
// Load users data when Users tab is opened
useEffect(() => {
  if (activeTab === 'users') {
    console.log('🔄 Users tab opened, fetching users data...')
    fetchAndMergeUsersData()
  }
}, [activeTab])
```

### 2. **Enhanced Error Logging**
```typescript
console.log('🚀 Starting fetchAndMergeUsersData...')
console.log('👥 Fetching users data for email:', userEmail)
console.log('📊 ProfileData:', profileData)
console.log('📊 User from context:', user)
console.log('🔍 Calling getUserByEmail API...')
console.log('📥 Superuser API Response:', superuserRes)
console.log('🔍 Calling getSubusersBySuperuser API...')
console.log('📥 Subusers API Response:', subusersRes)
```

### 3. **Removed Duplicate Manual Call**
- Removed `fetchAndMergeUsersData()` from `handleManageGroups()`
- Now relies solely on useEffect for automatic loading

---

## How It Works Now 🔄

```
User clicks "Users" tab
        ↓
setActiveTab('users')
        ↓
useEffect detects activeTab change
        ↓
if (activeTab === 'users')
        ↓
fetchAndMergeUsersData() is called
        ↓
API calls are made
```

---

## Debugging Steps 🔍

### **1. Open Browser Console**
Press `F12` or `Ctrl+Shift+I` to open DevTools

### **2. Click on Users Tab**
Navigate to: Admin Dashboard → Users tab

### **3. Check Console Logs**

**Expected logs:**
```
🔄 Users tab opened, fetching users data...
🚀 Starting fetchAndMergeUsersData...
👥 Fetching users data for email: your@email.com
📊 ProfileData: {email: "...", name: "..."}
📊 User from context: {email: "...", ...}
🔍 Calling getUserByEmail API...
📥 Superuser API Response: {success: true, data: {...}}
🔍 Calling getSubusersBySuperuser API...
📥 Subusers API Response: {success: true, data: [...]}
📊 License calculation: {totalLicenses: 100, consumedLicenses: 75}
✅ Superuser data set
📋 Found 3 subusers
```

---

## Common Issues & Solutions 🛠️

### **Issue 1: No user email available**
**Logs:**
```
⚠️ No user email available for fetching users data
📊 ProfileData: null
📊 User from context: null
```

**Solution:**
- Check if user is logged in
- Verify localStorage has user data
- Check AuthContext is providing user data

---

### **Issue 2: API returns 404**
**Logs:**
```
📥 Superuser API Response: {success: false, error: "Not found"}
```

**Solution:**
- Check if user email exists in database
- Verify API endpoint: `/api/Users/{email}`
- Check if backend is running

---

### **Issue 3: API returns 401 Unauthorized**
**Logs:**
```
📥 Superuser API Response: {success: false, error: "Authentication expired"}
```

**Solution:**
- Token might be expired
- Login again
- Check if token is being sent in headers

---

### **Issue 4: No subusers found**
**Logs:**
```
ℹ️ No subusers found or failed to fetch
📥 Subusers API Response: {success: true, data: []}
```

**This is normal if:**
- User has no subusers created yet
- Only superuser will be displayed

---

### **Issue 5: License details not parsing**
**Logs:**
```
❌ Failed to parse license_details_json: SyntaxError
```

**Solution:**
- Check `license_details_json` format in database
- Should be valid JSON string
- Supports two formats:
  ```json
  {"products": [{"product":"...", "total":50, "consumed":20}]}
  ```
  OR
  ```json
  [{"product":"...", "total":50, "consumed":20}]
  ```

---

## Testing Checklist ✅

- [ ] Login to admin dashboard
- [ ] Open browser console (F12)
- [ ] Click on "Users" tab
- [ ] Check console logs for:
  - [ ] "🔄 Users tab opened"
  - [ ] "🚀 Starting fetchAndMergeUsersData"
  - [ ] User email is displayed
  - [ ] Both API calls are made
  - [ ] API responses are logged
- [ ] Verify UI:
  - [ ] Loading spinner appears briefly
  - [ ] Superuser section displays with data
  - [ ] Subusers section displays (if subusers exist)
  - [ ] Progress bar shows correct usage
  - [ ] All columns have data

---

## Network Tab Inspection 🌐

### **1. Open Network Tab**
In DevTools, go to Network tab

### **2. Filter by XHR/Fetch**

### **3. Look for these requests when Users tab opens:**

**Request 1:**
```
GET /api/Users/{email}
Status: 200 OK
Response: {
  "id": "...",
  "email": "...",
  "name": "...",
  "license_details_json": "{...}"
}
```

**Request 2:**
```
GET /api/Subuser/by-superuser/{email}
Status: 200 OK
Response: [
  {
    "id": "...",
    "subuser_email": "...",
    "superuser_email": "...",
    "created_at": "..."
  }
]
```

---

## Quick Test Script 🧪

Open browser console and run:
```javascript
// Check if user email is available
console.log('User Email:', localStorage.getItem('authUser'))

// Check if activeTab state is correct
console.log('Active Tab:', document.querySelector('[class*="border-emerald-500"]')?.textContent)

// Check if API client is available
console.log('API Client:', window.apiClient ? 'Available' : 'Not available')
```

---

## Expected Result ✨

When everything works correctly:

1. **Click Users tab**
2. **See loading spinner** for 1-2 seconds
3. **Superuser section appears:**
   - Name, email, total licenses
   - Progress bar with usage
   - Green/yellow/red color based on usage
4. **Subusers section appears** (if any):
   - List of all subusers
   - Parent user email
   - Status badges
   - Edit/Delete actions

---

## Still Not Working? 🤔

1. **Clear browser cache** and reload
2. **Check backend logs** for API errors
3. **Verify database** has user data
4. **Try different browser** to rule out extension issues
5. **Check CORS settings** in backend
6. **Verify API base URL** is correct in `.env`

---

## Contact Info 📧

If issue persists after following all steps:
- Share console logs (screenshot)
- Share network tab (screenshot of failed requests)
- Share browser and version
- Share any error messages from backend logs
