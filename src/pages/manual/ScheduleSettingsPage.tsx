import SEOHead from "../../components/SEOHead";
import { getSEOForPage } from "../../utils/seo";
import React from "react";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ChevronRight,
  Calendar,
  Settings,
  Palette,
  Clock,
  Play,
  CheckCircle,
  AlertCircle,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";

const ScheduleSettingsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <SEOHead seo={getSEOForPage("schedule-settings")} />
      <Helmet>
        <title>
          D-Secure Scheduling & Settings - Complete Configuration Guide
        </title>
        <meta
          name="description"
          content="Master D-Secure scheduling and settings - configure erasure tasks, customize themes, manage general settings, and set up automated operations."
        />
        <meta
          name="keywords"
          content="D-Secure schedule, erasure scheduling, settings configuration, themes, general settings, automation"
        />
      </Helmet>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link
                to="/support/help-manual"
                className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Help Manual
              </Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">
                Scheduling & Settings
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Scheduling & Configuration Settings
                </h1>
                <p className="text-gray-600 mt-2">
                  Complete guide to D-Secure scheduling, themes, and general
                  settings configuration
                </p>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-12">
              {/* Schedule Erasure Section */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                  Setting Schedule Erasure
                </h2>

                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-blue-800 leading-relaxed">
                    <span className="font-semibold">DSecure File Eraser</span>{" "}
                    provides you the ability to schedule an erase task and
                    periodically clean out data that you select. The facility
                    will help in maintaining the system by ensuring that
                    unwanted data is removed at intervals, so that you can
                    forget about manually accessing the system to delete
                    unwanted data.
                  </p>
                </div>

                {/* Schedule Erasure for Erase Traces */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-600" />
                    To set Schedule Erasure for Erase Traces:
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          1
                        </span>
                        <p className="text-gray-700">
                          Run{" "}
                          <span className="font-semibold text-green-600">
                            D-Secure File Eraser
                          </span>
                          .
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          2
                        </span>
                        <p className="text-gray-700">
                          Select{" "}
                          <span className="font-semibold text-green-600">
                            Schedule Erasure
                          </span>{" "}
                          from{" "}
                          <span className="font-semibold">Select Option</span>{" "}
                          displayed on the left pane of the screen.
                        </p>
                      </div>

                      <div className="flex items-start space-x-3">
                        <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                          3
                        </span>
                        <p className="text-gray-700">
                          Select{" "}
                          <span className="font-semibold text-green-600">
                            Erase Traces
                          </span>{" "}
                          tab from the right pane of the screen as displayed
                          below.
                        </p>
                      </div>
                    </div>

                    {/* Schedule Interface Mockup */}
                    <div className="mt-8 p-6 bg-white border border-gray-300 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Play className="w-5 h-5 mr-2 text-blue-600" />
                        Schedule Erasure Interface
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                        {/* Schedule Options */}
                        <div className="space-y-4">
                          <h5 className="font-semibold text-gray-900">
                            Scheduling Options
                          </h5>

                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="daily"
                                name="schedule"
                                className="text-blue-600"
                                defaultChecked
                              />
                              <label htmlFor="daily" className="text-gray-700">
                                Daily
                              </label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="weekly"
                                name="schedule"
                                className="text-blue-600"
                              />
                              <label htmlFor="weekly" className="text-gray-700">
                                Weekly
                              </label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="monthly"
                                name="schedule"
                                className="text-blue-600"
                              />
                              <label
                                htmlFor="monthly"
                                className="text-gray-700"
                              >
                                Monthly
                              </label>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Start Time:
                            </label>
                            <input
                              type="time"
                              value="14:30"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              End Time:
                            </label>
                            <input
                              type="time"
                              value="15:30"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900"
                            />
                          </div>
                        </div>

                        {/* Trace Types */}
                        <div className="space-y-4">
                          <h5 className="font-semibold text-gray-900">
                            Trace Types to Erase
                          </h5>

                          <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="internet"
                                  defaultChecked
                                  className="text-blue-600"
                                />
                                <label
                                  htmlFor="internet"
                                  className="text-gray-700"
                                >
                                  Internet Activity
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="cookies"
                                  defaultChecked
                                  className="text-blue-600"
                                />
                                <label
                                  htmlFor="cookies"
                                  className="text-gray-700"
                                >
                                  Cookies
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="history"
                                  defaultChecked
                                  className="text-blue-600"
                                />
                                <label
                                  htmlFor="history"
                                  className="text-gray-700"
                                >
                                  Browser History
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="temp"
                                  className="text-blue-600"
                                />
                                <label htmlFor="temp" className="text-gray-700">
                                  Temporary Files
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="cache"
                                  className="text-blue-600"
                                />
                                <label
                                  htmlFor="cache"
                                  className="text-gray-700"
                                >
                                  Cache Files
                                </label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="downloads"
                                  className="text-blue-600"
                                />
                                <label
                                  htmlFor="downloads"
                                  className="text-gray-700"
                                >
                                  Download History
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-end space-x-3">
                        <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                          Cancel
                        </button>
                        <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Schedule Task</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <p>
                            <strong>Note:</strong> Ensure that application is
                            closed before the scheduled erasure task.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuring Settings Section */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Settings className="w-6 h-6 mr-3 text-gray-600" />
                  Configuring Settings
                </h2>

                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    To change the settings of an erasure task:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </span>
                      <p className="text-gray-700">
                        Run{" "}
                        <span className="font-semibold text-blue-600">
                          D-Secure File Eraser
                        </span>
                        .
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </span>
                      <p className="text-gray-700">
                        Click on the{" "}
                        <span className="font-semibold">Settings</span> icon
                        displayed on the screen.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </span>
                      <div>
                        <p className="text-gray-700">
                          The Settings window provides two tabs to change the
                          settings of an erasure task:
                        </p>
                        <ul className="mt-2 ml-4 space-y-1 text-sm text-gray-600">
                          <li>
                            •{" "}
                            <span className="font-semibold text-blue-600">
                              General Settings
                            </span>
                          </li>
                          <li>
                            •{" "}
                            <span className="font-semibold text-red-600">
                              Settings to Erase Traces
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* General Settings */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    General Settings
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      General settings are basic configuration settings that
                      enable you to choose the theme, language, and erasing
                      algorithm from a list of provided options.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-gray-700">
                          Select <span className="font-semibold">Theme</span>{" "}
                          for your application.
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-gray-700">
                          Select <span className="font-semibold">Language</span>{" "}
                          for your application.
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-gray-700">
                          Select <span className="font-semibold">Erasure</span>{" "}
                          options.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Change Themes Section */}
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Palette className="w-6 h-6 mr-3 text-indigo-600" />
                  Change Themes
                </h2>

                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold text-indigo-600">
                      D-Secure File Eraser
                    </span>{" "}
                    allows you to select a theme for your application, you can
                    select between light and dark mode.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Theme Options:
                      </h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>
                          • <span className="font-semibold">Light</span> - Sets
                          the background in light mode.
                        </li>
                        <li>
                          • <span className="font-semibold">Dark</span> - Sets
                          the background in dark mode.
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-900">
                        Theme Preview:
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-gray-300 rounded-lg p-4 text-center">
                          <div className="text-sm font-medium text-gray-900 mb-2">
                            Light Theme
                          </div>
                          <div className="w-full h-12 bg-gray-100 rounded border"></div>
                        </div>
                        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 text-center">
                          <div className="text-sm font-medium text-white mb-2">
                            Dark Theme
                          </div>
                          <div className="w-full h-12 bg-gray-700 rounded border border-gray-600"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Steps to select a theme:
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        1
                      </span>
                      <p className="text-gray-700">
                        Run{" "}
                        <span className="font-semibold text-indigo-600">
                          D-Secure File Eraser
                        </span>
                        .
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        2
                      </span>
                      <p className="text-gray-700">
                        In the menu bar, click{" "}
                        <span className="font-semibold">Settings</span>.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </span>
                      <p className="text-gray-700">
                        The <span className="font-semibold">General</span> tab
                        opens by default. Locate the{" "}
                        <span className="font-semibold">Theme</span> drop-down
                        menu.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        4
                      </span>
                      <div>
                        <p className="text-gray-700">
                          From the drop-down options, select either:
                        </p>
                        <ul className="mt-2 ml-4 space-y-1 text-sm">
                          <li>
                            • <span className="font-semibold">Light</span>
                          </li>
                          <li>
                            • <span className="font-semibold">Dark</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <span className="bg-indigo-100 text-indigo-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        5
                      </span>
                      <p className="text-gray-700">
                        After choosing your preferred theme, click{" "}
                        <span className="font-semibold">OK</span> to save
                        preferences.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-800">
                        <p>
                          <strong>Note:</strong> Click <strong>Reset</strong> to
                          revert the Settings to default values.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Features */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Download className="w-6 h-6 mr-3 text-blue-600" />
                  Related Configuration Guides
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    to="/support/help-manual/working-guide"
                    className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">
                        Settings Configuration
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Learn about erasure options, algorithm selection, and
                      trace settings configuration.
                    </p>
                  </Link>

                  <Link
                    to="/support/help-manual/faqs"
                    className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Clock className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-900">
                        Scheduling FAQs
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Find answers to common questions about scheduling and
                      automation features.
                    </p>
                  </Link>

                  <Link
                    to="/support/help-manual/report-management"
                    className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Palette className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-semibold text-gray-900">
                        Report Customization
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      Customize report themes, signatures, and branding for your
                      organization.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleSettingsPage;
