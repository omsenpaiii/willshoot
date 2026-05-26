"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, MessageSquare, AlertCircle, Loader2 } from "lucide-react";

const BUDGET_RANGES = [
  "Under $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000+",
  "Not Sure Yet"
];

const SERVICES_OPTIONS = [
  { value: "Videography", label: "Videography" },
  { value: "Photography", label: "Photography" },
  { value: "Social Media Management", label: "Social Media Management" },
  { value: "Meta Ads Marketing", label: "Meta Ads Marketing" },
  { value: "Complete Monthly Package", label: "Complete Monthly Package" },
  { value: "Not Sure Yet", label: "Not Sure Yet" }
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    service: "",
    budget: "",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection.");
    }
  };

  // WhatsApp click to chat generation helper
  const getWhatsAppLink = () => {
    const phoneNum = "61400000000"; // Sample AU phone number (Melbourne)
    const baseText = `Hi WillShoot! My name is ${formData.name || "[Your Name]"}`;
    const bizText = formData.businessName ? ` from ${formData.businessName}` : "";
    const svcText = formData.service ? `. I'm interested in booking your ${formData.service} package` : ". I'd like to book a shoot";
    const budgetText = formData.budget ? ` (Budget: ${formData.budget})` : "";
    const msgText = formData.message ? `. Detail: ${formData.message}` : "";
    
    const fullText = `${baseText}${bizText}${svcText}${budgetText}${msgText}. Let's connect!`;
    return `https://wa.me/${phoneNum}?text=${encodeURIComponent(fullText)}`;
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-brand-white border-2 border-brand-red p-8 md:p-12 rounded-3xl text-center space-y-6 shadow-xl shadow-brand-red/[0.02]"
      >
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 size={36} />
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-brand-black">Project Request Received!</h3>
          <p className="text-brand-medium-gray text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Thank you. We've received your request and will get back to you shortly.
          </p>
        </div>

        <div className="pt-6 border-t border-brand-light-gray/60 space-y-4 max-w-sm mx-auto">
          <p className="text-xs text-brand-medium-gray font-semibold uppercase tracking-wider">Want an immediate reply?</p>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba59] text-brand-white rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-green-500/10"
          >
            <MessageSquare size={18} className="fill-brand-white" />
            Connect via WhatsApp
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-brand-white border border-brand-light-gray/60 p-6 md:p-10 rounded-3xl space-y-6 shadow-sm">
      {status === "error" && (
        <div className="bg-brand-red/5 border border-brand-red/20 rounded-xl p-4 flex items-start gap-3 text-brand-red text-sm">
          <AlertCircle size={20} className="shrink-0 mt-0.5" />
          <span className="font-semibold">{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-brand-black">
            Full Name <span className="text-brand-red">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-brand-light-gray bg-brand-soft-white text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-white transition-colors duration-200"
          />
        </div>

        {/* Business Name */}
        <div className="space-y-2">
          <label htmlFor="businessName" className="text-xs font-bold uppercase tracking-wider text-brand-black">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="e.g. Acme Properties"
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-brand-light-gray bg-brand-soft-white text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-white transition-colors duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Phone Number */}
        <div className="space-y-2">
          <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-brand-black">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 0400 000 000"
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-brand-light-gray bg-brand-soft-white text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-white transition-colors duration-200"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-brand-black">
            Email Address <span className="text-brand-red">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-brand-light-gray bg-brand-soft-white text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-white transition-colors duration-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Service Interested In */}
        <div className="space-y-2">
          <label htmlFor="service" className="text-xs font-bold uppercase tracking-wider text-brand-black">
            Service Interested In <span className="text-brand-red">*</span>
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-brand-light-gray bg-brand-soft-white text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-white transition-colors duration-200 appearance-none cursor-pointer"
          >
            <option value="" disabled>Select a service</option>
            {SERVICES_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Budget Range */}
        <div className="space-y-2">
          <label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-brand-black">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            disabled={status === "submitting"}
            className="w-full px-4 py-3 rounded-xl border border-brand-light-gray bg-brand-soft-white text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-white transition-colors duration-200 appearance-none cursor-pointer"
          >
            <option value="" disabled>Select budget range</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-brand-black">
          Message Details <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us what you want to shoot. We'll help you turn it into content that works."
          disabled={status === "submitting"}
          className="w-full px-4 py-3 rounded-xl border border-brand-light-gray bg-brand-soft-white text-sm text-brand-black focus:outline-none focus:border-brand-red focus:bg-brand-white transition-colors duration-200 resize-y"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full py-4 bg-brand-red hover:bg-brand-red/90 disabled:bg-brand-red/50 text-brand-white font-bold tracking-wide rounded-full text-sm transition-all duration-200 transform hover:scale-[1.01] flex items-center justify-center gap-2 shadow-lg shadow-brand-red/10 cursor-pointer"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Sending Request...
            </>
          ) : (
            <>
              <Send size={16} />
              Send Brief
            </>
          )}
        </button>
      </div>
    </form>
  );
}
