import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onScrollToExplore: () => void;
}

export function Hero({ onScrollToExplore }: HeroProps) {
  return (
    <header className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Ambient lighting to highlight the void */}
      <div className="ambient-light w-[65vw] h-[65vw] max-w-[800px] max-h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#1c1c1c] to-[#0a0a0a] opacity-30 pointer-events-none" />

      <div className="z-10 text-center max-w-5xl px-6 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-serif leading-[1.06] tracking-tight mb-8 text-white"
        >
          Loomz: Structural
          <br />
          <span className="italic text-white font-light">Eastern Wear.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-14 bg-white/30 mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-light tracking-[0.22em] uppercase text-[#888888] max-w-xl leading-relaxed text-center"
        >
          Architectural bespoke sherwanis, tailored karandi kurtas, and structured outerwear engineered with concealed plackets, mandarin collars, and geometric threadwork.
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        id="scroll-indicator-btn"
        onClick={onScrollToExplore}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 cursor-pointer group"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-[#888888] group-hover:text-white transition-colors">
          Discover
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#888888] via-[#888888]/40 to-transparent group-hover:from-white transition-colors" />
        <ChevronDown className="w-3.5 h-3.5 text-[#888888] group-hover:text-white transition-transform group-hover:translate-y-1" />
      </motion.button>
    </header>
  );
}
