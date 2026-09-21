import { ModuleCategory } from '../types';

interface FooterProps {
  onOpenInquiry: () => void;
  onSelectCategory: (category: ModuleCategory) => void;
}

export function Footer({ onOpenInquiry, onSelectCategory }: FooterProps) {
  return (
    <footer className="mt-32 border-t border-white/10 relative z-10 bg-[#0A0A0A]">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="text-2xl font-serif tracking-[0.25em] uppercase font-medium mb-6 text-white">
            Loomz
          </div>
          <p className="text-sm text-[#888888] font-light max-w-xs leading-relaxed">
            The Architecture of Eastern Drape.
            <br />
            Lahore & London / Global Atelier Commissions.
          </p>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#888888] mb-6">
            Collection
          </h4>
          <ul className="space-y-4 text-sm font-light text-[#888888]">
            <li>
              <a
                href="#narrative-section"
                className="hover:text-white transition-colors"
              >
                Atelier Ethos
              </a>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('sherwani')}
                className="hover:text-white transition-colors text-left"
              >
                Bespoke Sherwani
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('kurta')}
                className="hover:text-white transition-colors text-left"
              >
                Tailored Karandi Kurta
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('prince-coat')}
                className="hover:text-white transition-colors text-left"
              >
                Structured Prince Coat
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('waistcoat')}
                className="hover:text-white transition-colors text-left"
              >
                Raw Silk Waistcoat
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] uppercase tracking-[0.3em] text-[#888888] mb-6">
            Atelier
          </h4>
          <ul className="space-y-4 text-sm font-light text-[#888888]">
            <li>
              <button
                onClick={onOpenInquiry}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                Bespoke Inquiries
              </button>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Editorial Journal
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Press & Archive
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#888888]">
        <p>&copy; 2026 Loomz Structural Eastern Wear. All rights reserved.</p>
        <p className="mt-2 md:mt-0 font-light">Structure in Every Seam.</p>
      </div>
    </footer>
  );
}
