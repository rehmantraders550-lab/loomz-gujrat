import { useState, useMemo } from 'react';
import { RotateCcw } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MissionStatement } from './components/MissionStatement';
import { NarrativeSection } from './components/NarrativeSection';
import { ProductCard } from './components/ProductCard';
import { CaseStudyModal } from './components/CaseStudyModal';
import { MenuModal } from './components/MenuModal';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';
import { SPATIAL_MODULES } from './data/modules';
import { ModuleCategory, SpatialModule } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory>('all');
  const [activeModule, setActiveModule] = useState<SpatialModule | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryTopic, setInquiryTopic] = useState<string | undefined>();
  const [animKey, setAnimKey] = useState(0);

  const filteredModules = useMemo(() => {
    if (selectedCategory === 'all') return SPATIAL_MODULES;
    return SPATIAL_MODULES.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenInquiry = (topic?: string) => {
    setInquiryTopic(topic);
    setIsInquiryOpen(true);
  };

  const handleScrollToExplore = () => {
    const el = document.getElementById('mission-statement') || document.getElementById('modules-gallery');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayAnimations = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#f5f5f7] selection:bg-white selection:text-black relative">
      {/* Background Subtle Ambient Glows - Restrained Monochrome */}
      <div className="ambient-light w-[80vw] h-[80vw] top-[20vh] right-[-20vw] bg-[#1a1a1a] opacity-15" />
      <div className="ambient-light w-[60vw] h-[60vw] top-[90vh] left-[-20vw] bg-[#141414] opacity-10" />

      {/* Main Fixed Navigation */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      <main>
        {/* Hero Section */}
        <Hero onScrollToExplore={handleScrollToExplore} />

        {/* Minimalist Centered Mission Statement */}
        <MissionStatement />

        {/* Product / Spatial Modules Showcase Section */}
        <section
          id="modules-gallery"
          className="py-16 sm:py-24 px-4 sm:px-6 md:px-8 relative z-10 scroll-mt-20"
        >
          <div className="max-w-[1600px] mx-auto">
            {/* Gallery Control Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 mb-8 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.35em] text-[#888888] block mb-2 font-medium">
                  Curated Collection / Edition I
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
                  Eastern Garment Architecture
                </h2>
              </div>

              {/* Filter Tabs & Re-play Animation Control */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex p-1 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md">
                  {(
                    [
                      { id: 'all', label: 'All Garments' },
                      { id: 'sherwani', label: 'Sherwani' },
                      { id: 'kurta', label: 'Karandi Kurta' },
                      { id: 'prince-coat', label: 'Prince Coat' },
                      { id: 'waistcoat', label: 'Raw Silk Waistcoat' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3.5 sm:px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300 font-medium ${
                        selectedCategory === tab.id
                          ? 'bg-white text-black shadow-lg shadow-white/10'
                          : 'text-[#888888] hover:text-white'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Animation retrigger button so user can test fade-in anytime */}
                <button
                  id="replay-animation-btn"
                  onClick={handleReplayAnimations}
                  title="Re-play fade-in animations on all product containers"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/10 text-[#888888] hover:text-white hover:border-white/30 text-[9px] uppercase tracking-[0.2em] transition-all duration-300 bg-white/[0.02]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden sm:inline">Re-play Fade-In</span>
                </button>
              </div>
            </div>

            {/* Modular CSS Grid Framework: scales automatically regardless of item count */}
            <div
              key={animKey}
              id="product-catalog-grid"
              className="catalog-grid product-grid gap-6 md:gap-8 items-stretch"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              }}
            >
              {filteredModules.map((module, index) => (
                <ProductCard
                  key={module.id}
                  module={module}
                  index={index}
                  onSelect={(m) => setActiveModule(m)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Narrative & Atelier Ethos Section */}
        <NarrativeSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenInquiry={() => handleOpenInquiry()}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToExplore();
        }}
      />

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        module={activeModule}
        onClose={() => setActiveModule(null)}
        onOpenInquiry={(title) => handleOpenInquiry(title)}
      />

      {/* Menu Drawer */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          handleScrollToExplore();
        }}
        onOpenInquiry={() => handleOpenInquiry()}
      />

      {/* Commission Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        defaultModule={inquiryTopic}
      />
    </div>
  );
}
