# API Integration Documentation

## Overview
This project now includes comprehensive API integration with fallback to default data. The system works in dual-mode:
- **API Mode**: When the API is available, data is fetched from the backend
- **Fallback Mode**: When the API is unavailable, the system uses default/demo data

## API Configuration

### Environment Variables
```env
VITE_API_BASE_URL=https://bitraserapiproject-2.onrender.com
VITE_API_TIMEOUT=10000
```

### API Endpoints
The system expects the following endpoints from the backend:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user info

#### Users Management
- `GET /users` - Get all users
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

#### Machines Management  
- `GET /machines` - Get all machines
- `POST /machines` - Create new machine
- `PUT /machines/:id` - Update machine
- `DELETE /machines/:id` - Delete machine

#### Reports Management
- `GET /reports` - Get all reports
- `POST /reports` - Create new report
- `PUT /reports/:id` - Update report
- `DELETE /reports/:id` - Delete report

#### Health Check
- `GET /health` - API health status

## Data Interfaces

### User Interface
```typescript
interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  department: string
  lastLogin?: string
}
```

### Machine Interface
```typescript
interface Machine {
  id: string
  hostname: string
  eraseOption: string
  license: string
  status: string
  lastSeen?: string
  department?: string
}
```

### Report Interface
```typescript
interface Report {
  id: string
  date: string
  metadata?: { deviceCount?: string }
  status: string
  department: string
  generatedBy?: string
  filePath?: string
}
```

## How It Works

### 1. API Client (`utils/api.ts`)
- Handles all HTTP requests to the backend
- Manages authentication tokens
- Provides type-safe interfaces
- Includes error handling and timeouts

### 2. Data Service (`utils/dataService.ts`)
- Provides React hooks for data fetching
- Implements automatic fallback to default data
- Handles loading states and error management
- Includes data mutation helpers

### 3. Authentication Context (`auth/AuthContext.tsx`)
- Enhanced to work with both API and local authentication
- Automatic API availability detection
- Token management and refresh capabilities
- Seamless fallback to local auth when API is unavailable

### 4. Admin Dashboard Integration
All admin dashboard pages (`AdminSubusers`, `AdminMachines`, `AdminReports`) now include:
- API status indicators showing connection status
- Automatic data fetching from API with fallback
- Refresh buttons for manual data reload
- Error handling with user-friendly messages

## Features

### API Status Indicators
Each admin page displays:
- 🟢 **API Connected**: Data is being fetched from the backend
- 🔵 **Default Data**: Using fallback data (API unavailable)
- 🟡 **Loading**: Data is being fetched
- 🔴 **API Error**: Error occurred, using fallback data

### Error Handling
- Graceful degradation when API is unavailable
- Automatic retry mechanisms
- User-friendly error messages
- No functionality loss in offline mode

### Performance Optimization
- React hooks with proper dependency management
- Memoized data transformations
- Efficient re-rendering with useMemo
- Background data refreshing

## Testing the Integration

### 1. API Test Page
Visit `/api-test` to see:
- API connection status
- Data service status for each endpoint
- Sample data from each service
- Real-time connection testing

### 2. Admin Dashboards
- Navigate to any admin dashboard
- Check the API status indicator in the top-right
- Click "Refresh" to test data fetching
- Try with API online/offline to see fallback behavior

### 3. Authentication
- Try registering/logging in to test API auth
- When API is unavailable, local auth still works
- Seamless transition between modes

## Current Status

✅ **Completed:**
- API client infrastructure
- Data service layer with hooks
- Authentication context enhancement
- Admin dashboard integration
- Environment configuration
- API status indicators
- Fallback mechanisms

🔄 **Active:**
- API endpoint: https://bitraserapiproject-2.onrender.com
- Development server: http://localhost:5174
- Real-time API status monitoring

## Next Steps

1. **Backend Verification**: Ensure all expected endpoints are implemented
2. **Data Mapping**: Verify API response formats match expected interfaces  
3. **Authentication Flow**: Test complete registration/login/logout cycle
4. **Error Scenarios**: Test various API failure scenarios
5. **Performance**: Monitor API response times and optimize if needed

## Troubleshooting

### API Not Connecting
1. Check if API endpoint is accessible
2. Verify environment variables are loaded
3. Check browser network tab for CORS issues
4. Ensure API health endpoint is working

### Data Not Loading
1. Check API status indicator on admin pages
2. Open browser console for error messages
3. Use the API test page for detailed diagnostics
4. Verify API response format matches interfaces

### Authentication Issues
1. Check if API auth endpoints are implemented
2. Verify token storage in localStorage
3. Test with both API and local auth modes
4. Check for CORS issues with authentication endpoints