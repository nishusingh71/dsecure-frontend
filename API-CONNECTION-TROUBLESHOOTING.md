# API Connection Troubleshooting Guide

## Issue Analysis 🔍
**Error**: "Unable to connect to server. Please check your internet connection."

**Root Cause**: Network connectivity issue between frontend और backend API server.

## Updated Implementation ✅

### 🔧 **Enhanced Error Logging**
Added comprehensive debugging to identify exact connection issues:

```typescript
// API Configuration with Debugging
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.dsecuretech.com'

if (DEBUG_MODE) {
  console.log('API Configuration:', {
    baseUrl: API_BASE_URL,
    timeout: API_TIMEOUT,
    environment: import.meta.env.MODE
  })
}

// Enhanced Login Function with Detailed Logging
async login(credentials: LoginRequest, rememberMe: boolean = false) {
  try {
    const loginUrl = `${API_BASE_URL}/api/Auth/login`
    
    if (DEBUG_MODE) {
      console.log('🚀 Starting login request to:', loginUrl)
      console.log('📧 Credentials email:', credentials.email)
      console.log('🔧 API Configuration:', { API_BASE_URL, API_TIMEOUT })
    }

    const response = await axios.post(loginUrl, {
      email: credentials.email,
      password: credentials.password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: API_TIMEOUT
    })
    
    // Success handling...
    
  } catch (error: any) {
    console.error('🚨 Login API Error Details:', {
      message: error.message,
      code: error.code,
      config: error.config ? {
        url: error.config.url,
        method: error.config.method,
        timeout: error.config.timeout
      } : null,
      response: error.response ? {
        status: error.response.status,
        data: error.response.data
      } : null,
      request: error.request ? 'Request made but no response' : null
    })
    
    if (error.request) {
      // Network error - no response received
      console.error('🌐 Network Error - No response received from:', `${API_BASE_URL}/api/Auth/login`)
      
      return {
        success: false,
        error: `Unable to connect to server (${API_BASE_URL}). Please check your internet connection and server status.`
      }
    }
  }
}
```

### 🔍 **API Health Check Function**
Added API connectivity test function:

```typescript
async testConnection(): Promise<ApiResponse<any>> {
  try {
    const testUrl = `${API_BASE_URL}/api/health`
    
    console.log('🔍 Testing API connection to:', testUrl)

    const response = await axios.get(testUrl, {
      timeout: 5000,
      headers: { 'Accept': 'application/json' }
    })

    return {
      success: true,
      data: response.data,
      message: 'API connection successful'
    }
  } catch (error: any) {
    return {
      success: false,
      error: `API connection failed: ${error.message}`,
      message: 'API server is not reachable'
    }
  }
}
```

## Current Configuration 📋

### ✅ **Environment Variables** (`.env`)
```bash
# API Configuration - DSecure Tech Backend  
VITE_API_BASE_URL=https://api.dsecuretech.com
VITE_API_TIMEOUT=10000
VITE_USE_API=true
```

### ✅ **Development Server**
- **Running on**: `http://localhost:5176/`
- **Debug Mode**: Enabled (console logging active)
- **API Target**: `https://api.dsecuretech.com`

## Troubleshooting Steps 🛠️

### **Step 1: Check API Server Status**
Verify if your API server is running and accessible:

```bash
# Test API connectivity manually
curl -X GET "https://api.dsecuretech.com/api/health" \
  -H "Accept: application/json" \
  -v

# Or test login endpoint
curl -X POST "https://api.dsecuretech.com/api/Auth/login" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -d '{"email":"test@example.com","password":"test123"}' \
  -v
```

### **Step 2: Browser Console Debugging**
1. Open `http://localhost:5176/login`
2. Open Developer Tools (F12)
3. Go to Console tab
4. Try login and check for detailed error logs:
   - 🚀 API Configuration logs
   - 🌐 Network request details
   - 🚨 Error details with codes

### **Step 3: Network Tab Analysis**
1. Open Developer Tools → Network tab
2. Try login
3. Look for request to `https://api.dsecuretech.com/api/Auth/login`
4. Check:
   - **Request Status**: Failed, CORS error, Timeout, etc.
   - **Response**: Any error messages
   - **Headers**: CORS headers present or missing

### **Step 4: Common Issues & Solutions**

#### 🚫 **CORS (Cross-Origin Resource Sharing) Error**
**Symptoms**: 
- Console error: "Access to XMLHttpRequest blocked by CORS policy"
- Network tab shows CORS error

**Solution**: Configure CORS on your backend server:
```csharp
// ASP.NET Core example
app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());
```

#### 🌐 **DNS Resolution Error**
**Symptoms**: 
- Error: "getaddrinfo ENOTFOUND api.dsecuretech.com"
- DNS lookup failed

**Solution**: 
1. Check if domain exists: `nslookup api.dsecuretech.com`
2. Try with IP address instead of domain
3. Check internet connectivity

#### 🔒 **SSL/HTTPS Issues**
**Symptoms**: 
- Error: "SSL certificate problem"
- "ERR_CERT_AUTHORITY_INVALID"

**Solutions**:
1. **Development**: Use HTTP instead of HTTPS temporarily
2. **Production**: Ensure valid SSL certificate on server

#### ⏱️ **Timeout Issues**
**Symptoms**: 
- Error: "timeout of 10000ms exceeded"
- Request takes too long

**Solutions**:
1. Increase timeout in `.env`: `VITE_API_TIMEOUT=30000`
2. Optimize server response time
3. Check server load and performance

#### 🔌 **Server Not Running**
**Symptoms**: 
- Error: "connect ECONNREFUSED"
- "ERR_CONNECTION_REFUSED"

**Solution**: 
1. Ensure backend server is running on `https://api.dsecuretech.com`
2. Check server logs for startup errors
3. Verify port and domain configuration

### **Step 5: Fallback Testing**
If main API fails, test with alternative configurations:

```typescript
// Temporary local testing
const API_BASE_URL = 'http://localhost:5000'  // If you have local API

// OR test with public API testing service
const API_BASE_URL = 'https://jsonplaceholder.typicode.com'  // For connectivity test
```

## Debug Commands 🔧

### **Browser Console Commands**
```javascript
// Test API configuration
console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL)

// Test direct axios call
axios.get('https://api.dsecuretech.com/api/health')
  .then(res => console.log('✅ API Success:', res))
  .catch(err => console.error('❌ API Error:', err))

// Test API client health check
apiClient.testConnection()
  .then(res => console.log('Health Check:', res))
```

### **Network Testing Commands**
```bash
# Test API server accessibility
ping api.dsecuretech.com

# Test HTTP connectivity
curl -I https://api.dsecuretech.com

# Test with timeout
curl -X GET "https://api.dsecuretech.com/api/health" --max-time 10
```

## Expected Backend Requirements 📝

Your backend server must:

### ✅ **1. CORS Configuration**
```csharp
// Allow frontend domain
app.UseCors(policy => policy
    .WithOrigins("http://localhost:5176", "https://yourdomain.com")
    .AllowAnyMethod()
    .AllowAnyHeader());
```

### ✅ **2. Health Check Endpoint**
```csharp
// GET /api/health
[HttpGet("api/health")]
public IActionResult Health()
{
    return Ok(new { status = "healthy", timestamp = DateTime.UtcNow });
}
```

### ✅ **3. Login Endpoint**
```csharp
// POST /api/Auth/login
[HttpPost("api/Auth/login")]
public async Task<IActionResult> Login([FromBody] LoginRequest request)
{
    // Validate credentials
    // Generate JWT token
    return Ok(new 
    {
        token = "jwt_token_here",
        refreshToken = "refresh_token_here",
        user = new { id = "123", email = request.Email, role = "admin" }
    });
}
```

### ✅ **4. Error Responses**
```csharp
// 401 Unauthorized
return Unauthorized(new { message = "Invalid email or password" });

// 404 Not Found  
return NotFound(new { message = "User not found" });

// 500 Server Error
return StatusCode(500, new { message = "Internal server error" });
```

## Quick Fix Options 🚀

### **Option 1: Use Demo Login (Immediate)**
```typescript
// Use demo login to bypass API issues temporarily
// Click "Try Demo Account" button on login page
// This works offline and doesn't require backend
```

### **Option 2: Update API URL**
```bash
# If your API is running on different URL, update .env:
VITE_API_BASE_URL=https://your-actual-api-domain.com
# or
VITE_API_BASE_URL=http://localhost:3000  # For local development
```

### **Option 3: Disable API Temporarily**
```bash
# Use mock data instead of real API
VITE_USE_API=false
```

## Next Steps 📋

1. **Immediate**: Open `http://localhost:5176/login` और console check करें
2. **Debug**: Network tab में exact error messages देखें  
3. **Test**: Backend server manually test करें (curl commands)
4. **Fix**: CORS और backend availability ensure करें
5. **Verify**: API health check function use करें

**Current Server**: `http://localhost:5176/` ready for testing with enhanced debugging! 🎯