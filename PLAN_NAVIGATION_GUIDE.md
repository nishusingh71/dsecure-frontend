# Plan Navigation Implementation Guide

## Overview
This implementation allows users to click plan buttons on the Product page and automatically have that plan selected when they reach the Pricing page.

## How it Works

### 1. **Product Page (Sending Parameters)**
When users click plan buttons on the Product page, they navigate with URL parameters:

```typescript
// Current Link approach (already working):
<Link
  to={`/pricing-and-plan?plan=${plan.name.toLowerCase()}&product=file-eraser&section=file-eraser`}
  className="plan-button"
>
  {plan.name} Plan
</Link>

// Alternative programmatic approach (optional):
const handlePlanClick = (planName: string) => {
  const queryParams = new URLSearchParams({
    plan: planName.toLowerCase(),
    product: 'file-eraser', 
    section: 'file-eraser'
  });
  navigate(`/pricing-and-plan?${queryParams.toString()}`);
};
```

### 2. **Pricing Page (Reading Parameters)**
The Pricing page automatically reads URL parameters on load:

```typescript
// Added useLocation hook
const location = useLocation();

// Added useEffect to read URL parameters
useEffect(() => {
  const searchParams = new URLSearchParams(location.search);
  
  // Read plan parameter and map to internal plan ID
  const planFromUrl = searchParams.get('plan');
  if (planFromUrl) {
    const planMapping = {
      'base': 'basic',
      'standard': 'standard', 
      'cloud': 'cloud',
      'network': 'network',
      'pro': 'pro',
      'enterprise': 'enterprise'
    };
    
    const mappedPlan = planMapping[planFromUrl.toLowerCase()];
    if (mappedPlan) {
      setSelectedPlan(mappedPlan);
    }
  }
  
  // Read product parameter
  const productFromUrl = searchParams.get('product');
  if (productFromUrl) {
    setSelectedCategory(productFromUrl);
  }
}, [location.search]);
```

## URL Parameter Examples

### From Product Page Plan Buttons:
- **Base Plan**: `/pricing-and-plan?plan=base&product=file-eraser&section=file-eraser`
- **Standard Plan**: `/pricing-and-plan?plan=standard&product=file-eraser&section=file-eraser`
- **Cloud Plan**: `/pricing-and-plan?plan=cloud&product=file-eraser&section=file-eraser`
- **Network Plan**: `/pricing-and-plan?plan=network&product=file-eraser&section=file-eraser`
- **Pro Plan**: `/pricing-and-plan?plan=pro&product=file-eraser&section=file-eraser`
- **Enterprise Plan**: `/pricing-and-plan?plan=enterprise&product=file-eraser&section=file-eraser`

## Features

✅ **Automatic Plan Selection**: Plan dropdown automatically selects the correct plan
✅ **Product Category Selection**: Automatically switches to File Eraser if specified
✅ **URL Persistence**: Users can bookmark specific plan configurations
✅ **Fallback Behavior**: If invalid parameters, falls back to default selections
✅ **Case Insensitive**: Plan names are converted to lowercase for consistency

## Testing

1. Go to Product page
2. Click any plan button in the "File Eraser – Features & Plans" section
3. Verify you're redirected to Pricing page with correct plan pre-selected
4. Check that the product category is set to "File Eraser"

## Plan Mapping

The system maps URL plan names to internal plan IDs:

| URL Parameter | Internal Plan ID | Display Name |
|---------------|------------------|--------------|
| `base`        | `basic`          | Basic Plan   |
| `standard`    | `standard`       | Standard Plan|
| `cloud`       | `cloud`          | Cloud Plan   |
| `network`     | `network`        | Network Plan |
| `pro`         | `pro`            | Pro Plan     |
| `enterprise`  | `enterprise`     | Enterprise Plan |

This implementation provides a seamless user experience where plan selection flows naturally from the Product page to the Pricing page.