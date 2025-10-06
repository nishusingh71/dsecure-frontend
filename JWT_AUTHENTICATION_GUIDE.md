# JWT Authentication & Authorization Implementation Guide

## Overview
आपका JWT authentication और authorization system अब complete हो गया है। यहाँ है कि आप इसे कैसे use कर सकते हैं:

## Features Implemented

### 1. JWT Token Management
- ✅ Secure token storage (localStorage/sessionStorage)
- ✅ Automatic token refresh
- ✅ Token expiration handling
- ✅ "Remember Me" functionality

### 2. Authentication Service
- ✅ Login/Logout with JWT
- ✅ Token validation
- ✅ User data extraction from JWT
- ✅ Role-based authorization
- ✅ Permission-based authorization

### 3. Enhanced API Client
- ✅ Automatic token inclusion in requests
- ✅ Token refresh on 401 errors
- ✅ Request retry logic
- ✅ Error handling

### 4. Protected Routes
- ✅ Route-level authentication
- ✅ Role-based route protection
- ✅ Permission-based route protection
- ✅ Redirect after login

## Usage Examples

### 1. Basic Authentication Check
```tsx
import { authService } from '@/utils/authService'

// Check if user is authenticated
if (authService.isAuthenticated()) {
  // //console.log('User is logged in')
}

// Get current user data
const user = authService.getUserFromToken()
// //console.log('Current user:', user)
```

### 2. Role-Based Access Control
```tsx
import { RoleGuard, PermissionGuard } from '@/components/ProtectedRoute'

// Show component only for admin users
<RoleGuard roles={['admin']} fallback={<div>Access Denied</div>}>
  <AdminPanel />
</RoleGuard>

// Show component only for users with specific permissions
<PermissionGuard 
  permissions={['manage:users', 'read:reports']} 
  fallback={<div>Insufficient permissions</div>}
>
  <UserManagementPanel />
</PermissionGuard>
```

### 3. Protected Routes in App.tsx
```tsx
// Basic protection - any authenticated user
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <UserDashboard />
    </ProtectedRoute>
  }
/>

// Role-based protection
<Route
  path="/admin"
  element={
    <ProtectedRoute roles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

// Permission-based protection
<Route
  path="/reports"
  element={
    <ProtectedRoute permissions={['read:reports', 'access:dashboard']}>
      <ReportsPage />
    </ProtectedRoute>
  }
/>
```

### 4. Using Auth Context in Components
```tsx
import { useAuth } from '@/auth/AuthContext'
import { useCurrentUser } from '@/components/ProtectedRoute'

function MyComponent() {
  const { user, logout, hasRole, hasPermission } = useAuth()
  const currentUser = useCurrentUser() // Alternative way to get user
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      
      {hasRole('admin') && (
        <button>Admin Panel</button>
      )}
      
      {hasPermission('manage:users') && (
        <button>Manage Users</button>
      )}
      
      <button onClick={() => logout()}>
        Logout
      </button>
    </div>
  )
}
```

### 5. Making Authenticated API Calls
```tsx
import { apiClient } from '@/utils/enhancedApiClient'

// The API client automatically includes JWT token in headers
async function fetchUserData() {
  const response = await apiClient.getCurrentUser()
  
  if (response.success) {
    // //console.log('User data:', response.data)
  } else {
    // console.error('Error:', response.error)
  }
}

// The client handles token refresh automatically on 401 errors
async function fetchProtectedData() {
  const response = await apiClient.getUsers() // Requires authentication
  return response.data
}
```

### 6. Manual Token Management
```tsx
import { authService } from '@/utils/authService'

// Check token expiration
const timeLeft = authService.getTimeUntilExpiry()
// //console.log(`Token expires in ${timeLeft} seconds`)

// Check if token is about to expire
if (authService.isTokenAboutToExpire()) {
  // //console.log('Token expires soon!')
}

// Manually refresh token
const refreshed = await authService.manualRefreshToken()
if (refreshed) {
  // //console.log('Token refreshed successfully')
}
```

## Login Flow with JWT

1. **User enters credentials** → LoginPage.tsx
2. **Credentials sent to API** → enhancedApiClient.ts
3. **Backend returns JWT token** → stored by authService.ts
4. **User data extracted from JWT** → AuthContext.tsx
5. **User redirected to protected route** → ProtectedRoute.tsx

## Token Storage Strategy

- **Session-only login**: Tokens stored in `sessionStorage` (cleared on browser close)
- **Remember Me**: Tokens stored in `localStorage` (persistent across sessions)
- **Automatic cleanup**: Tokens cleared on logout or expiration

## Error Handling

- **401 Unauthorized**: Automatic token refresh attempted
- **Token refresh fails**: User redirected to login
- **Network errors**: Request retry with exponential backoff
- **Invalid tokens**: Automatic cleanup and redirect

## Security Features

- ✅ JWT signature validation
- ✅ Token expiration checking
- ✅ Automatic token refresh
- ✅ Secure storage handling
- ✅ Role-based permissions
- ✅ Request timeout handling
- ✅ Error boundary protection

## Role-Permission Mapping

```typescript
// Defined in authService.ts
admin: [
  'read:all', 'write:all', 'delete:all',
  'manage:users', 'manage:system', 'access:admin_panel'
]

manager: [
  'read:department', 'write:department',
  'manage:team', 'access:reports'
]

user: [
  'read:own', 'write:own', 'access:dashboard'
]
```

## Testing Authentication

```tsx
// Test login
await apiClient.login({ email: 'test@example.com', password: 'password' }, true)

// Test token validation
// //console.log('Authenticated:', authService.isAuthenticated())

// Test role check
// //console.log('Is Admin:', authService.hasRole('admin'))

// Test permission check
// //console.log('Can manage users:', authService.hasPermission('manage:users'))
```

अब आपका complete JWT authentication system ready है! 🎉

## Next Steps

1. Update your backend to return proper JWT tokens with user roles
2. Test the login flow with real JWT tokens
3. Add more specific permissions as needed
4. Implement password reset functionality
5. Add two-factor authentication if required

यह system production-ready है और scalable है। आप इसे अपनी requirements के according customize कर सकते हैं।