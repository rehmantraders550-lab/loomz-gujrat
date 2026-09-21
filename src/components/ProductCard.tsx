import { useState, useEffect, useRef } from 'react';
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
 * ProductCard - Modular HTML Template Block for Luxury Eastern Menswear
 * 
 * Implements a strict, single semantic <article> template block decorated with:
 * - data-product-id: Unique product identifier
 * - data-fabric-type: Primary textile foundation for filtering and DOM querying
 * - data-price: Garment pricing specification
 * 
 * Designed to reside within a dynamic CSS Grid container:
 * display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
 */
export function ProductCard({ module, index, onSelect }: ProductCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  // Staggered transition delay based on grid injection index
  const transitionDelay = `${(index * 0.08).toFixed(2)}s`;

  // IntersectionObserver triggers smooth CSS fade-in when entering viewport
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      observer.observe(el);
      return () => observer.disconnect();
    } else {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }
  }, []);

  return (
    /* =========================================================================
       1. MODULAR TEMPLATE ROOT: Semantic <article> with required data attributes
       ========================================================================= */
    <article
      ref={cardRef}
      id={`product-card-${module.id}`}
      data-product-id={module.id}
      data-fabric-type={module.fabricType}
      data-price={module.price}
      className={`product-card product-container reveal-product ${
        isVisible ? 'is-visible active' : ''
      } glass-panel rounded-[1.75rem] overflow-hidden group cursor-pointer flex flex-col h-full relative`}
      style={{
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        transitionDelay: transitionDelay,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        ['--transition-delay' as string]: transitionDelay,
      }}
      onClick={() => onSelect(module)}
    >
      {/* =======================================================================
         2. VISUAL MEDIA CONTAINER: Portrait photography with contrast gradients
         ======================================================================= */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-[#0A0A0A] shrink-0">
        {/* Architectural Portrait Image */}
        <img
          src={module.image}
          alt={module.imageAlt}
          className="w-full h-full object-cover img-restrained object-top transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />

        {/* Multi-tier gradient overlay ensuring contrast against pure white headlines */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/60 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges: Category Classification and Price Tag */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
          {/* Garment Taxonomy Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[9px] uppercase tracking-[0.25em] text-[#888888] border border-white/10 font-sans font-medium">
            <Layers className="w-2.5 h-2.5 text-[#888888]" />
            {module.categoryLabel}
          </span>

          {/* Pricing Specification Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] uppercase tracking-[0.18em] text-white border border-white/10 font-sans font-medium">
            <Tag className="w-2.5 h-2.5 text-[#888888]" />
            {module.price}
          </span>
        </div>
      </div>

      {/* =======================================================================
         3. PRODUCT INFORMATION BODY: Editorial typography & technical metadata
         ======================================================================= */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow relative z-20">
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
        <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
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
      </div>
    </article>
  );
}
