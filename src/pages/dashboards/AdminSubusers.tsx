import { useMemo, useState, useEffect } from 'react'
import { exportToCsv, openPrintView } from '@/utils/csv'
import { useUsers, dataService } from '@/utils/dataService'
import { User } from '@/utils/api'
import { SkeletonTable, SkeletonCard, SkeletonStats } from '@/components/Skeleton'
import Head from 'next/head'

export default function AdminSubusers() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [roleFilter, setRoleFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [showUniqueOnly, setShowUniqueOnly] = useState(false)
  const [sortBy, setSortBy] = useState('email')
  const [sortOrder, setSortOrder] = useState('asc')
  const pageSize = 5
  
  // Use API data with fallback to default data
  const { data: allRows, loading, error, isUsingApi, refetch } = useUsers()
  
  // Transform User data to match the expected format
  const transformedRows = useMemo(() => {
    return allRows.map(user => ({
      email: user.email,
      role: user.role,
      status: user.status,
      department: user.department,
      lastLogin: user.lastLogin || 'Never',
      id: user.id,
      name: user.name,
    }))
  }, [allRows])
  
  const uniqueRoles = useMemo(() => [...new Set(transformedRows.map(r => r.role))], [transformedRows])
  const uniqueStatuses = useMemo(() => [...new Set(transformedRows.map(r => r.status))], [transformedRows])
  const uniqueDepartments = useMemo(() => [...new Set(transformedRows.map(r => r.department))], [transformedRows])
  
  const filtered = useMemo(() => {
    let result = transformedRows.filter(r => {
      const matchesQuery = r.email.toLowerCase().includes(query.toLowerCase()) ||
                          r.department.toLowerCase().includes(query.toLowerCase())
      const matchesRole = !roleFilter || r.role === roleFilter
      const matchesStatus = !statusFilter || r.status === statusFilter
      const matchesDepartment = !departmentFilter || r.department === departmentFilter
      return matchesQuery && matchesRole && matchesStatus && matchesDepartment
    })
    
    // Remove duplicates if requested
    if (showUniqueOnly) {
      const seen = new Set()
      result = result.filter(r => {
        const key = `${r.email}-${r.role}-${r.department}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
    }
    
    // Sort results
    result.sort((a, b) => {
      const aVal = a[sortBy as keyof typeof a]
      const bVal = b[sortBy as keyof typeof b]
      const comparison = aVal.localeCompare(bVal)
      return sortOrder === 'asc' ? comparison : -comparison
    })
    
    return result
  }, [transformedRows, query, roleFilter, statusFilter, departmentFilter, showUniqueOnly, sortBy, sortOrder])
  
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((page-1)*pageSize, page*pageSize)
  
  const clearAllFilters = () => {
    setQuery('')
    setRoleFilter('')
    setStatusFilter('')
    setDepartmentFilter('')
    setShowUniqueOnly(false)
    setPage(1)
  }
  
  return (
    <>
    <Head>
      <link rel="canonical" href="https://dsecuretech.com/admin/subusers" />
              <title>DSecureTech Compliance | Data Erasure Standards & Regulations</title>
              <meta
                name="description"
                content="DSecureTech helps businesses meet global data sanitization standards like NIST, ISO 27001, GDPR, HIPAA, PCI DSS, and SOX with verifiable compliance solutions."
              />
              <meta
                name="keywords"
                content="data erasure compliance, NIST 800-88, ISO 27001, GDPR, HIPAA, SOX, PCI DSS, enterprise data destruction, B2B data security"
              />
              <meta name="robots" content="index, follow" />
            </Head>
    <div className="space-y-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Manage Subusers</h1>
        {/* <div className="flex items-center space-x-4">
          
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
            loading ? 'bg-yellow-100 text-yellow-800' :
            isUsingApi ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              loading ? 'bg-yellow-500' :
              isUsingApi ? 'bg-green-500' : 'bg-blue-500'
            }`}></div>
            <span>
              {loading ? 'Loading...' : 
               isUsingApi ? 'Live Backend Data' : 'Demo Data (AI Generated)'}
            </span>
          </div>
          {error && (
            <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              API Unavailable: Showing AI demo data
            </div>
          )}
          <button 
            onClick={refetch}
            className="text-xs text-slate-600 hover:text-slate-800 bg-white px-3 py-1 rounded border"
          >
            Refresh
          </button>
        </div> */}
      </div>
      
     
      {/* {!loading && !isUsingApi && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-blue-800">Demo Mode Active</h3>
              <p className="mt-1 text-sm text-blue-700">
                You're viewing AI-generated demo data for demonstration purposes. 
                Connect to your backend API to see real user data from your database.
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* Advanced Filters */}
      {loading ? (
        <SkeletonCard hasHeader={true} contentLines={4} className="p-4" />
      ) : (
        <div className="card p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Filters & Search</h3>
            <button 
              onClick={clearAllFilters}
              className="text-sm text-red-600 hover:text-red-800 font-medium"
            >
              Clear All
            </button>
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Search</label>
            <input 
              className="w-full border rounded px-3 py-2 text-sm" 
              placeholder="Search email, department" 
              value={query} 
              onChange={(e)=>{setQuery(e.target.value); setPage(1)}} 
            />
          </div>
          
          {/* Role Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={roleFilter}
              onChange={(e)=>{setRoleFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Roles</option>
              {uniqueRoles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e)=>{setStatusFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Statuses</option>
              {uniqueStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
            <select 
              className="w-full border rounded px-3 py-2 text-sm"
              value={departmentFilter}
              onChange={(e)=>{setDepartmentFilter(e.target.value); setPage(1)}}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="uniqueOnly" 
              checked={showUniqueOnly}
              onChange={(e)=>{setShowUniqueOnly(e.target.checked); setPage(1)}}
              className="rounded"
            />
            <label htmlFor="uniqueOnly" className="text-sm font-medium text-slate-700">
              Show unique records only
            </label>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-slate-700">Sort by:</label>
            <select 
              className="border rounded px-2 py-1 text-sm"
              value={sortBy}
              onChange={(e)=>setSortBy(e.target.value)}
            >
              <option value="email">Email</option>
              <option value="role">Role</option>
              <option value="status">Status</option>
              <option value="department">Department</option>
              <option value="lastLogin">Last Login</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-2 py-1 border rounded text-sm hover:bg-slate-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
          
          <div className="text-sm text-slate-600">
            Showing {filtered.length} of {transformedRows.length} users
          </div>
        </div>
      </div>
      )}

      {/* Export Actions */}
      {loading ? null : (
        <div className="flex justify-end gap-2">
          <button className="btn-secondary" onClick={()=>exportToCsv('subusers.csv', filtered)}>Export All ({filtered.length})</button>
          <button className="btn-secondary" onClick={()=>exportToCsv('subusers-page.csv', rows)}>Export Page ({rows.length})</button>
          <button className="btn-secondary" onClick={()=>{
            const body = `<h1>Subusers Management</h1>` +
              `<table border="1" style="border-collapse: collapse; width: 100%;"><thead><tr><th>Email</th><th>Role</th><th>Status</th><th>Department</th><th>Last Login</th></tr></thead><tbody>`+
              filtered.map(u=>`<tr><td>${u.email}</td><td>${u.role}</td><td>${u.status}</td><td>${u.department}</td><td>${u.lastLogin}</td></tr>`).join('')+
              `</tbody></table>`
            openPrintView('Subusers Management', body)
          }}>Print All ({filtered.length})</button>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <SkeletonTable rows={5} columns={6} hasHeader={true} />
      ) : (
        <div className="card-content card-table card">
        <table className="w-full text-nowrap">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Status</th>
              <th className="py-2">Department</th>
              <th className="py-2">Last Login</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((user, i) => (
              <tr key={`${user.email}-${i}`} className="border-t hover:bg-slate-50">
                <td className="py-2 font-medium">{user.email}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                    user.role === 'manager' ? 'bg-blue-100 text-blue-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' :
                    user.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      user.status === 'active' ? 'bg-green-400' :
                      user.status === 'inactive' ? 'bg-red-400' :
                      user.status === 'pending' ? 'bg-yellow-400' :
                      'bg-gray-400'
                    }`}></span>
                    {user.status}
                  </span>
                </td>
                <td className="py-2">{user.department}</td>
                <td className="py-2 text-slate-600">{user.lastLogin}</td>
                <td className="py-2">
                  <div className="flex gap-1">
                    <button className="btn-secondary text-xs">Edit</button>
                    <button className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button 
              disabled={page <= 1} 
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Previous
            </button>
            <button 
              disabled={page >= totalPages} 
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      )}
    </div>
    </>
  )
}


