import React from 'react'
import ThemeAwareLogo from './ThemeAwareLogo'

/**
 * Logo Test Component - For testing different logo sizes and responsiveness
 * This component can be used to preview how logos look at different sizes
 */
const LogoTestComponent: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-white">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Logo Responsiveness Test</h1>
      
      {/* Size Variations */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-slate-700">Different Sizes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Extra Small */}
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Extra Small (XS)</h3>
            <ThemeAwareLogo size="xs" responsive={true} />
          </div>
          
          {/* Small */}
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Small (SM)</h3>
            <ThemeAwareLogo size="sm" responsive={true} />
          </div>
          
          {/* Medium */}
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Medium (MD) - Default</h3>
            <ThemeAwareLogo size="md" responsive={true} />
          </div>
          
          {/* Large */}
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Large (LG)</h3>
            <ThemeAwareLogo size="lg" responsive={true} />
          </div>
          
          {/* Extra Large */}
          <div className="p-4 border border-slate-200 rounded-lg">
            <h3 className="text-sm font-medium text-slate-600 mb-2">Extra Large (XL)</h3>
            <ThemeAwareLogo size="xl" responsive={true} />
          </div>
        </div>
      </div>
      
      {/* Responsive Test */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Responsive Behavior</h2>
        <p className="text-sm text-slate-600">
          Resize your browser window to see how logos adapt to different screen sizes
        </p>
        
        <div className="p-6 border border-slate-200 rounded-lg bg-slate-50">
          <h3 className="text-sm font-medium text-slate-600 mb-4">Auto-Responsive Logo</h3>
          <ThemeAwareLogo size="md" responsive={true} />
        </div>
      </div>
      
      {/* Dark Background Test */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Dark Background Test</h2>
        <div className="p-6 bg-slate-900 rounded-lg">
          <h3 className="text-sm font-medium text-white mb-4">Logo on Dark Background</h3>
          <ThemeAwareLogo size="lg" responsive={true} />
        </div>
      </div>
      
      {/* Container Responsive Test */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Container-Based Responsiveness</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Small Container */}
          <div className="p-4 border border-slate-200 rounded-lg bg-blue-50" style={{width: '200px'}}>
            <h4 className="text-xs font-medium text-slate-600 mb-2">Small Container (200px)</h4>
            <ThemeAwareLogo size="sm" responsive={true} />
          </div>
          
          {/* Medium Container */}
          <div className="p-4 border border-slate-200 rounded-lg bg-green-50" style={{width: '300px'}}>
            <h4 className="text-xs font-medium text-slate-600 mb-2">Medium Container (300px)</h4>
            <ThemeAwareLogo size="md" responsive={true} />
          </div>
          
          {/* Large Container */}
          <div className="p-4 border border-slate-200 rounded-lg bg-purple-50" style={{width: '400px'}}>
            <h4 className="text-xs font-medium text-slate-600 mb-2">Large Container (400px)</h4>
            <ThemeAwareLogo size="lg" responsive={true} />
          </div>
        </div>
      </div>
      
      {/* Mobile Preview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-700">Mobile Preview</h2>
        <div className="max-w-sm mx-auto p-4 border-2 border-slate-300 rounded-2xl bg-white shadow-lg">
          <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
            <ThemeAwareLogo size="sm" responsive={true} />
            <div className="w-6 h-6 bg-slate-300 rounded"></div>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-600">Mobile header simulation</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogoTestComponent