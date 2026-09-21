import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Layers, Tag } from 'lucide-react';
import { SpatialModule } from '../types';

/**
 * ProductCardProps defines the contractual interface for the modular product template.
 * @property module - Normalized garment entity injected into the modular loop
 * @property index - Zero-based index used for staggered entrance animations
 * @property onSelect - Callback triggered when activating the garment spec modal
 */
interface ProductCardProps {
  module: SpatialModule;
  index: number;
  onSelect: (module: SpatialModule) => void;
}

/**
 * ProductCard - Modular 3D Tilt & Parallax Template Block for Luxury Eastern Menswear
 * 
 * Implements:
 * - Reactive 3D tilt with physical spring dynamics (damping, stiffness, mass)
 * - Multi-layer parallax depth on portrait imagery, typography, and badges
 * - Dynamic specular glass sheen reflecting cursor angle
 * - Strict semantic HTML <article> with required data attributes
 */
export function ProductCard({ module, index, onSelect }: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null);

  // Normalized cursor coordinates (-0.5 to 0.5) from card center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Calibrated physics springs for a weighted, responsive Eastern luxury feel
  const springConfig = { damping: 22, stiffness: 190, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Subtle 3D angular tilt (constrained to 7 degrees for dignified, restrained elegance)
  const rotateX = useTransform(springY, [-0.5, 0.5], [6.5, -6.5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-6.5, 6.5]);

  // Layer 1: Image parallax translation (counter-movement for structural depth)
  const imageTranslateX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const imageTranslateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  // Layer 2: Content subtle parallax forward-shift
  const contentTranslateX = useTransform(springX, [-0.5, 0.5], [4, -4]);
  const contentTranslateY = useTransform(springY, [-0.5, 0.5], [4, -4]);

  // Layer 3: Dynamic specular glass reflection moving with cursor
  const glareOpacity = useTransform([springX, springY], ([x, y]: number[]) => {
    const dist = Math.hypot(x, y);
    return Math.min(dist * 0.5, 0.22);
  });

  const glareBackground = useTransform([springX, springY], ([x, y]: number[]) => {
    const posX = (x + 0.5) * 100;
    const posY = (y + 0.5) * 100;
    return `radial-gradient(circle at ${posX}% ${posY}%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.04) 35%, transparent 70%)`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    /* =========================================================================
       1. MODULAR TEMPLATE ROOT: Semantic <motion.article> with 3D tilt & data attributes
       ========================================================================= */
    <motion.article
      ref={cardRef}
      id={`product-card-${module.id}`}
      data-product-id={module.id}
      data-fabric-type={module.fabricType}
      data-price={module.price}
      className="product-card product-container glass-panel rounded-[1.75rem] overflow-hidden group cursor-pointer flex flex-col h-full relative select-none"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        scale: 1.018,
        transition: { duration: 0.25, ease: 'easeOut' },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(module)}
    >
      {/* =======================================================================
         DYNAMIC SPECULAR GLARE: Reacts smoothly to hover position across the glass
         ======================================================================= */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-30 rounded-[1.75rem]"
        style={{
          background: glareBackground,
          opacity: glareOpacity,
        }}
      />

      {/* =======================================================================
         2. VISUAL MEDIA CONTAINER: Portrait photography with parallax counter-shift
         ======================================================================= */}
      <div
        className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#0A0A0A] shrink-0"
        style={{ transform: 'translateZ(12px)' }}
      >
        {/* Parallax Image Plane */}
        <motion.div
          className="w-full h-full"
          style={{
            x: imageTranslateX,
            y: imageTranslateY,
            scale: 1.08,
          }}
        >
          <img
            src={module.image}
            alt={module.imageAlt}
            className="w-full h-full object-cover img-restrained object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
        </motion.div>

        {/* Multi-tier gradient overlay ensuring contrast against pure white headlines */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges: Category Classification and Price Tag with Elevated Depth */}
        <div
          className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Garment Taxonomy Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-[#888888] border border-white/10 font-sans font-medium shadow-lg">
            <Layers className="w-2.5 h-2.5 text-[#888888]" />
            {module.categoryLabel}
          </span>

          {/* Pricing Specification Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-[0.18em] text-white border border-white/10 font-sans font-medium shadow-lg">
            <Tag className="w-2.5 h-2.5 text-[#888888]" />
            {module.price}
          </span>
        </div>
      </div>

      {/* =======================================================================
         3. PRODUCT INFORMATION BODY: Parallax-stabilized typography & specs
         ======================================================================= */}
      <motion.div
        className="p-6 sm:p-7 flex flex-col justify-between flex-grow relative z-20"
        style={{
          x: contentTranslateX,
          y: contentTranslateY,
          transform: 'translateZ(24px)',
        }}
      >
        <div className="space-y-3">
          {/* Metadata Identifier */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#888888] font-sans font-medium block">
              {module.moduleNumber} / {module.categoryLabel}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-sans">
              {module.location}
            </span>
          </div>

          {/* Editorial Product Title */}
          <h3
            data-product-title
            className="product-title text-xl sm:text-2xl font-serif text-white uppercase leading-tight font-normal"
            style={{ letterSpacing: '0.1em' }}
          >
            {module.title}
          </h3>

          {/* Secondary Headline / Premium Textile Specification */}
          {module.subtitle && (
            <p
              data-product-subtitle
              className="product-subtitle font-sans text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#888888] font-medium"
              style={{ letterSpacing: '0.2em', color: '#888888' }}
            >
              {module.subtitle}
            </p>
          )}

          {/* Technical Tailoring Element Description */}
          <p className="text-xs sm:text-sm font-light text-[#888888] line-clamp-3 leading-relaxed">
            {module.description}
          </p>
        </div>

        {/* =====================================================================
           4. TECHNICAL FABRICS & SPEC MODAL TRIGGER
           ===================================================================== */}
        <div
          className="pt-6 mt-6 border-t border-white/10 space-y-4"
          style={{ transform: 'translateZ(28px)' }}
        >
          {/* Textile Composition Badges */}
          {module.materials && (
            <div className="flex flex-wrap gap-1.5">
              {module.materials.slice(0, 3).map((mat, i) => (
                <span
                  key={i}
                  data-product-spec
                  className="product-spec text-[9px] uppercase tracking-[0.18em] text-[#888888] font-sans font-medium border border-white/10 rounded-full px-2.5 py-1 bg-white/[0.02]"
                  style={{ letterSpacing: '0.18em', color: '#888888' }}
                >
                  {mat}
                </span>
              ))}
            </div>
          )}

          {/* Interactive Inspection Hook */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] group-hover:text-white transition-colors font-medium">
              View Blueprint Spec
            </span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}
