# Vercel Deployment - API Connection Issue Fix

## Problem
When accessing the app deployed on Vercel, users are getting:
```
Unable to connect to server. Please check your internet connection.
```

## Root Causes

### 1. **CORS (Cross-Origin Resource Sharing) Issue** - MOST LIKELY
Your backend API at `https://api.dsecuretech.com` needs to allow requests from your Vercel domain.

**Backend Fix Required:**
Add the following CORS headers on your backend API:

```csharp
// In your ASP.NET Core Startup.cs or Program.cs

services.AddCors(options =>
{
    options.AddPolicy("AllowVercelApp",
        builder =>
        {
            builder
                .WithOrigins(
                    "http://localhost:5173",           // Local development
                    "http://localhost:3000",           // Alternative local
                    "https://your-vercel-app.vercel.app", // Replace with your Vercel URL
                    "https://dsecuretech.com",         // Your production domain
                    "https://www.dsecuretech.com"      // With www
                )
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        });
});

// Then in the Configure method or app builder:
app.UseCors("AllowVercelApp");
```

### 2. **Backend Server Down**
Check if your API server `https://api.dsecuretech.com` is running:
- Visit https://api.dsecuretech.com/health (or any test endpoint)
- Check server logs
- Verify SSL certificate is valid

### 3. **API Base URL Configuration**
Ensure your `.env` file has correct API URL:
```env
VITE_API_BASE_URL=https://api.dsecuretech.com
```

## Frontend Changes Made

### 1. Updated `credentials` setting
Changed from `'omit'` to `'include'` in `enhancedApiClient.ts` for better CORS handling with cookies/credentials.

### 2. Improved error messages
Better error messages that show:
- Which API server it's trying to connect to
- Specific CORS error messages
- Network timeout details

## Testing Steps

### Local Testing
1. Run backend locally: `dotnet run`
2. Run frontend: `npm run dev`
3. Test login/registration

### Vercel Testing
1. Deploy to Vercel: `npm run build && vercel --prod`
2. Get your Vercel URL (e.g., `https://your-app.vercel.app`)
3. Add this URL to backend CORS configuration
4. Restart backend server
5. Test login on Vercel URL

## Quick Test Backend CORS

Use this command to test if CORS is configured:
```bash
curl -H "Origin: https://your-vercel-app.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://api.dsecuretech.com/api/RoleBasedAuth/login -v
```

Look for these headers in response:
- `Access-Control-Allow-Origin: https://your-vercel-app.vercel.app`
- `Access-Control-Allow-Methods: POST, GET, OPTIONS, ...`
- `Access-Control-Allow-Credentials: true`

## Environment Variables on Vercel

Make sure these are set in Vercel Dashboard → Settings → Environment Variables:
```
VITE_API_BASE_URL=https://api.dsecuretech.com
VITE_API_TIMEOUT=10000
VITE_USE_API=true
```

## Rebuild Frontend
After setting environment variables on Vercel:
1. Go to Vercel Dashboard
2. Click "Deployments"
3. Click "Redeploy" on latest deployment
4. Or push new commit to trigger rebuild

## Alternative: Use Vercel Serverless Functions as Proxy

If you can't modify backend CORS, create API proxy:

`/api/proxy.js` (Vercel Serverless Function):
```javascript
export default async function handler(req, res) {
  const apiUrl = 'https://api.dsecuretech.com' + req.url.replace('/api/proxy', '');
  
  const response = await fetch(apiUrl, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      ...req.headers,
    },
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
```

Then update `.env`:
```
VITE_API_BASE_URL=/api/proxy
```

## Contact Backend Team

Send this message to your backend developer:
```
Hi,

Our frontend app deployed on Vercel (https://your-app.vercel.app) 
is getting CORS errors when trying to connect to the API.

Can you please add this origin to the CORS whitelist in the backend:
- https://your-app.vercel.app
- https://dsecuretech.com (if that's the production domain)

Also ensure these headers are set:
- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers
- Access-Control-Allow-Credentials

Thanks!
```

## Verification

After backend CORS is fixed, test:
1. Open browser console (F12)
2. Go to Network tab
3. Try to login
4. Check request headers - should see CORS headers in response
5. Should NOT see CORS error in console

## Support

If issue persists after backend CORS fix:
- Check browser console for exact error
- Check Network tab for failed requests
- Verify API server is accessible: `curl https://api.dsecuretech.com/health`
- Test from different network/device
