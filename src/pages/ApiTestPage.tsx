import { useState, useEffect } from 'react'
import { checkApiAvailability } from '@/utils/api'
import { useUsers, useMachines, useReports } from '@/utils/dataService'
import { Helmet } from 'react-helmet-async'

export default function ApiTestPage() {
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null)
  const [testing, setTesting] = useState(false)
  
  const { data: users, loading: usersLoading, error: usersError, isUsingApi: usersUsingApi } = useUsers()
  const { data: machines, loading: machinesLoading, error: machinesError, isUsingApi: machinesUsingApi } = useMachines()
  const { data: reports, loading: reportsLoading, error: reportsError, isUsingApi: reportsUsingApi } = useReports()

  const testApiConnection = async () => {
    setTesting(true)
    try {
      const available = await checkApiAvailability()
      setApiAvailable(available)
    } catch (error) {
      console.error('API test failed:', error)
      setApiAvailable(false)
    }
    setTesting(false)
  }

  useEffect(() => {
    testApiConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-6">
      <Helmet>
        <title>API Integration Test | DSecure Tech - Development Tools</title>
        <meta name="description" content="DSecure Tech API integration testing page for developers and system administrators." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">API Integration Test</h1>
        
        {/* API Connection Status */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-4">API Connection Status</h2>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${
              testing ? 'bg-yellow-100 text-yellow-800' :
              apiAvailable === true ? 'bg-green-100 text-green-800' :
              apiAvailable === false ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                testing ? 'bg-yellow-500' :
                apiAvailable === true ? 'bg-green-500' :
                apiAvailable === false ? 'bg-red-500' :
                'bg-gray-500'
              }`}></div>
              <span>
                {testing ? 'Testing...' :
                 apiAvailable === true ? 'API Connected' :
                 apiAvailable === false ? 'API Unavailable' :
                 'Unknown'}
              </span>
            </div>
            <button 
              onClick={testApiConnection}
              disabled={testing}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              Test Connection
            </button>
          </div>
          
          <div className="mt-4 text-sm text-slate-600">
            API Endpoint: {import.meta.env.VITE_API_BASE_URL || 'https://bitraserapiproject-2.onrender.com'}
          </div>
        </div>

        {/* Data Services Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Users */}
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Users Service</h3>
            <div className="space-y-2 text-sm">
              <div className={`flex items-center space-x-2 ${usersLoading ? 'text-yellow-600' : usersUsingApi ? 'text-green-600' : 'text-blue-600'}`}>
                <div className={`w-2 h-2 rounded-full ${usersLoading ? 'bg-yellow-500' : usersUsingApi ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span>{usersLoading ? 'Loading...' : usersUsingApi ? 'Live Backend Data' : 'AI Demo Data'}</span>
              </div>
              <div>Count: {users.length}</div>
              {usersError && <div className="text-red-600 text-xs">Error: {usersError}</div>}
            </div>
          </div>

          {/* Machines */}
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Machines Service</h3>
            <div className="space-y-2 text-sm">
              <div className={`flex items-center space-x-2 ${machinesLoading ? 'text-yellow-600' : machinesUsingApi ? 'text-green-600' : 'text-blue-600'}`}>
                <div className={`w-2 h-2 rounded-full ${machinesLoading ? 'bg-yellow-500' : machinesUsingApi ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span>{machinesLoading ? 'Loading...' : machinesUsingApi ? 'Live Backend Data' : 'AI Demo Data'}</span>
              </div>
              <div>Count: {machines.length}</div>
              {machinesError && <div className="text-red-600 text-xs">Error: {machinesError}</div>}
            </div>
          </div>

          {/* Reports */}
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Reports Service</h3>
            <div className="space-y-2 text-sm">
              <div className={`flex items-center space-x-2 ${reportsLoading ? 'text-yellow-600' : reportsUsingApi ? 'text-green-600' : 'text-blue-600'}`}>
                <div className={`w-2 h-2 rounded-full ${reportsLoading ? 'bg-yellow-500' : reportsUsingApi ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <span>{reportsLoading ? 'Loading...' : reportsUsingApi ? 'Live Backend Data' : 'AI Demo Data'}</span>
              </div>
              <div>Count: {reports.length}</div>
              {reportsError && <div className="text-red-600 text-xs">Error: {reportsError}</div>}
            </div>
          </div>
        </div>

        {/* Sample Data Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Users Sample */}
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Users Sample</h3>
            <div className="space-y-2 text-xs">
              {users.slice(0, 3).map((user, idx) => (
                <div key={idx} className="p-2 bg-slate-50 rounded">
                  <div className="font-medium">{user.email}</div>
                  <div className="text-slate-600">{user.role} - {user.department}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Machines Sample */}
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Machines Sample</h3>
            <div className="space-y-2 text-xs">
              {machines.slice(0, 3).map((machine, idx) => (
                <div key={idx} className="p-2 bg-slate-50 rounded">
                  <div className="font-medium">{machine.hostname}</div>
                  <div className="text-slate-600">{machine.status} - {machine.license}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Reports Sample */}
          <div className="card p-4">
            <h3 className="font-semibold mb-3">Reports Sample</h3>
            <div className="space-y-2 text-xs">
              {reports.slice(0, 3).map((report, idx) => (
                <div key={idx} className="p-2 bg-slate-50 rounded">
                  <div className="font-medium">{report.id}</div>
                  <div className="text-slate-600">{report.status} - {report.department}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
