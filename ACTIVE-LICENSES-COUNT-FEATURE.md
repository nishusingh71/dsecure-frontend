# 📊 Active Licenses Count from Machines API - COMPLETE

**Date:** October 17, 2025

---

## 🎯 **Feature:**

User dashboard overview mein **"My Licenses"** card mein **active licenses count** show karna hai, jo `api/Machines/by-email/{email}` API se fetch hoga aur `license_activated` field se count karega.

---

## ✅ **Implementation:**

### **1. Machine Interface Update**
**Location:** `src/utils/enhancedApiClient.ts`

**Added `license_activated` field:**
```typescript
export interface Machine {
  id: string
  hostname: string
  eraseOption: string
  license: string
  status: string
  lastSeen?: string
  department?: string
  license_activated?: boolean // ✅ New field for active license tracking
}
```

---

### **2. New API Method - getMachinesByEmail**
**Location:** `src/utils/enhancedApiClient.ts`

**Added new endpoint:**
```typescript
async getMachinesByEmail(email: string): Promise<ApiResponse<Machine[]>> {
  return this.request<Machine[]>(`/api/Machines/by-email/${encodeURIComponent(email)}`)
}
```

**Purpose:**
- Fetch all machines for a specific user by email
- Returns array of machines with `license_activated` field
- Used to count active licenses per user

---

### **3. AdminDashboard Integration**
**Location:** `src/pages/dashboards/AdminDashboard.tsx`

#### **A. Added State for Active Licenses:**
```typescript
const [activeLicensesCount, setActiveLicensesCount] = useState<number>(0) // Active licenses from machines API

const [profileData, setProfileData] = useState<ProfileData | null>({
  name: storedUserData?.user_name || user?.name || 'User',
  email: storedUserData?.user_email || user?.email || 'user@example.com',
  timezone: storedUserData?.timezone || 'Asia/Kolkata',
  role: primaryRole,
  phone: storedUserData?.phone_number || '',
  department: storedUserData?.department || '',
  licenses: 0 // ✅ Will be updated from Machines API
})
```

#### **B. Updated loadDashboardData Function:**
```typescript
const loadDashboardData = async () => {
  setDataLoading(true)
  try {
    // ... existing API calls ...

    // ✅ NEW: Fetch active licenses count from Machines API by user email
    const userEmail = storedUserData?.user_email || user?.email || profileRes.data?.email;
    if (userEmail) {
      console.log('📧 Fetching machines for email:', userEmail);
      const machinesRes = await apiClient.getMachinesByEmail(userEmail);
      
      if (machinesRes.success && machinesRes.data) {
        // ✅ Count machines with license_activated = true
        const activeLicenses = machinesRes.data.filter((machine: Machine) => 
          machine.license_activated === true
        ).length;
        
        console.log('✅ Active licenses count:', activeLicenses, 'from', machinesRes.data.length, 'total machines');
        setActiveLicensesCount(activeLicenses);
        
        // ✅ Update profile data with licenses count
        setProfileData(prev => ({
          ...prev!,
          licenses: activeLicenses
        }));
      } else {
        console.warn('⚠️ Failed to fetch machines:', machinesRes.error);
      }
    } else {
      console.warn('⚠️ No user email available for fetching machines');
    }

  } catch (error) {
    console.error('Error loading dashboard data:', error)
    // ... error handling ...
  }
}
```

#### **C. Added Import:**
```typescript
import { apiClient, type Machine } from '@/utils/enhancedApiClient'
```

---

## 🔄 **Complete Flow:**

### **User Dashboard Load:**
```
1. User logs in and navigates to dashboard
   ↓
2. AdminDashboard component mounts
   ↓
3. useEffect triggers loadDashboardData()
   ↓
4. loadDashboardData() executes:
   - Fetches dashboard stats ✅
   - Fetches user activity ✅
   - Fetches groups ✅
   - Fetches licenses ✅
   - Fetches reports ✅
   - Fetches profile data ✅
   ↓
5. ✅ NEW: Fetch machines by user email
   - Gets email: storedUserData?.user_email || user?.email
   - API Call: GET /api/Machines/by-email/{email}
   ↓
6. API Response:
   {
     success: true,
     data: [
       { id: "1", hostname: "PC-001", license_activated: true, ... },
       { id: "2", hostname: "PC-002", license_activated: false, ... },
       { id: "3", hostname: "PC-003", license_activated: true, ... },
       { id: "4", hostname: "PC-004", license_activated: true, ... }
     ]
   }
   ↓
7. ✅ Filter & Count:
   - Filter: machines.filter(m => m.license_activated === true)
   - Count: 3 (out of 4 total machines)
   ↓
8. ✅ Update State:
   - setActiveLicensesCount(3)
   - setProfileData({ ...prev, licenses: 3 })
   ↓
9. ✅ UI Renders:
   - "My Licenses" card shows: 3
   - "Active licenses" subtitle
```

---

## 📊 **UI Display (User Role):**

### **Overview Tab - Stats Cards:**

```typescript
<RoleBased roles={['user']}>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-8">
    
    {/* ✅ My Licenses Card - Shows active licenses from API */}
    <div className="card !p-4 lg:!p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-3 rounded-full bg-blue-400 flex-shrink-0"></div>
        <p className="text-sm font-medium text-slate-600">My Licenses</p>
      </div>
      <p className="text-2xl lg:text-3xl font-bold text-slate-900">
        {profileData?.licenses || 0} {/* ✅ Shows count from Machines API */}
      </p>
      <p className="text-sm text-slate-500 mt-2">Active licenses</p>
    </div>
    
    {/* Available Reports Card */}
    <div className="card !p-4 lg:!p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-3 h-3 rounded-full bg-purple-400 flex-shrink-0"></div>
        <p className="text-sm font-medium text-slate-600">Available Reports</p>
      </div>
      <p className="text-2xl lg:text-3xl font-bold text-slate-900">
        {recentReports.length}
      </p>
      <p className="text-sm text-slate-500 mt-2">Ready to download</p>
    </div>
    
  </div>
</RoleBased>
```

---

## 🧪 **API Request/Response:**

### **Request:**
```http
GET https://api.dsecuretech.com/api/Machines/by-email/user@example.com
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

### **Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "machine-001",
      "hostname": "DESKTOP-USER-PC",
      "eraseOption": "Quick Erase",
      "license": "PRO-2024-001",
      "status": "Active",
      "lastSeen": "2025-10-17T10:30:00Z",
      "department": "IT",
      "license_activated": true  // ✅ This field is counted
    },
    {
      "id": "machine-002",
      "hostname": "LAPTOP-USER-02",
      "eraseOption": "Secure Erase",
      "license": "PRO-2024-002",
      "status": "Inactive",
      "lastSeen": "2025-10-15T08:20:00Z",
      "department": "IT",
      "license_activated": false  // ❌ Not counted
    },
    {
      "id": "machine-003",
      "hostname": "SERVER-USER-DB",
      "eraseOption": "Military Grade",
      "license": "ENTERPRISE-2024-003",
      "status": "Active",
      "lastSeen": "2025-10-17T11:45:00Z",
      "department": "IT",
      "license_activated": true  // ✅ This field is counted
    }
  ]
}
```

### **Processing:**
```typescript
// Total machines: 3
// Machines with license_activated = true: 2
// Machines with license_activated = false: 1

const activeLicenses = data.filter(m => m.license_activated === true).length
// Result: 2

// Update UI
profileData.licenses = 2  // ✅ Shows "2" in "My Licenses" card
```

---

## 🎯 **Console Logs (Debug Output):**

### **Successful Fetch:**
```
📧 Fetching machines for email: user@example.com
✅ Active licenses count: 3 from 5 total machines
```

### **No Machines Found:**
```
📧 Fetching machines for email: newuser@example.com
✅ Active licenses count: 0 from 0 total machines
```

### **API Error:**
```
📧 Fetching machines for email: user@example.com
⚠️ Failed to fetch machines: Network error
```

### **No Email Available:**
```
⚠️ No user email available for fetching machines
```

---

## 🔒 **Permission & Role Check:**

### **User Role (Regular User):**
```
Role: user
Permission: Can view own licenses ✅
Display: "My Licenses" card with active count
API Call: GET /api/Machines/by-email/{user_email}
Shows: Only user's own active licenses
```

### **Admin/SuperAdmin Role:**
```
Role: admin/superadmin
Permission: Can view all stats ✅
Display: Full dashboard with "Total Licenses" card
API Call: Multiple endpoints (dashboard stats)
Shows: Organization-wide license statistics
```

---

## 📁 **Files Modified:**

### **1. src/utils/enhancedApiClient.ts** ✅
- Added `license_activated?: boolean` to Machine interface
- Added `getMachinesByEmail(email: string)` method
- API endpoint: `/api/Machines/by-email/${email}`

### **2. src/pages/dashboards/AdminDashboard.tsx** ✅
- Added `activeLicensesCount` state
- Added `licenses: 0` to initial profileData
- Updated `loadDashboardData()` to fetch machines
- Added machine filtering by `license_activated`
- Added console logging for debugging
- Added import for `apiClient` and `Machine` type

---

## 💡 **Key Features:**

### **1. Real-Time Data** ✅
```typescript
// Fetches fresh data on every dashboard load
useEffect(() => {
  loadDashboardData()
}, [])
```

### **2. Accurate Count** ✅
```typescript
// Only counts machines where license_activated = true
const activeLicenses = machines.filter(m => m.license_activated === true).length
```

### **3. Email-Based Filtering** ✅
```typescript
// Uses user's email to fetch only their machines
const userEmail = storedUserData?.user_email || user?.email
apiClient.getMachinesByEmail(userEmail)
```

### **4. Fallback Handling** ✅
```typescript
// If API fails, shows 0 (not undefined/null)
licenses: activeLicenses || 0
```

### **5. Type Safety** ✅
```typescript
// TypeScript types ensure data integrity
const activeLicenses = machinesRes.data.filter((machine: Machine) => ...)
```

---

## 🧪 **Testing Scenarios:**

### **Test 1: User with 3 Active Licenses**
```
Input:
- User Email: john@company.com
- API returns 5 machines
- 3 have license_activated = true
- 2 have license_activated = false

Expected Output:
✅ "My Licenses" card shows: 3
✅ Console log: "Active licenses count: 3 from 5 total machines"
```

### **Test 2: User with 0 Active Licenses**
```
Input:
- User Email: newuser@company.com
- API returns 2 machines
- 0 have license_activated = true
- 2 have license_activated = false

Expected Output:
✅ "My Licenses" card shows: 0
✅ Console log: "Active licenses count: 0 from 2 total machines"
```

### **Test 3: User with No Machines**
```
Input:
- User Email: guest@company.com
- API returns empty array []

Expected Output:
✅ "My Licenses" card shows: 0
✅ Console log: "Active licenses count: 0 from 0 total machines"
```

### **Test 4: API Error**
```
Input:
- User Email: user@company.com
- API call fails (network error, 404, etc.)

Expected Output:
✅ "My Licenses" card shows: 0 (fallback)
⚠️ Console log: "Failed to fetch machines: {error}"
✅ No UI crash, graceful degradation
```

---

## 🎊 **Summary:**

**Goal:** Display active licenses count in "My Licenses" card

**Solution:**
1. ✅ Added `license_activated` field to Machine interface
2. ✅ Created `getMachinesByEmail(email)` API method
3. ✅ Integrated machines fetch in `loadDashboardData()`
4. ✅ Filter machines by `license_activated === true`
5. ✅ Update `profileData.licenses` with count
6. ✅ Display count in "My Licenses" card

**Result:**
- ✅ Real-time active licenses count
- ✅ Accurate data from API
- ✅ Email-based user filtering
- ✅ Graceful error handling
- ✅ Type-safe implementation
- ✅ Console logging for debugging

---

**Quick Test:**
```bash
# 1. Run app
npm run dev

# 2. Login as regular user

# 3. Check browser console:
📧 Fetching machines for email: user@example.com
✅ Active licenses count: 3 from 5 total machines

# 4. Check UI:
✅ "My Licenses" card shows correct count
✅ "Active licenses" subtitle visible
✅ Count updates on refresh
```

**API Endpoint Used:**
```
GET /api/Machines/by-email/{email}
```

**Field Used for Count:**
```
license_activated: boolean
```

**Display Location:**
```
Dashboard → Overview Tab → "My Licenses" Card (User Role Only)
```

🎉 **COMPLETE!** 🚀
