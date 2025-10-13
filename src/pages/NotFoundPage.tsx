import React from "react";
import SEOHead from '../components/SEOHead';
import { getSEOForPage } from '../utils/seo';
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";

const NotFoundPage: React.FC = () => {
  return (
    <>
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage('not-found')} />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <div className="mb-8">
              {/* Animated 404 Icon */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <svg 
                    className="w-16 h-16 text-white animate-pulse" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                </div>
                
                {/* Floating particles animation */}
                <div className="absolute -top-4 -left-4 w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="absolute -top-2 -right-6 w-2 h-2 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute -bottom-3 -left-6 w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                <div className="absolute -bottom-2 -right-4 w-3 h-3 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '0.6s' }}></div>
              </div>

              {/* 404 Text */}
              <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4 leading-none">
                404
              </div>
              
              {/* Main Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Page Not Found
              </h1>
              
              <p className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed max-w-md mx-auto">
                Sorry, the page you're looking for doesn't exist or has been moved. 
                Let's get you back to exploring our secure data solutions.
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={200}>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-emerald-100 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">What can you do?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl border border-emerald-200">
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-emerald-900 mb-2">Go Back</h3>
                  <p className="text-emerald-700 text-sm">Return to the previous page using your browser's back button</p>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200">
                  <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-teal-900 mb-2">Search</h3>
                  <p className="text-teal-700 text-sm">Use our search functionality to find what you're looking for</p>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-xl border border-cyan-200">
                  <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-cyan-900 mb-2">Get Help</h3>
                  <p className="text-cyan-700 text-sm">Contact our support team if you need assistance</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-3 mx-auto">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-purple-900 mb-2">Browse</h3>
                  <p className="text-purple-700 text-sm">Explore our services and solutions below</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={400}>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                to="/"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Back to Home
              </Link>
              
              <Link
                to="/contact"
                className="bg-white text-slate-700 px-8 py-4 rounded-xl font-semibold border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Support
              </Link>
            </div>
          </Reveal>

          <Reveal delayMs={600}>
            {/* Quick Navigation */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Navigation</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Link
                  to="/services"
                  className="p-3 text-center bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:bg-emerald-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-emerald-900">Services</span>
                </Link>

                <Link
                  to="/solutions"
                  className="p-3 text-center bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg border border-teal-200 hover:from-teal-100 hover:to-teal-200 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:bg-teal-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-teal-900">Solutions</span>
                </Link>

                <Link
                  to="/partners"
                  className="p-3 text-center bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200 hover:from-cyan-100 hover:to-cyan-200 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:bg-cyan-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-cyan-900">Partners</span>
                </Link>

                <Link
                  to="/support"
                  className="p-3 text-center bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:bg-purple-600 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-purple-900">Support</span>
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={800}>
            {/* Footer Message */}
            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Need immediate help? Our{" "}
                <Link to="/support" className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors">
                  support team
                </Link>{" "}
                is here to assist you 24/7.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;