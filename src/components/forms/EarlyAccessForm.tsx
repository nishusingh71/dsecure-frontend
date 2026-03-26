import React, { useState } from "react";
import { Check, Loader2, Rocket, Shield, Mail, Building, User } from "lucide-react";
import { ENV } from "@/config/env";

// Upcoming products based on DataEraserSoftwarePage.tsx
const UPCOMING_PRODUCTS = [
  { id: "smartphone-eraser", name: "Smartphone Eraser", category: "Data Erasure" },
  { id: "removable-media", name: "Removable Media Eraser", category: "Data Erasure" },
  { id: "lun-eraser", name: "LUN Eraser", category: "Data Erasure" },
  { id: "vm-eraser", name: "Virtual Machine Eraser", category: "Data Erasure" },
  { id: "data-migration", name: "Data Migration", category: "Diagnostics" },
  { id: "asset-reimaging", name: "Asset Reimaging", category: "Diagnostics" },
  { id: "drive-verifier", name: "Drive Verifier", category: "Diagnostics" },
  { id: "drive-diagnostic", name: "Drive Eraser Diagnostic", category: "Diagnostics" },
  { id: "phone-diagnostic", name: "Smartphone Diagnostics", category: "Diagnostics" },
  { id: "hard-diagnostic", name: "Hardware Diagnostics", category: "Diagnostics" },
  { id: "smart-diagnostic", name: "SMART Diagnostics", category: "Monitoring" },
  { id: "forensic-imaging", name: "Forensic Imaging", category: "Security" },
  { id: "freezestate", name: "FreezeState", category: "Monitoring" },
  { id: "autopilot", name: "Autopilot Detection", category: "Deployment" },
];

interface EarlyAccessFormProps {
  isModal?: boolean;
  title?: string;
  showHeader?: boolean;
}

export const EarlyAccessForm: React.FC<EarlyAccessFormProps> = ({
  isModal = false,
  title = "Register for Early Access",
  showHeader = true,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleProductToggle = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // FormSubmit logic matching ContactPage.tsx
  const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/support@dsecuretech.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      showToast("Please select at least one product", "error");
      return;
    }

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

      // Prepare data for email (FormSubmit)
      const formSubmitData = new FormData();
      formSubmitData.append("_webhook", "https://api.dsecuretech.com/api/formsubmit/webhook");
      formSubmitData.append("_captcha", "false");
      formSubmitData.append("_template", "table");
      formSubmitData.append("_replyto", formData.email.trim());
      formSubmitData.append("_subject", `Early Access Request: ${formData.fullName}`);
      formSubmitData.append(
        "_cc",
        "niteshkushwaha592592@gmail.com,sainiprashant46@gmail.com,d.kumar9012@gmail.com,nishus877@gmail.com,spsingh8477@gmail.com"
      );

      formSubmitData.append("name", formData.fullName.trim());
      formSubmitData.append("email", formData.email.trim());
      formSubmitData.append("company", formData.company.trim());
      formSubmitData.append("interested_products", selectedProducts.join(", "));
      formSubmitData.append("message", formData.message.trim());
      formSubmitData.append("timestamp", timestampLocal);
      formSubmitData.append("source", "Early Access Page");

      // Prepare data for Backend API
      const submissionData = {
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        company: formData.company.trim(),
        message: `Products interested: ${selectedProducts.join(", ")}. \n\nAdditional Message: ${formData.message.trim()}`,
        source: "Early Access Page",
        timestamp: now.toISOString(),
        solutionType: "Early Access",
      };

      // 1. Backend Submission
      const API_BASE = ENV.API_BASE_URL;
      const apiResponse = await fetch(`${API_BASE}/api/ContactFormSubmissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      // 2. FormSubmit (Email)
      const emailResponse = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        body: formSubmitData,
        headers: { Accept: "application/json" },
      });

      // 3. Power Automate (Non-blocking)
      fetch(ENV.POWER_AUTOMATE_HTTP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "REACT_CONTACT_2026",
        },
        body: JSON.stringify(submissionData),
      }).catch(() => {});

      if (!apiResponse.ok || !emailResponse.ok) {
        throw new Error("Submission failed. Please try again.");
      }

      showToast("Thank you! Your early access request has been sent.", "success");
      
      // Reset form (Form reset karna)
      setFormData({ fullName: "", email: "", company: "", message: "" });
      setSelectedProducts([]);

    } catch (error: any) {
      showToast(error.message || "Something went wrong. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${isModal ? "" : "max-w-4xl mx-auto"} p-1`}>
      {showHeader && (
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-2">{title}</h2>
          <p className="text-slate-500 font-medium">Join our exclusive circle of innovators.</p>
        </div>
      )}

      {toast && (
        <div className={`fixed top-4 right-4 z-[9999] px-6 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
          toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {toast.type === "success" ? <Check className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label htmlFor="fullName" className="text-sm font-bold text-slate-700 ml-1">Full Name *</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                id="fullName"
                required
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-bold text-slate-700 ml-1">Email Address *</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                id="email"
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@company.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-1.5">
            <label htmlFor="company" className="text-sm font-bold text-slate-700 ml-1">Company Name *</label>
            <div className="relative group">
              <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
              <input
                id="company"
                required
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="D-Secure Tech"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-bold text-slate-700 ml-1">Select Products for Early Access *</div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              {selectedProducts.length} selected
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {UPCOMING_PRODUCTS.map((product) => {
              const isActive = selectedProducts.includes(product.id);
              return (
                <button
                  type="button"
                  key={product.id}
                  onClick={() => handleProductToggle(product.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    isActive
                      ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200"
                      : "bg-slate-50 border-slate-100 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/50"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                    isActive ? "bg-white border-white text-emerald-600" : "bg-white border-slate-200"
                  }`}>
                    {isActive && <Check className="w-3.5 h-3.5" strokeWidth={4} />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-slate-800"}`}>
                      {product.name}
                    </p>
                    <p className={`text-[10px] uppercase tracking-wider font-black ${isActive ? "text-emerald-100" : "text-slate-400"}`}>
                      {product.category}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-bold text-slate-700 ml-1">Anything else we should know?</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us about your specific requirements or use case..."
            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-medium resize-none text-slate-700"
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-200 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Rocket className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span>Get Early Access</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
