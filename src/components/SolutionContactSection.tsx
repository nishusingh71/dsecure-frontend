import React, { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { CheckIcon, ArrowRightIcon } from "@/components/FlatIcons";
import { useToast } from "@/components/Toast";
import { ENV } from "@/config/env";

// Solution Contact Section ka props interface
interface SolutionContactSectionProps {
  /** Page source identifier — backend tracking ke liye */
  source: string;
  /** Email subject line mein use hoga */
  subjectPrefix?: string;
}

/**
 * Reusable contact/enquiry section jo sabhi solution pages mein use hoga.
 * DriveEraserPage ke contact section jaisa design hai — left mein content,
 * right mein form card (dark theme).
 */
const SolutionContactSection: React.FC<SolutionContactSectionProps> = ({
  source,
  subjectPrefix,
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  // Input field change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handler — FormSubmit + Backend API + Power Automate
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

      // === FormSubmit ke liye FormData prepare karo ===
      const formSubmitData = new FormData();
      formSubmitData.append(
        "_webhook",
        "https://api.dsecuretech.com/api/formsubmit/webhook",
      );
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_template", "table");

      // Form fields
      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("organization", formData.organization.trim());
      formSubmitData.append("message", formData.message.trim());

      // Autoresponse ke liye required
      formSubmitData.append("_replyto", formData.email.trim());
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", source);

      // Subject aur CC
      const emailSubject = subjectPrefix
        ? `${subjectPrefix} - D-Secure Tech`
        : `New Inquiry - ${source} - D-Secure Tech`;
      formSubmitData.append("_subject", emailSubject);
      formSubmitData.append(
        "_cc",
        "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com",
      );

      // === Backend API ke liye submission data ===
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.organization.trim(),
        phone: "",
        country: "",
        businessType: "",
        solutionType: "industry-solutions",
        complianceRequirements: "",
        message: formData.message.trim(),
        usageType: "",
        source,
        timestamp: timestampISO,
      };

      // Form reset aur success toast turant dikhao
      setFormData({ name: "", email: "", organization: "", message: "" });
      setIsLoading(false);
      showToast(
        "Thank you! Your enquiry has been submitted successfully.",
        "success",
      );

      try {
        // === 1. Backend API (Database) ===
        const API_BASE = ENV.API_BASE_URL;
        const apiResponse = await fetch(
          `${API_BASE}/api/ContactFormSubmissions`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissionData),
          },
        );

        // === 2. FormSubmit (Email & Webhook) ===
        await fetch("https://formsubmit.co/support@dsecuretech.com", {
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
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.";
        console.error("Form error:", errorMessage);
      }
    } catch {
      showToast("Failed to submit enquiry. Please try again.", "error");
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-20 lg:py-28 bg-white border-t">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center">
          {/* Left Column — Content */}
          <Reveal>
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
                Talk to Our Data Security Experts
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Get personalized guidance on deployment, licensing, and
                audit-ready data erasure strategies tailored to your
                organization's needs.
              </p>
              <ul className="space-y-4">
                {[
                  "Enterprise & SMB licensing options",
                  "Compliance-focused implementation",
                  "White-label branding available",
                  "No-obligation consultation",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-emerald-800" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-emerald-800 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Or contact us directly
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right Column — Enquiry Form */}
          <Reveal delayMs={100}>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                Request Information
              </h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email *"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder="Organization"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 transition-colors resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold py-4 rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Submitting..." : "Submit Enquiry"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SolutionContactSection;
