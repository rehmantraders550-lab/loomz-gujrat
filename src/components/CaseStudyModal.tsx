import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Layers, Sliders, MapPin, Calendar } from 'lucide-react';
import { SpatialModule } from '../types';

interface CaseStudyModalProps {
  module: SpatialModule | null;
  onClose: () => void;
  onOpenInquiry: (moduleTitle: string) => void;
}

export function CaseStudyModal({ module, onClose, onOpenInquiry }: CaseStudyModalProps) {
  if (!module) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop with Fade */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-2xl"
        />

        {/* Modal Window with Slide/Fade */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl glass-panel rounded-[2rem] border border-white/10 overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0A0A0A]/40">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#888888]">
                {module.moduleNumber} / {module.categoryLabel}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#888888]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888]">
                Garment Specification
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#888888] hover:text-white hover:border-white/40 transition-colors"
              aria-label="Close case study modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
            {/* Hero Image in Modal - Vertical Portrait framing */}
            <div className="w-full h-80 sm:h-96 md:h-[460px] rounded-2xl overflow-hidden relative">
              <img
                src={module.image}
                alt={module.imageAlt}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap justify-between items-end gap-4">
                <div>
                  <h3
                    data-product-title
                    className="product-title text-3xl sm:text-4xl font-serif text-white mb-1 uppercase"
                    style={{ letterSpacing: '0.1em' }}
                  >
                    {module.title}
                  </h3>
                  {module.subtitle && (
                    <p
                      data-product-subtitle
                      className="product-subtitle text-xs uppercase tracking-[0.2em] text-[#888888] font-sans font-medium"
                      style={{ letterSpacing: '0.2em', color: '#888888' }}
                    >
                      {module.subtitle}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-[#888888]">
                  {module.price && (
                    <span className="px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white font-sans uppercase tracking-[0.16em]">
                      {module.price}
                    </span>
                  )}
                  {module.location && (
                    <span className="flex items-center gap-1.5 font-sans uppercase tracking-[0.16em]">
                      <MapPin className="w-3.5 h-3.5 text-[#888888]" />
                      {module.location}
                    </span>
                  )}
                  {module.year && (
                    <span className="flex items-center gap-1.5 font-sans uppercase tracking-[0.16em]">
                      <Calendar className="w-3.5 h-3.5 text-[#888888]" />
                      {module.year}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#888888] font-sans font-medium">
                Design & Drape Intent
              </h4>
              <p className="text-[#888888] font-light leading-relaxed text-base sm:text-lg">
                {module.description}
              </p>
            </div>

            {/* Stats / Specifications */}
            {module.stats && module.stats.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#888888] font-sans font-medium">
                  <Sliders className="w-3 h-3 text-[#888888]" />
                  <span>Fabric & Fiber Benchmarks</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {module.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl border border-white/10 bg-white/[0.015]"
                    >
                      <div
                        data-product-spec
                        className="product-spec text-[9px] uppercase tracking-[0.2em] text-[#888888] mb-1.5 font-sans font-medium"
                        style={{ letterSpacing: '0.2em', color: '#888888' }}
                      >
                        {stat.label}
                      </div>
                      <div className="text-base sm:text-lg font-serif text-white">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Materiality Palette */}
            {module.materials && module.materials.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#888888] font-sans font-medium">
                  <Layers className="w-3 h-3 text-[#888888]" />
                  <span>Textile & Hardware Composition</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {module.materials.map((mat, i) => (
                    <div
                      key={i}
                      data-product-spec
                      className="product-spec text-xs uppercase tracking-[0.18em] text-[#888888] font-sans font-medium px-4 py-2 rounded-xl border border-white/10 bg-white/[0.02]"
                      style={{ letterSpacing: '0.18em', color: '#888888' }}
                    >
                      {mat}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-6 border-t border-white/10 bg-[#0A0A0A]/60 flex flex-wrap justify-between items-center gap-4">
            <button
              onClick={onClose}
              className="text-[10px] uppercase tracking-[0.25em] text-[#888888] hover:text-white transition-colors"
            >
              Return to Lookbook
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenInquiry(module.title);
              }}
              className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.22em] font-medium hover:bg-neutral-200 transition-colors"
            >
              <span>Inquire For Private Fitting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
