import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Send } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultModule?: string;
}

export function InquiryModal({ isOpen, onClose, defaultModule }: InquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    scope: defaultModule || 'Tailored Wool Overcoat',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-xl glass-panel rounded-[2rem] border border-white/10 p-6 sm:p-10 z-10 bg-[#0A0A0A]/95"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#888888] block mb-2">
                Atelier Commission
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white">
                Bespoke Dialogue
              </h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 flex items-center justify-center mx-auto text-white">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-xl font-serif text-white">Inquiry Received</h4>
              <p className="text-xs uppercase tracking-[0.2em] text-[#888888] max-w-sm mx-auto">
                Our master patternmaker and tailors will review your commission brief and reach out within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] text-[#888888] mb-2">
                  Client / Representative Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Julian Hayes"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] text-[#888888] mb-2">
                  Direct Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="contact@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                />
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] text-[#888888] mb-2">
                  Garment Discipline / Commission Focus
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
                >
                  <option value="Bespoke Obsidian Sherwani">Bespoke Obsidian Sherwani (Mandarin Collar / Floating Canvas)</option>
                  <option value="Tailored Karandi Kurta">Tailored Karandi Kurta (Handloom Karandi / Concealed Placket)</option>
                  <option value="Structured Prince Coat">Structured Prince Coat (Pagoda Shoulder / Worsted Wool)</option>
                  <option value="Raw Silk Waistcoat">Raw Silk Waistcoat (Slubbed Tussar Silk / Geometric Darts)</option>
                  <option value="Full Bespoke Made-to-Measure Commission">Full Bespoke Made-to-Measure Commission</option>
                </select>
              </div>

              <div>
                <label className="block text-[9px] uppercase tracking-[0.25em] text-[#888888] mb-2">
                  Sizing & Fit Specification Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="State neck/collar circumference, shoulder measurement, preferred drape, textile weight (e.g. Karandi, Raw Silk), or fitting city (Lahore, London, Dubai)..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-3 bg-white text-black py-3.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-medium hover:bg-neutral-200 transition-colors"
                >
                  <span>Submit Atelier Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
