import React, { useState } from "react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/components/Toast";
import { ENV } from "@/config/env";

interface ProductContactFormProps {
  source: string;
  solutionType: string;
  title?: string;
  subtitle?: string;
}

/**
 * ProductContactForm: Har product page ke liye ek common contact form.
 * Yeh form Backend API, FormSubmit aur Power Automate teeno pe data bhejta hai.
 */
export const ProductContactForm: React.FC<ProductContactFormProps> = ({ 
  source, 
  solutionType,
  title = "Ready to Get Started?",
  subtitle = "Contact our experts today for a personalized demo or technical consultation."
}) => {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);

    try {
      const timestampISO = new Date().toISOString();
      const timestampLocal = new Date().toLocaleString();

      // === Prepare FormData for FormSubmit ===
      const formSubmitData = new FormData();
      formSubmitData.append("name", formData.name.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("organization", formData.organization.trim());
      formSubmitData.append("message", formData.message.trim());
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", source);
      formSubmitData.append("_subject", `New Inquiry - ${source} - D-Secure Tech`);
      formSubmitData.append(
        "_cc",
        "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com"
      );

      // === Prepare submission data for Backend API ===
      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        company: formData.organization.trim(),
        phone: "",
        country: "",
        businessType: "",
        solutionType: solutionType,
        complianceRequirements: "",
        message: formData.message.trim(),
        usageType: "",
        source: source,
        timestamp: timestampISO,
      };

      // Reset form and show success immediately for better UX
      setFormData({
        name: "",
        email: "",
        organization: "",
        message: "",
      });
      setIsLoading(false);
      showToast(
        "Thank you! Your enquiry has been submitted successfully.",
        "success",
      );

      try {
        // === 1. SUBMIT TO BACKEND API (DATABASE) ===
        const API_BASE = ENV.API_BASE_URL;
        const apiResponse = await fetch(`${API_BASE}/api/ContactFormSubmissions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submissionData),
        });

        // === 2. SUBMIT TO FORMSUBMIT (EMAIL & WEBHOOK) ===
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
          console.error("Backend submission failed:", await apiResponse.json());
        }
      } catch (error) {
        console.error("Submission error:", error);
      }
    } catch (error: any) {
      console.error("Form error:", error);
      showToast(
        error.message || "Failed to send message. Please try again later.",
        "error",
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-center">
      <Reveal>
        <div className="space-y-8 text-left">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
            {title}
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
            {subtitle}
          </p>
          <div className="space-y-6">
            {[
              { label: "Email Us", value: "sales@dsecuretech.com" },
              { label: "Response Time", value: "Within 24 Hours" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="text-emerald-700 text-sm font-bold uppercase tracking-wider mb-1">
                  {item.label}
                </span>
                <span className="text-slate-900 text-xl font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={200}>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 lg:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-all duration-500"></div>
          
          <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name *"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address *"
                className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all"
                required
              />
            </div>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              placeholder="Organization / Company"
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              placeholder="How can we help you?"
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-400 focus:bg-white/10 transition-all resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-emerald-700 font-bold py-5 rounded-2xl hover:bg-emerald-50 transition-all shadow-xl hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
            >
              {isLoading ? "Submitting..." : "Send Message"}
              {!isLoading && <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>}
            </button>
          </form>
        </div>
      </Reveal>
    </div>
  );
};
