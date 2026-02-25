import React, { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { getSEOForPage } from '@/utils/seo';
import Reveal from '@/components/Reveal';
import {
  ArrowRightIcon,
  CheckIcon,
  StarIcon
} from '@/components/FlatIcons';
import { useToast } from '@/components/Toast';
import { ENV } from "@/config/env";

export default function RequestDemoPage() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/support@dsecuretech.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const now = new Date();
      const timestampLocal = now.toLocaleString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      const timestampISO = now.toISOString();

      // === Prepare FormData for FormSubmit ===
      const formSubmitData = new FormData();
      formSubmitData.append(
        "_webhook",
        "https://api.dsecuretech.com/api/formsubmit/webhook",
      );
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_template", "table");
      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("company", formData.company.trim());
      formSubmitData.append("phone", formData.phone.trim());
      formSubmitData.append("message", formData.message.trim());
      formSubmitData.append("_replyto", formData.email.trim());
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", "Request Demo Page");
      formSubmitData.append("_subject", "New Demo Request - D-Secure Tech");
      formSubmitData.append(
        "_cc",
        "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
      );

      // === Prepare submission data for Backend API ===
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        phone: formData.phone.trim(),
        country: "",
        businessType: "",
        solutionType: "demo-request",
        complianceRequirements: "",
        message: formData.message.trim(),
        usageType: "",
        source: "Request Demo Page",
        timestamp: timestampISO,
      };

      // Reset form and show success immediately
      setFormData({ name: "", email: "", company: "", phone: "", message: "" });
      setIsLoading(false);
      showToast(
        "Thank you! Your demo request has been submitted successfully.",
        "success",
      );

      try {
        // === 1. SUBMIT TO BACKEND API (DATABASE) ===
        const API_BASE = ENV.API_BASE_URL;
        const apiResponse = await fetch(
          `${API_BASE}/api/ContactFormSubmissions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissionData),
          },
        );

        // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
        await fetch(FORMSUBMIT_ENDPOINT, {
          method: "POST",
          body: formSubmitData,
          headers: { Accept: "application/json" },
        });

        // === 3. Microsoft Excel + Teams tracking (non-blocking) ===
        fetch(ENV.POWER_AUTOMATE_HTTP_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "REACT_CONTACT_2026",
          },
          body: JSON.stringify(submissionData),
        }).catch(() => {});

        if (!apiResponse.ok) {
          const errorData = await apiResponse.json();
          console.error("Backend submission failed:", errorData);
        }
      } catch (error: any) {
        console.error("Form error:", error);
        showToast(
          error.message || "Failed to send message. Please try again later.",
          "error",
        );
      }
    } catch (error) {
      console.error("FormSubmit error:", error);
      showToast("Failed to submit demo request. Please try again.", "error");
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEOHead seo={getSEOForPage("request-demo")} />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50">
        <section className="py-16 md:py-24">
          <div className="container-responsive text-center max-w-4xl mx-auto">
            <Reveal>
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md">
                <StarIcon className="w-10 h-10 text-white" filled={true} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
                Request a Demo
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8">
                Request a personalized demo of D-Secure Tech data erasure
                solutions. See how our software meets your needs.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-responsive max-w-2xl mx-auto">
            <Reveal>
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Message
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Submitting..." : "Request Demo"}
                    {!isLoading && (
                      <ArrowRightIcon className="w-5 h-5" filled={true} />
                    )}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
