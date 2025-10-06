import React, { useState, useEffect } from 'react'

/**
 * Responsive Breakpoint Test Component
 * This component shows current breakpoint and allows testing across all responsive sizes
 */
const ResponsiveTestComponent: React.FC = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    breakpoint: ''
  })

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      let breakpoint = ''
      if (width >= 1536) breakpoint = 'xxl (1536px+)'
      else if (width >= 1280) breakpoint = 'xl (1280px+)'
      else if (width >= 1024) breakpoint = 'lg (1024px+)'
      else if (width >= 768) breakpoint = 'md (768px+)'
      else if (width >= 640) breakpoint = 'sm (640px+)'
      else if (width >= 475) breakpoint = 'xs (475px+)'
      else breakpoint = 'base (<475px)'

      setScreenSize({ width, height, breakpoint })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  const breakpoints = [
    { name: 'base', size: '<475px', description: 'Extra small phones' },
    { name: 'xs', size: '475px+', description: 'Large phones' },
    { name: 'sm', size: '640px+', description: 'Small tablets' },
    { name: 'md', size: '768px+', description: 'Tablets & small laptops' },
    { name: 'lg', size: '1024px+', description: 'Laptops & desktops' },
    { name: 'xl', size: '1280px+', description: 'Large desktops' },
    { name: 'xxl', size: '1536px+', description: 'Extra large desktops' }
  ]

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border border-slate-200 rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="font-bold text-slate-900 mb-3">Responsive Test Panel</h3>
      
      {/* Current Screen Info */}
      <div className="bg-slate-50 rounded-lg p-3 mb-4">
        <div className="text-sm text-slate-600">Current Screen:</div>
        <div className="font-mono text-lg font-bold text-slate-900">
          {screenSize.width} × {screenSize.height}
        </div>
        <div className="text-sm font-semibold text-brand">
          {screenSize.breakpoint}
        </div>
      </div>

      {/* Breakpoint Reference */}
      <div className="space-y-2">
        <div className="text-sm font-semibold text-slate-700 mb-2">Breakpoints:</div>
        {breakpoints.map((bp) => (
          <div 
            key={bp.name}
            className={`text-xs p-2 rounded ${
              screenSize.breakpoint.includes(bp.name) 
                ? 'bg-brand text-white' 
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <div className="font-mono font-bold">{bp.name}: {bp.size}</div>
            <div className="opacity-75">{bp.description}</div>
          </div>
        ))}
      </div>

      {/* Component Testing */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="text-sm font-semibold text-slate-700 mb-3">Component Tests:</div>
        
        {/* Typography Test */}
        <div className="mb-3">
          <div className="text-xs text-slate-500 mb-1">Responsive Typography:</div>
          <div className="text-responsive-base font-semibold">Sample Text</div>
        </div>

        {/* Spacing Test */}
        <div className="mb-3">
          <div className="text-xs text-slate-500 mb-1">Responsive Spacing:</div>
          <div className="spacing-responsive-sm bg-slate-200 rounded">Padded Area</div>
        </div>

        {/* Button Test */}
        <div className="mb-3">
          <div className="text-xs text-slate-500 mb-1">Responsive Button:</div>
          <button className="btn-responsive bg-brand text-white rounded-lg">
            Test Button
          </button>
        </div>

        {/* Grid Test */}
        <div className="mb-3">
          <div className="text-xs text-slate-500 mb-1">Responsive Grid:</div>
          <div className="grid-responsive-1">
            <div className="bg-slate-200 rounded p-2 text-xs">Item 1</div>
            <div className="bg-slate-200 rounded p-2 text-xs">Item 2</div>
            <div className="bg-slate-200 rounded p-2 text-xs">Item 3</div>
            <div className="bg-slate-200 rounded p-2 text-xs">Item 4</div>
          </div>
        </div>

        {/* Visibility Test */}
        <div className="space-y-1">
          <div className="text-xs text-slate-500">Visibility Tests:</div>
          <div className="show-xs bg-red-100 text-red-800 text-xs p-1 rounded">XS Only</div>
          <div className="show-sm bg-blue-100 text-blue-800 text-xs p-1 rounded">SM Only</div>
          <div className="show-md bg-green-100 text-green-800 text-xs p-1 rounded">MD Only</div>
          <div className="show-lg bg-yellow-100 text-yellow-800 text-xs p-1 rounded">LG Only</div>
          <div className="show-xl bg-purple-100 text-purple-800 text-xs p-1 rounded">XL Only</div>
          <div className="show-xxl bg-pink-100 text-pink-800 text-xs p-1 rounded">XXL Only</div>
        </div>
      </div>

      {/* Device Simulation */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 mb-2">Quick Device Tests:</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button 
            onClick={() => window.resizeTo(375, 667)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
          >
            📱 iPhone SE<br/>375×667
          </button>
          <button 
            onClick={() => window.resizeTo(768, 1024)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
          >
            📟 iPad<br/>768×1024
          </button>
          <button 
            onClick={() => window.resizeTo(1024, 768)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
          >
            💻 Laptop<br/>1024×768
          </button>
          <button 
            onClick={() => window.resizeTo(1920, 1080)}
            className="p-2 bg-slate-100 hover:bg-slate-200 rounded text-slate-700"
          >
            🖥️ Desktop<br/>1920×1080
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveTestComponent