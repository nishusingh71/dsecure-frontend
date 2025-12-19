import React from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, Repeat, CheckCircle, AlertCircle, Edit, Trash2 } from "lucide-react";

const SchedulingTasks: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Scheduling Tasks - DSecure Network File Manual</title>
        <meta
          name="description"
          content="Learn how to schedule automatic erasure tasks in DSecure File Eraser Network for files, folders, and traces."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-gray-900">Schedule Erasure Tasks</h1>
          </div>
          <p className="text-xl text-gray-600">
            Automate file, folder, and trace erasure by scheduling recurring tasks to run at specific times or system events.
          </p>
        </div>

        {/* Overview */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Why Schedule Erasure?</h2>
          <div className="grid md:grid-cols-2 gap-4 text-lg">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Automation</h3>
              <p className="text-purple-100">Set it once, forget it - tasks run automatically without manual intervention</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Consistency</h3>
              <p className="text-purple-100">Ensure regular cleanup happens on all computers at the same frequency</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Compliance</h3>
              <p className="text-purple-100">Meet data retention policies with scheduled automatic erasure</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Efficiency</h3>
              <p className="text-purple-100">Schedule during off-hours to avoid impacting user productivity</p>
            </div>
          </div>
        </section>

        {/* Creating Schedule */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-purple-600 rounded"></span>
            How to Create a Scheduled Task
          </h2>
          
          <div className="space-y-5 text-lg">
            <ol className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">1</span>
                <div>
                  <strong className="text-gray-900">Select Computers</strong>
                  <p className="text-gray-700 mt-1">Connect to domain and select one or more computers where the task should run</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">2</span>
                <div>
                  <strong className="text-gray-900">Choose Erasure Type</strong>
                  <p className="text-gray-700 mt-1">Decide what to erase:</p>
                  <div className="mt-2 space-y-2">
                    <div className="bg-purple-50 rounded-lg p-3">
                      <strong>Files & Folders:</strong> Select specific files/folders to erase
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3">
                      <strong>Traces:</strong> Configure trace categories (Internet, Apps, System)
                    </div>
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">3</span>
                <div>
                  <strong className="text-gray-900">Open Schedule Dialog</strong>
                  <p className="text-gray-700 mt-1">Click <strong>Schedule</strong> button in the ribbon</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">4</span>
                <div>
                  <strong className="text-gray-900">Name Your Task</strong>
                  <p className="text-gray-700 mt-1">Give the task a unique, descriptive name</p>
                  <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    Example: "Daily Temp Cleanup - Marketing Dept" or "Weekly Browser History - Legal"
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">5</span>
                <div>
                  <strong className="text-gray-900">Set Schedule Frequency</strong>
                  <p className="text-gray-700 mt-1">Choose when the task should run (see schedule options below)</p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold flex items-center justify-center mt-0.5">6</span>
                <div>
                  <strong className="text-gray-900">Save Schedule</strong>
                  <p className="text-gray-700 mt-1">Click <strong>Save</strong> to create the scheduled task</p>
                </div>
              </li>
            </ol>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mt-6">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
                <div className="text-amber-900 text-lg">
                  <strong>Important:</strong> Task names must be unique. The software prevents duplicate names to avoid confusion. Choose descriptive names that clearly identify the task's purpose.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Options */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Repeat className="w-7 h-7 text-blue-600" />
            Schedule Frequency Options
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Every Boot</h3>
                  <p className="text-gray-700 text-lg">Task runs automatically every time the computer starts. Ideal for startup cleanup routines.</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Every Login</h3>
                  <p className="text-gray-700 text-lg">Task runs when any user logs into the computer. Perfect for clearing user-specific traces.</p>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 bg-purple-50 rounded-r-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Daily</h3>
                  <p className="text-gray-700 text-lg mb-2">Task runs once per day at a specified time.</p>
                  <div className="bg-white rounded p-3 text-sm">
                    <strong>Configure:</strong> Select time (e.g., 2:00 AM for minimal user impact)
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-orange-500 bg-orange-50 rounded-r-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-orange-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Weekly</h3>
                  <p className="text-gray-700 text-lg mb-2">Task runs once per week on selected day(s) at specified time.</p>
                  <div className="bg-white rounded p-3 text-sm">
                    <strong>Configure:</strong> Select day of week (Monday, Tuesday, etc.) and time
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Monthly</h3>
                  <p className="text-gray-700 text-lg mb-2">Task runs once per month on a specific date at specified time.</p>
                  <div className="bg-white rounded p-3 text-sm">
                    <strong>Configure:</strong> Select date (1-31) and time
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-cyan-500 bg-cyan-50 rounded-r-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-cyan-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Custom Interval</h3>
                  <p className="text-gray-700 text-lg mb-2">Task runs at custom intervals (every X hours/days).</p>
                  <div className="bg-white rounded p-3 text-sm">
                    <strong>Configure:</strong> Specify interval in hours or days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Managing Tasks */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Edit className="w-7 h-7 text-green-600" />
            Managing Scheduled Tasks
          </h2>
          
          <div className="space-y-5 text-lg">
            <p className="text-gray-700 leading-relaxed">
              View, edit, or delete existing scheduled tasks from the task management interface.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Task Management Actions</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">View All Tasks:</strong>
                    <p className="text-gray-700">Go to <strong>Schedule</strong> → <strong>Manage Tasks</strong> to see all scheduled tasks</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Edit className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Edit Task:</strong>
                    <p className="text-gray-700">Select a task and click <strong>Edit</strong> to modify schedule, name, or erasure settings</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-red-600 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Delete Task:</strong>
                    <p className="text-gray-700">Select a task and click <strong>Delete</strong> to remove it permanently</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-purple-600 mt-0.5" />
                  <div>
                    <strong className="text-gray-900">Enable/Disable:</strong>
                    <p className="text-gray-700">Temporarily disable tasks without deleting them, re-enable when needed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-amber-600" />
            Important Notes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
                <div className="text-blue-900 text-lg">
                  <strong>Local Storage:</strong> Scheduled tasks are stored on each individual computer, not centrally. If a computer is offline when the task is scheduled to run, the task behavior depends on the frequency type.
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-6 h-6 text-amber-600 mt-0.5" />
                <div className="text-amber-900 text-lg">
                  <strong>Missed Tasks:</strong> Time-based tasks (Daily, Weekly, Monthly) will be skipped if the computer is offline. Event-based tasks (Every Boot, Every Login) will run when the event next occurs.
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-400 rounded p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-6 h-6 text-green-600 mt-0.5" />
                <div className="text-green-900 text-lg">
                  <strong>Network Connectivity:</strong> Ensure computers stay connected to the network for scheduled tasks to execute reliably.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Scheduling Best Practices</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Schedule resource-intensive tasks during off-peak hours (nights, weekends)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Use descriptive task names with department or purpose identifiers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Test schedules on a few computers before deploying organization-wide</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Document all scheduled tasks and review them quarterly</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Monitor task execution through reports to ensure compliance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 shrink-0 mt-0.5" />
              <span>Combine file and trace erasure in single scheduled tasks for efficiency</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default SchedulingTasks;
