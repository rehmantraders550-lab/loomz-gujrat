import { motion } from 'motion/react';

export function MissionStatement() {
  return (
    <section
      id="mission-statement"
      className="py-20 sm:py-28 md:py-36 px-6 sm:px-8 max-w-5xl mx-auto relative z-10 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <div className="w-10 h-[1px] bg-white/20 mb-8 sm:mb-10" />

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-[1.32] sm:leading-[1.28] tracking-normal max-w-4xl mx-auto font-normal">
          Redefining the Eastern silhouette. Engineered precision meets heritage textiles.
        </h2>

        <div className="w-10 h-[1px] bg-white/20 mt-8 sm:mt-10" />
      </motion.div>
    </section>
  );
}
