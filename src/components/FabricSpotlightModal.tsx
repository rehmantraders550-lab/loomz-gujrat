import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Layers,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Sliders,
  Sparkles,
  Info,
  ShieldCheck,
  Compass,
  Activity,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react';
import { FabricSpotlightData, getFabricSpotlight } from '../data/fabrics';
import { SpatialModule } from '../types';

interface FabricSpotlightModalProps {
  isOpen: boolean;
  fabricKey: string | null;
  module?: SpatialModule | null;
  onClose: () => void;
}

export function FabricSpotlightModal({
  isOpen,
  fabricKey,
  module,
  onClose,
}: FabricSpotlightModalProps) {
  const [activeTab, setActiveTab] = useState<'texture' | 'weave' | 'metrics'>('texture');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [lensPos, setLensPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [hoveredThread, setHoveredThread] = useState<{ type: 'warp' | 'weft'; index: number } | null>(null);
  const [isSimulatingLoom, setIsSimulatingLoom] = useState(false);
  const [loomRowStep, setLoomRowStep] = useState(0);
  const [colorMode, setColorMode] = useState<'monochrome' | 'blueprint' | 'thermal'>('monochrome');

  const fabricData: FabricSpotlightData | null = fabricKey ? getFabricSpotlight(fabricKey) : null;
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Loom shuttle simulation loop
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isSimulatingLoom && fabricData) {
      timer = setInterval(() => {
        setLoomRowStep((prev) => (prev + 1) % fabricData.weavingPattern.gridSize);
      }, 450);
    }
    return () => clearInterval(timer);
  }, [isSimulatingLoom, fabricData]);

  if (!isOpen || !fabricData) return null;

  // Handle magnifying lens coordinates
  const handleMouseMoveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setLensPos({ x, y });
  };

  const pattern = fabricData.weavingPattern;

  return (
    <AnimatePresence>
      <div
        id="fabric-spotlight-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="fabric-spotlight-dialog"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#0e0e0e] border border-white/15 text-[#f5f5f7] shadow-[0_32px_96px_-16px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* =======================================================================
             MODAL TOPBAR: Technical Breadcrumbs & Close
             ======================================================================= */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-lg bg-white/10 border border-white/10 text-white">
                <Layers className="w-4 h-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-mono">
                    Fabric Spotlight // {fabricData.technicalCode}
                  </span>
                  {module && (
                    <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-white/5 text-[#aaaaaa] border border-white/10">
                      {module.title}
                    </span>
                  )}
                </div>
                <h3 className="text-lg sm:text-xl font-serif text-white uppercase tracking-wider">
                  {fabricData.name}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="close-fabric-spotlight-btn"
                onClick={onClose}
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-black transition-all duration-200 flex items-center justify-center text-[#aaaaaa] cursor-pointer"
                title="Close Fabric Spotlight (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =======================================================================
             NAVIGATION TABS: Texture Loupe vs Weaving Pattern vs Benchmarks
             ======================================================================= */}
          <div className="flex items-center justify-between px-6 py-2.5 border-b border-white/10 bg-black/40 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('texture')}
                className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all ${
                  activeTab === 'texture'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#888888] hover:text-white hover:bg-white/5'
                }`}
              >
                Macro Texture & Loupe
              </button>
              <button
                onClick={() => setActiveTab('weave')}
                className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all ${
                  activeTab === 'weave'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#888888] hover:text-white hover:bg-white/5'
                }`}
              >
                Weaving Pattern Simulator
              </button>
              <button
                onClick={() => setActiveTab('metrics')}
                className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-sans font-medium transition-all ${
                  activeTab === 'metrics'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-[#888888] hover:text-white hover:bg-white/5'
                }`}
              >
                Structural Physics & Specs
              </button>
            </div>

            <span className="hidden md:inline-block text-[9px] font-mono uppercase tracking-[0.2em] text-[#666666]">
              {fabricData.originAtelier}
            </span>
          </div>

          {/* =======================================================================
             TAB CONTENTS
             ======================================================================= */}
          <div className="p-6 overflow-y-auto flex-grow space-y-6">
            {/* TAB 1: MACRO TEXTURE & INTERACTIVE LOUPE */}
            {activeTab === 'texture' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Visual Viewport with Zoom & Loupe */}
                <div className="lg:col-span-8 space-y-3">
                  <div
                    ref={imageContainerRef}
                    onMouseEnter={() => setIsHoveringImage(true)}
                    onMouseLeave={() => setIsHoveringImage(false)}
                    onMouseMove={handleMouseMoveImage}
                    className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-[#050505] cursor-crosshair group select-none"
                  >
                    {/* Primary High-Resolution Texture Image */}
                    <img
                      src={zoomLevel === 1 ? fabricData.primaryImage : fabricData.macroImage}
                      alt={fabricData.name}
                      className="w-full h-full object-cover transition-transform duration-300 ease-out"
                      style={{
                        transform:
                          zoomLevel > 1
                            ? `scale(${zoomLevel}) translate(-${(lensPos.x - 50) * (zoomLevel - 1)}%, -${(lensPos.y - 50) * (zoomLevel - 1)}%)`
                            : 'scale(1)',
                        transformOrigin: `${lensPos.x}% ${lensPos.y}%`,
                      }}
                    />

                    {/* Interactive Magnifying Reticle / Viewfinder on Hover */}
                    {isHoveringImage && zoomLevel === 1 && (
                      <div
                        className="absolute w-36 h-36 rounded-full border border-white/60 pointer-events-none -translate-x-1/2 -translate-y-1/2 shadow-2xl overflow-hidden backdrop-blur-[1px]"
                        style={{
                          left: `${lensPos.x}%`,
                          top: `${lensPos.y}%`,
                          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255,255,255,0.3)',
                        }}
                      >
                        {/* Mirrored magnified portion inside the loupe */}
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url(${fabricData.macroImage})`,
                            backgroundPosition: `${lensPos.x}% ${lensPos.y}%`,
                            backgroundSize: '400%',
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-2 h-2 rounded-full bg-white/60" />
                        </div>
                      </div>
                    )}

                    {/* HUD Lens Overlay */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-[0.2em] font-mono text-white">
                        {zoomLevel > 1 ? `${zoomLevel}x Macro Zoom` : 'Hover to Inspect Loupe'}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[9px] uppercase tracking-[0.2em] font-mono text-[#888888]">
                        Coord: {lensPos.x.toFixed(0)}%, {lensPos.y.toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  {/* Zoom Controls */}
                  <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-mono">
                        Magnification:
                      </span>
                      {[1, 2, 4].map((z) => (
                        <button
                          key={z}
                          onClick={() => setZoomLevel(z)}
                          className={`px-3 py-1 rounded-lg text-[10px] font-mono uppercase tracking-[0.18em] transition-all ${
                            zoomLevel === z
                              ? 'bg-white text-black font-semibold shadow-sm'
                              : 'border border-white/10 text-[#888888] hover:text-white'
                          }`}
                        >
                          {z}x
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-[#888888] font-sans">
                      {fabricData.category}
                    </p>
                  </div>
                </div>

                {/* Textile Narrative & Key Fast Facts */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#888888] font-sans font-medium block">
                      Textile Architecture
                    </span>
                    <p className="text-xs sm:text-sm text-[#cccccc] font-light leading-relaxed">
                      {fabricData.editorialDescription}
                    </p>
                  </div>

                  {/* Tactile Highlights */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#888888] font-sans font-medium block">
                      Tactile Traits & Hand Feel
                    </span>
                    <ul className="space-y-2">
                      {fabricData.tactileCharacteristics.map((trait, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-[#aaaaaa]">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-1.5 shrink-0" />
                          <span>{trait}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Spec Matrix */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-3 rounded-xl border border-white/10 bg-black/40">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#888888] font-mono block mb-1">
                        Weight / Gauge
                      </span>
                      <span className="text-sm font-mono text-white font-medium">
                        {fabricData.metrics.gsm} GSM
                      </span>
                    </div>
                    <div className="p-3 rounded-xl border border-white/10 bg-black/40">
                      <span className="text-[8px] uppercase tracking-[0.2em] text-[#888888] font-mono block mb-1">
                        Tensile Load
                      </span>
                      <span className="text-xs font-mono text-white font-medium truncate block">
                        {fabricData.metrics.tensileLoad.split(' ')[0]} N
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: TECHNICAL WEAVING PATTERN SIMULATOR */}
            {activeTab === 'weave' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Interactive Weave Matrix Grid */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-6 rounded-2xl border border-white/10 bg-[#070707] space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-mono block">
                          Loom Draft Drawdown Plan
                        </span>
                        <h4 className="text-sm font-sans font-medium text-white">
                          {pattern.draftType}
                        </h4>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setIsSimulatingLoom(!isSimulatingLoom)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-mono transition-all ${
                            isSimulatingLoom
                              ? 'bg-emerald-500 text-black font-semibold'
                              : 'border border-white/15 text-[#888888] hover:text-white'
                          }`}
                          title="Simulate Weft Shuttle Insertion"
                        >
                          {isSimulatingLoom ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          <span>{isSimulatingLoom ? 'Loom Running' : 'Cycle Loom'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setColorMode((prev) =>
                              prev === 'monochrome'
                                ? 'blueprint'
                                : prev === 'blueprint'
                                ? 'thermal'
                                : 'monochrome'
                            );
                          }}
                          className="px-2.5 py-1.5 rounded-full border border-white/15 text-[9px] uppercase tracking-[0.2em] font-mono text-[#888888] hover:text-white"
                          title="Cycle Weave Display Palette"
                        >
                          Palette: {colorMode}
                        </button>
                      </div>
                    </div>

                    {/* Interactive Thread Matrix Viewport */}
                    <div className="relative aspect-square max-w-[420px] mx-auto p-4 rounded-xl border border-white/10 bg-[#0a0a0a] shadow-inner flex flex-col justify-between">
                      {/* Column Markers (Warp Threads) */}
                      <div className="flex justify-between px-1 mb-1">
                        {Array.from({ length: pattern.gridSize }).map((_, c) => (
                          <span
                            key={c}
                            onMouseEnter={() => setHoveredThread({ type: 'warp', index: c })}
                            onMouseLeave={() => setHoveredThread(null)}
                            className={`text-[8px] font-mono transition-colors cursor-pointer w-7 text-center ${
                              hoveredThread?.type === 'warp' && hoveredThread.index === c
                                ? 'text-white font-bold underline'
                                : 'text-[#555555]'
                            }`}
                          >
                            W{c + 1}
                          </span>
                        ))}
                      </div>

                      {/* Weave Interlacing Matrix */}
                      <div className="grid gap-1 flex-grow" style={{ gridTemplateRows: `repeat(${pattern.gridSize}, 1fr)` }}>
                        {pattern.matrix.map((row, r) => {
                          const isCurrentLoomRow = isSimulatingLoom && loomRowStep === r;
                          return (
                            <div
                              key={r}
                              className={`grid gap-1 items-center transition-all ${
                                isCurrentLoomRow ? 'ring-1 ring-white/50 bg-white/[0.04] rounded' : ''
                              }`}
                              style={{ gridTemplateColumns: `repeat(${pattern.gridSize}, 1fr)` }}
                            >
                              {row.map((val, c) => {
                                const isWarpUp = val === 1;
                                const isHighlightedWarp = hoveredThread?.type === 'warp' && hoveredThread.index === c;
                                const isHighlightedWeft = hoveredThread?.type === 'weft' && hoveredThread.index === r;

                                // Palette selection
                                let cellColor = isWarpUp ? '#262626' : '#111111';
                                if (colorMode === 'blueprint') {
                                  cellColor = isWarpUp ? '#1e3a8a' : '#0f172a';
                                } else if (colorMode === 'thermal') {
                                  cellColor = isWarpUp ? '#dc2626' : '#7f1d1d';
                                }

                                if (isHighlightedWarp || isHighlightedWeft) {
                                  cellColor = '#ffffff';
                                }

                                return (
                                  <div
                                    key={c}
                                    onMouseEnter={() =>
                                      setHoveredThread({ type: isWarpUp ? 'warp' : 'weft', index: isWarpUp ? c : r })
                                    }
                                    onMouseLeave={() => setHoveredThread(null)}
                                    title={`Row ${r + 1} Col ${c + 1}: ${isWarpUp ? 'Warp Up (Over)' : 'Weft Up (Float)'}`}
                                    className="h-full rounded-sm transition-all duration-200 cursor-pointer flex items-center justify-center relative shadow-sm hover:scale-110 hover:z-10"
                                    style={{
                                      backgroundColor: cellColor,
                                      border: isWarpUp ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.04)',
                                    }}
                                  >
                                    <span className="text-[7px] font-mono text-white/30 select-none pointer-events-none">
                                      {isWarpUp ? '↑' : '—'}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>

                      {/* Row Legend Indicators */}
                      <div className="flex justify-between items-center pt-2 text-[8px] font-mono text-[#666666] border-t border-white/5 mt-2">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#262626] border border-white/20 inline-block" />
                          Warp Thread (Vertical)
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-sm bg-[#111111] border border-white/5 inline-block" />
                          Weft Float (Horizontal)
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] text-center text-[#888888] font-mono">
                      {pattern.repeatInfo} · Hover over cells to identify yarn paths
                    </p>
                  </div>
                </div>

                {/* Thread & Yarn Engineering Data */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Selected Yarn Realtime Telemetry */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-mono">
                        Yarn Telemetry Inspection
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-[9px] font-mono text-white">
                        {hoveredThread
                          ? `${hoveredThread.type.toUpperCase()} #${hoveredThread.index + 1}`
                          : 'LIVE SENSOR'}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#888888] font-mono block">
                          Warp Fiber Spec (Longitudinal Tensile Spine)
                        </span>
                        <h5 className="text-xs font-semibold text-white font-sans mt-0.5">
                          {fabricData.yarns.warp.fiber}
                        </h5>
                        <p className="text-[11px] text-[#aaaaaa] font-mono mt-0.5">
                          Count: {fabricData.yarns.warp.count} · {fabricData.yarns.warp.twist}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#888888] font-mono block">
                          Weft Insertion Spec (Transverse Character Weft)
                        </span>
                        <h5 className="text-xs font-semibold text-white font-sans mt-0.5">
                          {fabricData.yarns.weft.fiber}
                        </h5>
                        <p className="text-[11px] text-[#aaaaaa] font-mono mt-0.5">
                          Count: {fabricData.yarns.weft.count} · {fabricData.yarns.weft.twist}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Loom & Atelier Mechanics */}
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#888888] font-mono block">
                      Loom Mechanics & Thread Density
                    </span>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#888888]">Loom Architecture</span>
                        <span className="text-white font-medium text-right max-w-[200px]">{fabricData.loomType}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#888888]">Warp Density (EPI)</span>
                        <span className="font-mono text-white">{fabricData.threadDensity.epi} Ends/Inch</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-white/5">
                        <span className="text-[#888888]">Weft Density (PPI)</span>
                        <span className="font-mono text-white">{fabricData.threadDensity.ppi} Picks/Inch</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-[#888888]">Packaging Density</span>
                        <span className="text-white">{fabricData.threadDensity.totalGauge}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STRUCTURAL PHYSICS & SPECS */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                {/* High Level Benchmark Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between text-[#888888]">
                      <span className="text-[9px] uppercase tracking-[0.25em] font-mono">Mass Weight</span>
                      <Activity className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-2xl font-serif text-white">{fabricData.metrics.gsm} GSM</div>
                    <p className="text-[10px] text-[#888888] font-sans">Gram metric per square meter</p>
                  </div>

                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between text-[#888888]">
                      <span className="text-[9px] uppercase tracking-[0.25em] font-mono">Drape Coefficient</span>
                      <Compass className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-lg sm:text-xl font-serif text-white truncate">
                      {fabricData.metrics.drapeScore.split(' ')[0]}
                    </div>
                    <p className="text-[10px] text-[#888888] font-sans">
                      {fabricData.metrics.drapeScore.replace(/^[\d.]+\s*/, '')}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between text-[#888888]">
                      <span className="text-[9px] uppercase tracking-[0.25em] font-mono">Tensile Breaking</span>
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-lg sm:text-xl font-serif text-white truncate">
                      {fabricData.metrics.tensileLoad.split(' ')[0]} N
                    </div>
                    <p className="text-[10px] text-[#888888] font-sans">ISO 13934-1 Warp Tensile Load</p>
                  </div>

                  <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] space-y-1.5">
                    <div className="flex items-center justify-between text-[#888888]">
                      <span className="text-[9px] uppercase tracking-[0.25em] font-mono">Luster Grade</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-sm font-sans font-medium text-white truncate">
                      {fabricData.metrics.luster}
                    </div>
                    <p className="text-[10px] text-[#888888] font-sans">Reflectance under studio raking light</p>
                  </div>
                </div>

                {/* Conservation & Garment Longevity */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] space-y-4">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#888888]" />
                    <h4 className="text-xs uppercase tracking-[0.25em] text-white font-mono font-medium">
                      Atelier Conservation & Care Standards
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {fabricData.conservationNotes.map((note, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-white/10 bg-black/40 text-xs text-[#aaaaaa] leading-relaxed">
                        <span className="text-[9px] font-mono text-[#666666] block mb-1">0{idx + 1} // RULE</span>
                        {note}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =======================================================================
             MODAL FOOTER: Atelier Authentication Tag
             ======================================================================= */}
          <div className="px-6 py-4 border-t border-white/10 bg-black/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#888888] text-[10px] uppercase tracking-[0.2em] font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Certified Handloom & Technical Specimen // Eastern Menswear Architecture
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-white text-black text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#e0e0e0] transition-colors"
            >
              Return to Catalog
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
