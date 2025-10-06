interface ApiStatusProps {
  loading: boolean
  isUsingApi: boolean
  error: string | null
  onRefresh: () => void
}

export default function ApiStatus({ loading, isUsingApi, error, onRefresh }: ApiStatusProps) {
  return (
    <div className="flex items-center space-x-4">
      {/* API Status Indicator */}
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
           isUsingApi ? 'API Connected' : 'Default Data'}
        </span>
      </div>
      
      {error && (
        <div className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
          API Error: Using fallback data
        </div>
      )}
      
      <button 
        onClick={onRefresh}
        className="text-xs text-slate-600 hover:text-slate-800 bg-white px-3 py-1 rounded border hover:bg-slate-50 transition-colors"
      >
        Refresh
      </button>
    </div>
  )
}
