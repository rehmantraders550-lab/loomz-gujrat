import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, Layers, Sparkles, Scissors, Shirt, Feather } from 'lucide-react';
import { ModuleCategory } from '../types';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: ModuleCategory) => void;
  onOpenInquiry: () => void;
}

export function MenuModal({
  isOpen,
  onClose,
  onSelectCategory,
  onOpenInquiry,
}: MenuModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0A0A0A]/85 backdrop-blur-2xl"
        />

        {/* Slide-in Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-lg h-full bg-[#0A0A0A] border-l border-white/10 p-8 sm:p-12 flex flex-col justify-between z-10 overflow-y-auto"
        >
          <div>
            <div className="flex justify-between items-center pb-8 border-b border-white/10">
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#888888]">
                Editorial Index & Collections
              </span>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#888888] hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="mt-12 space-y-8">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-4 block">
                  Garment Disciplines
                </span>
                <ul className="space-y-4">
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('all');
                        onClose();
                      }}
                      className="group flex items-center justify-between w-full text-left text-2xl sm:text-3xl font-serif text-white hover:text-white transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        All Garments
                      </span>
                      <Sparkles className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('sherwani');
                        onClose();
                      }}
                      className="group flex items-center justify-between w-full text-left text-2xl sm:text-3xl font-serif text-white hover:text-white transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        Bespoke Sherwanis
                      </span>
                      <Layers className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('kurta');
                        onClose();
                      }}
                      className="group flex items-center justify-between w-full text-left text-2xl sm:text-3xl font-serif text-white hover:text-white transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        Karandi Kurtas
                      </span>
                      <Scissors className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('prince-coat');
                        onClose();
                      }}
                      className="group flex items-center justify-between w-full text-left text-2xl sm:text-3xl font-serif text-white hover:text-white transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        Structured Prince Coats
                      </span>
                      <Feather className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        onSelectCategory('waistcoat');
                        onClose();
                      }}
                      className="group flex items-center justify-between w-full text-left text-2xl sm:text-3xl font-serif text-white hover:text-white transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">
                        Raw Silk Waistcoats
                      </span>
                      <Shirt className="w-4 h-4 text-[#888888] group-hover:text-white transition-colors" />
                    </button>
                  </li>
                </ul>
              </div>

              <div className="pt-8 border-t border-white/10">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#888888] mb-4 block">
                  Atelier Practice
                </span>
                <div className="space-y-4">
                  <a
                    href="#narrative-section"
                    onClick={onClose}
                    className="block text-lg text-[#888888] hover:text-white transition-colors font-light"
                  >
                    Atelier Ethos & Looms
                  </a>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenInquiry();
                    }}
                    className="flex items-center gap-2 text-lg text-white hover:text-white transition-colors font-light"
                  >
                    <span>Private Fitting & Bespoke Commission</span>
                    <ArrowUpRight className="w-4 h-4 text-[#888888]" />
                  </button>
                </div>
              </div>
            </nav>
          </div>

          <div className="pt-10 border-t border-white/10 space-y-4">
            <div className="text-xs text-[#888888] uppercase tracking-[0.2em]">
              Lahore & London Atelier / Private Client Fitting
            </div>
            <p className="text-xs text-[#888888] font-light leading-relaxed">
              Accepting private tailoring commissions and bespoke Eastern menswear editions for 2026-2027.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
