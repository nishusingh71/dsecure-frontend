import React from "react";
import { Helmet } from "react-helmet-async";
import { Building, Globe, Award, Users, Zap, Shield } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>About DSecureTech - DSecure Network File Manual</title>
        <meta
          name="description"
          content="Learn about DSecureTech, a global leader in Data Care solutions including data recovery, email repair, file repair, and data erasure."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Building className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">About DSecureTech</h1>
          </div>
          <p className="text-xl text-gray-600">
            Global leader in Data Care solutions trusted by enterprises, IT service providers, and individuals worldwide.
          </p>
        </div>

        {/* Company Overview */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-4">DSecure Overview</h2>
          <p className="text-xl text-blue-100 leading-relaxed">
            DSecure is a global Data Care organization providing comprehensive solutions for data recovery, email repair & conversion, file and database repair, and secure data erasure. Our proprietary tools are used by enterprises, IT service providers, and individuals in over 190 countries.
          </p>
        </section>

        {/* Global Presence */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Globe className="w-7 h-7 text-blue-600" />
            Global Presence
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">190+</div>
              <div className="text-gray-700 font-medium">Countries Served</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-gray-700 font-medium">Proprietary Tools</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-gray-700 font-medium">Regional Offices</div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">🇺🇸 USA</h3>
              <p className="text-sm text-gray-600">Americas Headquarters</p>
            </div>
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">🇪🇺 Europe</h3>
              <p className="text-sm text-gray-600">EMEA Operations</p>
            </div>
            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50/30">
              <h3 className="font-semibold text-gray-900 mb-2">🌏 Asia</h3>
              <p className="text-sm text-gray-600">Asia-Pacific Hub</p>
            </div>
          </div>
        </section>

        {/* Product Portfolio */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Award className="w-7 h-7 text-green-600" />
            Product Portfolio
          </h2>
          
          <div className="space-y-6">
            {/* Data Recovery */}
            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">DATA RECOVERY</span>
              </h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                  <span><strong>DSecureTech Data Recovery (Windows/Mac):</strong> Comprehensive file recovery from drives, partitions, and storage media</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-green-600 mt-1 shrink-0" />
                  <span><strong>DSecureTech Photo Recovery:</strong> Specialized recovery for photos, videos, and multimedia files</span>
                </li>
              </ul>
            </div>

            {/* Email Repair & Conversion */}
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">EMAIL SOLUTIONS</span>
              </h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <span><strong>Repair for Exchange/Outlook:</strong> Fix corrupted Exchange Server mailboxes and Outlook PST files</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                  <span><strong>Converter for EDB/OST:</strong> Convert mailbox databases to PST or other formats</span>
                </li>
              </ul>
            </div>

            {/* File & Database Repair */}
            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">REPAIR TOOLS</span>
              </h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-purple-600 mt-1 shrink-0" />
                  <span><strong>Repair for MS SQL:</strong> Recover corrupted SQL Server database files (MDF/NDF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="w-5 h-5 text-purple-600 mt-1 shrink-0" />
                  <span><strong>Repair for Video:</strong> Fix corrupted or damaged video files</span>
                </li>
              </ul>
            </div>

            {/* Data Erasure */}
            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">DATA ERASURE</span>
              </h3>
              <ul className="space-y-2 text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-red-600 mt-1 shrink-0" />
                  <span><strong>D-SecureDrive Eraser:</strong> Permanently erase entire drives and partitions</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-red-600 mt-1 shrink-0" />
                  <span><strong>D-SecureFile Eraser:</strong> Securely delete individual files and folders</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-red-600 mt-1 shrink-0" />
                  <span><strong>D-SecureFile Eraser Network:</strong> Enterprise solution for networked environments (this product)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose DSecureTech */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-indigo-600" />
            Why Choose DSecureTech
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Industry Expertise</h3>
                <p className="text-gray-700">Years of experience in data care solutions with proven track record</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Security Certified</h3>
                <p className="text-gray-700">Compliance with international data protection and erasure standards</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Trusted Globally</h3>
                <p className="text-gray-700">Used by Fortune 500 companies, government agencies, and IT professionals</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Innovative Solutions</h3>
                <p className="text-gray-700">Continuous development of cutting-edge data care technologies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-indigo-100 text-lg mb-6">
            Have questions or need support? Our team is here to help you 24/7.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Technical Support</h3>
              <p className="text-indigo-100">techsupport@dsecuretech.com</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Sales Inquiries</h3>
              <p className="text-indigo-100">sales@dsecuretech.com</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-indigo-400">
            <p className="text-center text-indigo-100">
              Visit our website for more information about our complete product portfolio
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
