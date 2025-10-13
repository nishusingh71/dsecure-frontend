import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('cookie-policy')} />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-medium text-orange-600 dark:text-orange-400">D-Secure</span>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Cookie Policy
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              How we use cookies and tracking technologies on our website
            </p>
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-12">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  1. Use of Cookies
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed">
                    Cookies are small text files that are placed on your computer by websites you visit. 
                    They are widely used to make websites work more efficiently and to provide web services 
                    and functionalities for users.
                  </p>
                  <p className="leading-relaxed">
                    Cookies may be either <strong className="text-slate-900 dark:text-white">persistent</strong> or <strong className="text-slate-900 dark:text-white">session</strong> cookies. 
                    Persistent cookies remain valid until their expiry date (unless deleted earlier), 
                    while session cookies expire when you close your browser.
                  </p>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  2. Site Cookies
                </h2>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p className="leading-relaxed mb-6">The following cookies are used on this site:</p>
                  
                  {/* Modern Table Design */}
                  <div className="overflow-x-auto">
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-600">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-600">
                            <th className="text-left p-4 font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 first:rounded-tl-lg">
                              Cookie Source
                            </th>
                            <th className="text-left p-4 font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700">
                              Name
                            </th>
                            <th className="text-left p-4 font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700">
                              Function
                            </th>
                            <th className="text-left p-4 font-semibold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 last:rounded-tr-lg">
                              Expiry Date
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="p-4 text-slate-700 dark:text-slate-300">DSecure.com</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">session_id</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">Maintains user session</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">Session</td>
                          </tr>
                          <tr className="border-b border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="p-4 text-slate-700 dark:text-slate-300">DSecure.com</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">preferences</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">Stores user preferences</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">1 year</td>
                          </tr>
                          <tr className="border-b border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="p-4 text-slate-700 dark:text-slate-300">Google Analytics</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">_ga</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">Website analytics</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">2 years</td>
                          </tr>
                          <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                            <td className="p-4 text-slate-700 dark:text-slate-300">Google Analytics</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">_gid</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">Website analytics</td>
                            <td className="p-4 text-slate-700 dark:text-slate-300">24 hours</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  3. Types of Cookies We Use
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">Essential Cookies</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      These cookies are necessary for the website to function and cannot be switched off in our systems.
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-3">Analytics Cookies</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      These cookies help us understand how visitors interact with our website by collecting anonymous information.
                    </p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-3">Functional Cookies</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                    </p>
                  </div>
                  <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-300 mb-3">Marketing Cookies</h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      These cookies track visitors across websites to display relevant and engaging advertisements.
                    </p>
                  </div>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  4. Managing Your Cookie Preferences
                </h2>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    You can control and manage cookies in various ways:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-slate-700 dark:text-slate-300">
                    <li>Through your browser settings</li>
                    <li>Using our cookie consent banner</li>
                    <li>By opting out of specific cookie categories</li>
                    <li>Through third-party opt-out tools</li>
                  </ul>
                </div>
              </section>

              <section className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-600">
                  5. Contact Us
                </h2>
                <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                    If you have any questions about our use of cookies, please contact us:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a href="mailto:privacy@dsecuretech.com" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold">
                        privacy@dsecuretech.com
                      </a>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">
                        205, Skipper Corner, 88, Nehru Place, New Delhi - 110019, India
                      </span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage;