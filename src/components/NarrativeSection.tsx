import { motion } from 'motion/react';

export function NarrativeSection() {
  return (
    <section id="narrative-section" className="py-28 md:py-44 px-6 md:px-12 max-w-[1400px] mx-auto relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-5"
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#888888] mb-4 block">
            Atelier Ethos
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-[1.18] text-white">
            Eastern silhouettes engineered for architectural presence.
          </h2>
        </motion.div>

        <div className="md:col-span-1 hidden md:block" />

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-6 space-y-6"
        >
          <p className="text-[#888888] leading-relaxed font-light text-base sm:text-lg md:text-xl">
            We approach luxury Pakistani menswear not through decorative embellishment, but as an architectural discipline in drape, contour, and textile permanence. Every bespoke sherwani, karandi kurta, prince coat, and raw silk waistcoat is calibrated around structural form.
          </p>
          <p className="text-[#888888] leading-relaxed font-light text-sm sm:text-base md:text-lg">
            Sourcing heritage hand-spun Karandi, slubbed tussar silks, and crisp tropical worsteds, our ateliers prioritize full floating horsehair canvases, stiffened mandarin collars, concealed blind plackets, and geometric threadwork. The outcome is Eastern menswear of quiet authority and technical mastery.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
