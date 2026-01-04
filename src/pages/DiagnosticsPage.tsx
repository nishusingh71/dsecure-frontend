import React from 'react';
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

import { ENV } from '../config/env';

const DiagnosticsPage: React.FC = () => {
  const cloudName = ENV.CLOUDINARY_CLOUD_NAME;

  const testUrls = [
    {
      name: 'Main Logo',
      url: `https://res.cloudinary.com/${cloudName}/image/upload/dsecure/logos/logo`
    },
    {
      name: 'White Logo',
      url: `https://res.cloudinary.com/${cloudName}/image/upload/dsecure/logos/logo-white`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-8">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('diagnostics')} />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Cloudinary Diagnostics</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <p><strong>VITE_CLOUDINARY_CLOUD_NAME:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{cloudName || 'NOT SET'}</code></p>
            <p><strong>Status:</strong>
              <span className={`ml-2 px-2 py-1 rounded text-sm ${cloudName ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {cloudName ? 'CONFIGURED' : 'MISSING'}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Asset Tests</h2>
          <div className="grid gap-6">
            {testUrls.map((test, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{test.name}</h3>
                <p className="text-sm text-gray-600 mb-3">URL: <code className="bg-gray-100 px-1 rounded">{test.url}</code></p>

                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={test.url}
                      alt={test.name}
                      className="w-16 h-16 object-contain border rounded"
                      onLoad={() => { }}
                      onError={() => { }}
                    />
                  </div>
                  <div>
                    <p className="text-sm">
                      If you see the image above, Cloudinary is working correctly.
                      If not, check the browser console for errors.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="font-semibold text-blue-800 mb-2">Troubleshooting</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• If environment variable is missing, set VITE_CLOUDINARY_CLOUD_NAME=dhwi5wevf in Vercel</li>
            <li>• If images don't load, check browser network tab for 404 errors</li>
            <li>• If CORS errors, verify Cloudinary settings allow your domain</li>
            <li>• Redeploy after setting environment variables</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsPage;