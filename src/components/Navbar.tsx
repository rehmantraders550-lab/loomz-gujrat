import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenInquiry: () => void;
}

export function Navbar({ onOpenMenu, onOpenInquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 transition-all duration-700 flex justify-between items-center ${
        scrolled
          ? 'bg-[#0A0A0A]/85 backdrop-blur-2xl border-b border-white/10 py-4'
          : 'bg-transparent py-8'
      }`}
    >
      <div className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#888888] hidden md:block">
        Est. 2026 / Lahore & London Atelier
      </div>

      <a
        href="#"
        className="text-2xl md:text-3xl font-serif tracking-[0.25em] uppercase font-medium text-white hover:text-white transition-colors duration-300"
      >
        Loomz
      </a>

      <div className="flex items-center gap-4">
        <button
          id="inquire-nav-btn"
          onClick={onOpenInquiry}
          className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] font-medium text-[#888888] hover:text-white py-2 px-3 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300"
        >
          <span>Inquire</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>

        <button
          id="menu-toggle-btn"
          onClick={onOpenMenu}
          className="text-[10px] uppercase tracking-[0.3em] font-medium text-[#888888] hover:text-white transition-colors duration-300 flex items-center gap-2 px-3 py-2 cursor-pointer"
          aria-label="Open menu"
        >
          <span>Menu</span>
          <span className="text-sm font-light leading-none">+</span>
        </button>
      </div>
    </nav>
  );
}
