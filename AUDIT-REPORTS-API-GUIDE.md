# Audit Reports API - Complete Usage Guide

## 🎯 Overview

Ab aap **Audit Reports** ko 3 tarike se fetch kar sakte ho:
1. **Email ke basis pe** - User ke saare reports
2. **Single Report ID** - Ek specific report
3. **Multiple Report IDs** - Multiple reports ek saath (parallel fetching)

---

## 📋 Available Methods

### 1. **Get Reports by Email**
```typescript
// Email se user ke saare audit reports
const result = await apiClient.getAuditReportsByEmail('user@example.com')

if (result.success && result.data) {
  console.log('User reports:', result.data)
  // result.data = AuditReport[]
}
```

**Use Case:** User ka dashboard, jahan unke saare reports dikhane hain

---

### 2. **Get Single Report by ID**
```typescript
// Single report_id se specific report
const result = await apiClient.getAuditReportById('REPORT-123')

if (result.success && result.data) {
  console.log('Single report:', result.data)
  // result.data = AuditReport (single object)
}
```

**Use Case:** Report details page, jahan ek specific report dikhani hai

---

### 3. **Get Multiple Reports by IDs**
```typescript
// Multiple report_ids se reports (parallel fetching)
const reportIds = ['REPORT-123', 'REPORT-456', 'REPORT-789']
const result = await apiClient.getAuditReportsByIds(reportIds)

if (result.success && result.data) {
  console.log('Multiple reports:', result.data)
  // result.data = AuditReport[] (array)
}
```

**Features:**
- ✅ **Automatic Optimization**: Single ID ko single endpoint use karti hai
- ✅ **Parallel Fetching**: Multiple IDs ko parallel mein fetch karti hai (fast)
- ✅ **Error Handling**: Agar koi report nahi mili, toh bhi baaki return karti hai

**Use Case:** Bulk operations, jahan multiple specific reports chahiye

---

### 4. **Flexible Method (Recommended)** ⭐
```typescript
// Email, single ID, ya multiple IDs - sabko handle karta hai
const result = await apiClient.getAuditReportsFlexible({
  email: 'user@example.com',     // Optional
  reportId: 'REPORT-123',        // Optional
  reportIds: ['REPORT-456', ...] // Optional
})

if (result.success && result.data) {
  console.log('Flexible reports:', result.data)
  // result.data = AuditReport[] (always array)
}
```

**Priority Order:**
1. `reportId` (single) - Agar diya toh yeh use hoga
2. `reportIds` (array) - Agar single nahi, toh array use hoga
3. `email` - Agar IDs nahi, toh email se fetch
4. `undefined` - Agar kuch nahi, toh ALL reports fetch

**Use Cases:**
- Search functionality jo dynamically filter kare
- Complex filtering logic
- Backward compatibility maintain karna

---

## 🚀 Real-World Examples

### Example 1: Dashboard - User's All Reports
```typescript
const DashboardReports = () => {
  const { user } = useAuth()
  const [reports, setReports] = useState<AuditReport[]>([])
  
  useEffect(() => {
    const fetchReports = async () => {
      const result = await apiClient.getAuditReportsByEmail(user.email)
      if (result.success) {
        setReports(result.data || [])
      }
    }
    fetchReports()
  }, [user.email])
  
  return (
    <div>
      <h2>My Audit Reports ({reports.length})</h2>
      {reports.map(report => (
        <ReportCard key={report.report_id} report={report} />
      ))}
    </div>
  )
}
```

---

### Example 2: Report Details Page - Single Report
```typescript
const ReportDetailsPage = ({ reportId }: { reportId: string }) => {
  const [report, setReport] = useState<AuditReport | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true)
      const result = await apiClient.getAuditReportById(reportId)
      
      if (result.success && result.data) {
        setReport(result.data)
      } else {
        console.error('Report not found:', result.error)
      }
      setLoading(false)
    }
    fetchReport()
  }, [reportId])
  
  if (loading) return <Spinner />
  if (!report) return <NotFound />
  
  return (
    <div>
      <h1>{report.report_name}</h1>
      <p>Method: {report.erasure_method}</p>
      <p>Date: {report.report_datetime}</p>
      {/* Full report details */}
    </div>
  )
}
```

---

### Example 3: Bulk Download - Multiple Reports
```typescript
const BulkDownloadReports = ({ selectedIds }: { selectedIds: string[] }) => {
  const [downloading, setDownloading] = useState(false)
  
  const handleBulkDownload = async () => {
    setDownloading(true)
    
    // Parallel fetch multiple reports
    const result = await apiClient.getAuditReportsByIds(selectedIds)
    
    if (result.success && result.data) {
      // Download each report
      for (const report of result.data) {
        await downloadReportPDF(report.filePath)
      }
      showSuccess(`Downloaded ${result.data.length} reports`)
    } else {
      showError('Failed to download reports')
    }
    
    setDownloading(false)
  }
  
  return (
    <button 
      onClick={handleBulkDownload}
      disabled={downloading || selectedIds.length === 0}
    >
      {downloading ? 'Downloading...' : `Download ${selectedIds.length} Reports`}
    </button>
  )
}
```

---

### Example 4: Search with Flexible Method
```typescript
const SearchReports = () => {
  const [searchType, setSearchType] = useState<'email' | 'ids'>('email')
  const [email, setEmail] = useState('')
  const [reportIds, setReportIds] = useState<string[]>([])
  const [results, setResults] = useState<AuditReport[]>([])
  
  const handleSearch = async () => {
    const result = await apiClient.getAuditReportsFlexible({
      email: searchType === 'email' ? email : undefined,
      reportIds: searchType === 'ids' ? reportIds : undefined
    })
    
    if (result.success && result.data) {
      setResults(result.data)
    }
  }
  
  return (
    <div>
      <select value={searchType} onChange={e => setSearchType(e.target.value as any)}>
        <option value="email">Search by Email</option>
        <option value="ids">Search by Report IDs</option>
      </select>
      
      {searchType === 'email' ? (
        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Enter email"
        />
      ) : (
        <input 
          value={reportIds.join(',')} 
          onChange={e => setReportIds(e.target.value.split(','))} 
          placeholder="REPORT-123,REPORT-456"
        />
      )}
      
      <button onClick={handleSearch}>Search</button>
      
      <div>
        <h3>Results ({results.length})</h3>
        {results.map(report => <ReportItem key={report.report_id} report={report} />)}
      </div>
    </div>
  )
}
```

---

## 🔧 API Response Structure

### AuditReport Interface
```typescript
interface AuditReport {
  id: string                    // Internal ID
  reportId: string              // Legacy field
  user_email: string            // User's email
  reportDate: string            // Report date
  reportType: string            // Report type
  status: string                // Report status
  deviceCount?: number          // Number of devices
  generatedBy?: string          // Who generated
  filePath?: string             // PDF file path
  
  // New fields from API
  report_id?: string            // Primary report ID
  report_name?: string          // Report name
  erasure_method?: string       // Erasure method used
  report_datetime?: string      // Report timestamp
}
```

---

## ⚡ Performance Tips

### 1. **Single Report** - Use dedicated endpoint
```typescript
// ✅ GOOD - Fast (single API call)
const report = await apiClient.getAuditReportById('REPORT-123')

// ❌ BAD - Slower (fetches all, then filters)
const allReports = await apiClient.getAuditReportsByEmail('user@example.com')
const report = allReports.data.find(r => r.report_id === 'REPORT-123')
```

### 2. **Multiple Reports** - Parallel fetching
```typescript
// ✅ GOOD - Parallel (fast)
const reports = await apiClient.getAuditReportsByIds(['R1', 'R2', 'R3'])

// ❌ BAD - Sequential (slow)
const r1 = await apiClient.getAuditReportById('R1')
const r2 = await apiClient.getAuditReportById('R2')
const r3 = await apiClient.getAuditReportById('R3')
```

### 3. **Caching** - Use React Query
```typescript
// hooks/useAuditReports.ts
export function useAuditReportById(reportId: string) {
  return useQuery({
    queryKey: ['auditReport', reportId],
    queryFn: () => apiClient.getAuditReportById(reportId),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    enabled: !!reportId
  })
}
```

---

## 🛡️ Error Handling

### Handling Errors Properly
```typescript
const fetchReport = async (reportId: string) => {
  try {
    const result = await apiClient.getAuditReportById(reportId)
    
    if (!result.success) {
      // API error
      showError(result.error || 'Failed to fetch report')
      return null
    }
    
    if (!result.data) {
      // No data returned
      showError('Report not found')
      return null
    }
    
    // Success
    return result.data
    
  } catch (error) {
    // Network error or exception
    console.error('Error fetching report:', error)
    showError('Network error. Please try again.')
    return null
  }
}
```

---

## 📊 Comparison Table

| Method | Input | Output | Use Case | Performance |
|--------|-------|--------|----------|-------------|
| `getAuditReportsByEmail()` | Email string | `AuditReport[]` | User dashboard | Medium (all reports) |
| `getAuditReportById()` | Report ID | `AuditReport` | Single report page | ⚡ Fast |
| `getAuditReportsByIds()` | ID array | `AuditReport[]` | Bulk operations | ⚡ Fast (parallel) |
| `getAuditReportsFlexible()` | Object params | `AuditReport[]` | Dynamic search | Varies |
| `getAuditReports()` | None | `AuditReport[]` | Admin view (all) | Slow (all data) |

---

## ✅ Best Practices

1. **Use TypeScript** - Type safety ensure karo
2. **Handle Errors** - Always error cases handle karo
3. **Loading States** - User ko feedback do
4. **Caching** - React Query use karo for automatic caching
5. **Parallel Fetching** - Multiple IDs ke liye `getAuditReportsByIds()` use karo
6. **Validation** - Empty arrays aur null values check karo

---

## 🎯 Migration Guide

### Old Code (Email Only)
```typescript
// Before
const reports = await apiClient.getAuditReportsByEmail(email)
```

### New Code (Flexible)
```typescript
// After - Backward compatible
const reports = await apiClient.getAuditReportsFlexible({ email })

// OR with report IDs
const reports = await apiClient.getAuditReportsFlexible({ 
  reportIds: ['R1', 'R2'] 
})
```

**✅ No Breaking Changes** - Purane code abhi bhi kaam karenge!

---

## 🚀 Summary

Ab aap **3 powerful ways** se Audit Reports fetch kar sakte ho:

1. ✅ **Email-based** - User ke saare reports
2. ✅ **ID-based (Single)** - Specific ek report
3. ✅ **ID-based (Multiple)** - Multiple reports parallel mein

**Sabse best:** `getAuditReportsFlexible()` - Sabko handle karta hai! 🎉

---

**Last Updated:** October 28, 2025  
**Build Status:** ✅ Successful  
**Breaking Changes:** ❌ None
