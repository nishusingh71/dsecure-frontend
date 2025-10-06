# API Integration Documentation

## Overview

This application now supports dual-mode operation:
1. **API Mode**: Fetches data from a backend API when available
2. **Fallback Mode**: Uses default local data when API is unavailable

## Setup Instructions

### 1. Environment Configuration

Copy `.env.example` to `.env` and configure your API endpoint:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` with your API configuration:
```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

### 2. API Endpoints Expected

The application expects the following REST API endpoints:

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration  
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user profile

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

### 3. Data Models

#### User Model
```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'manager'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  department: string
  lastLogin?: string
  createdAt?: string
  updatedAt?: string
}
```

#### Machine Model
```typescript
interface Machine {
  id: string
  name: string
  ip?: string
  status: 'online' | 'offline' | 'maintenance' | 'warning'
  location: string
  type: string
  lastPing?: string
  createdAt?: string
  updatedAt?: string
}
```

#### Report Model
```typescript
interface Report {
  id: string
  title: string
  status: 'completed' | 'pending' | 'failed' | 'running'
  department: string
  date?: string
  metadata?: Record<string, any>
  createdAt?: string
  updatedAt?: string
}
```

## How It Works

### Automatic Fallback

The application automatically detects API availability:

1. **On page load**: Attempts to connect to the API
2. **API available**: Uses live data from the API
3. **API unavailable**: Falls back to default local data
4. **Error handling**: Gracefully handles API errors

### Authentication Flow

#### With API Available:
1. User enters credentials
2. Sends request to `/auth/login`
3. Receives JWT token
4. Stores token for subsequent requests
5. All data comes from API

#### With API Unavailable:
1. User enters credentials
2. Validates against default admin credentials
3. Creates local session
4. All data comes from default local data

### Data Service Layer

The `dataService.ts` provides React hooks for data management:

- `useUsers()` - User data with API/fallback
- `useMachines()` - Machine data with API/fallback  
- `useReports()` - Report data with API/fallback

Each hook returns:
```typescript
{
  data: T[],           // Array of data items
  loading: boolean,    // Loading state
  error: string | null, // Error message if any
  isUsingApi: boolean, // Whether using API or fallback
  refetch: () => void  // Function to refresh data
}
```

## UI Indicators

Each admin dashboard page displays:
- **Green dot**: API Connected - live data
- **Blue dot**: Default Data - using fallback
- **Yellow dot**: Loading - fetching data
- **Red message**: API Error - with error details

## Default Data

When API is unavailable, the application shows realistic default data:

### Default Users
- Admin accounts with various roles
- Different departments (IT, HR, Finance, Operations)
- Various user statuses

### Default Machines  
- Different machine types and locations
- Various operational statuses
- Realistic naming conventions

### Default Reports
- Sample audit reports with different statuses
- Device count and department information
- Date-based filtering examples

## Development

### Testing API Integration

1. **Start with API available**:
   ```bash
   # Start your backend API on port 3001
   npm run dev
   ```

2. **Test fallback mode**:
   ```bash
   # Stop your backend API or change VITE_API_BASE_URL to invalid URL
   npm run dev
   ```

### Adding New Endpoints

1. Add new interfaces to `utils/api.ts`
2. Add new methods to `ApiClient` class
3. Create new hooks in `utils/dataService.ts`
4. Add default data for fallback mode

## Production Deployment

1. Set `VITE_API_BASE_URL` to your production API endpoint
2. Ensure API endpoints return data in expected format
3. Configure proper CORS settings on your API
4. Set up proper authentication flow

## Security Considerations

- JWT tokens are stored in localStorage
- Automatic token refresh on API requests
- Secure logout clears all stored tokens
- API requests include Authorization headers
- Fallback mode uses minimal local validation

## Troubleshooting

### Common Issues

1. **API not connecting**: Check VITE_API_BASE_URL in .env file
2. **CORS errors**: Configure your API to allow frontend domain
3. **Authentication failing**: Verify JWT token format and expiration
4. **Data not updating**: Check API endpoint response format

### Debug Mode

Enable debug logging by checking browser console for:
- API request/response logs
- Authentication state changes
- Data fetching status
- Error messages

## Future Enhancements

Potential improvements:
- Real-time data updates via WebSockets
- Offline data synchronization
- Enhanced caching strategies
- Progressive Web App features
- Push notifications for admin alerts