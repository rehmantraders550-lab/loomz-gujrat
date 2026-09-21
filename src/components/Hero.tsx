import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ChevronDown, Play, Pause, RotateCcw, Scan, Sparkles, Sliders } from 'lucide-react';
import { AtmosphericDustMotes } from './AtmosphericDustMotes';

interface HeroProps {
  onScrollToExplore: () => void;
}

/**
 * Camera preset focal stages representing the cinematic camera pullback
 * seen in the bespoke obsidian sherwani reveal sequence.
 */
type CameraStage = 'macro' | 'placket' | 'silhouette';

interface CameraPreset {
  id: CameraStage;
  label: string;
  sublabel: string;
  scale: number;
  originX: number; // percentage
  originY: number; // percentage
  lens: string;
  shutter: string;
  focusTarget: string;
}

const CAMERA_PRESETS: CameraPreset[] = [
  {
    id: 'macro',
    label: 'Macro Detail',
    sublabel: '2.8x Stitches',
    scale: 2.75,
    originX: 52,
    originY: 26,
    lens: '85mm Macro T1.5',
    shutter: '1/48s 180°',
    focusTarget: 'Tone-on-tone embroidery & textured buttons',
  },
  {
    id: 'placket',
    label: 'Mandarin Collar',
    sublabel: '1.8x Placket',
    scale: 1.78,
    originX: 50,
    originY: 22,
    lens: '50mm Prime T1.8',
    shutter: '1/48s 180°',
    focusTarget: '4.2cm reinforced band & concealed fly',
  },
  {
    id: 'silhouette',
    label: 'Full Posture',
    sublabel: '1.0x Silhouette',
    scale: 1.05,
    originX: 50,
    originY: 38,
    lens: '28mm Cine Wide',
    shutter: '1/48s 180°',
    focusTarget: 'Architectural silhouette & floor-length drape',
  },
];

export function Hero({ onScrollToExplore }: HeroProps) {
  const containerRef = useRef<HTMLElement>(null);

  // Cinematic timeline & playback state (0.0 to 1.0 representing the 0s -> 7s pull-back)
  const [progress, setProgress] = useState(0.0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeStage, setActiveStage] = useState<CameraStage>('macro');
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Scroll parallax integration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scrollScaleSpring = useSpring(
    useTransform(scrollYProgress, [0, 1], [1, 0.9]),
    { damping: 25, stiffness: 180 }
  );

  const scrollOpacitySpring = useSpring(
    useTransform(scrollYProgress, [0, 0.75], [1, 0]),
    { damping: 25, stiffness: 180 }
  );

  // Duration of complete cinematic pull-back cycle in milliseconds (7 seconds, matching the video)
  const CYCLE_DURATION_MS = 8500;

  // Animation frame loop for continuous cinematic zoom trajectory
  const updatePlayback = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (isPlaying && !isHoveringControls) {
        setProgress((prev) => {
          const next = prev + delta / CYCLE_DURATION_MS;
          if (next >= 1.0) {
            // Pause momentarily at full silhouette before seamless subtle loop
            return 0.0;
          }
          return next;
        });
      }

      animFrameRef.current = requestAnimationFrame(updatePlayback);
    },
    [isPlaying, isHoveringControls]
  );

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(updatePlayback);
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [updatePlayback]);

  // Synchronize active preset stage with progress
  useEffect(() => {
    if (progress < 0.35) {
      setActiveStage('macro');
    } else if (progress < 0.7) {
      setActiveStage('placket');
    } else {
      setActiveStage('silhouette');
    }
  }, [progress]);

  // Interpolate camera scale and origin based on current progress
  const currentScale = 2.75 - (2.75 - 1.05) * progress;
  const currentOriginX = 52 - (52 - 50) * progress;
  const currentOriginY = 26 + (38 - 26) * progress;

  // Jump to specific stage
  const handleSelectStage = (stage: CameraStage) => {
    setIsPlaying(false);
    setActiveStage(stage);
    if (stage === 'macro') setProgress(0.0);
    if (stage === 'placket') setProgress(0.5);
    if (stage === 'silhouette') setProgress(1.0);
  };

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
    lastTimeRef.current = null;
  };

  const handleRestart = () => {
    setProgress(0.0);
    setIsPlaying(true);
    lastTimeRef.current = null;
  };

  const currentSeconds = (progress * 7).toFixed(1);

  return (
    <header
      ref={containerRef}
      className="relative min-h-[95vh] sm:min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0A0A0A] pt-24 pb-12 select-none"
    >
      {/* =======================================================================
         1. CINEMATIC BACKGROUND CANVAS: Macro-to-Silhouette Camera Trajectory
         ======================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Camera Lens Plane */}
        <motion.div
          className="relative w-full h-full will-change-transform"
          style={{
            scale: scrollScaleSpring,
            transformOrigin: `${currentOriginX}% ${currentOriginY}%`,
          }}
          transition={{ ease: 'easeOut', duration: 0.15 }}
        >
          {/* Inner Image Container with dynamic scale interpolation */}
          <div
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${currentScale})`,
              transformOrigin: `${currentOriginX}% ${currentOriginY}%`,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=88&w=2400"
              alt="Editorial portrait of high-fashion male model wearing a structured bespoke obsidian sherwani with intricate embroidery"
              className="w-full h-full object-cover object-top opacity-55 brightness-90 contrast-110"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Embroidery Specular Light Gleam that travels across the chest stitches */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            animate={{
              opacity: [0.15, 0.45, 0.15],
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              background:
                'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.02) 45%, transparent 70%)',
            }}
          />
        </motion.div>

        {/* Volumetric Raking Light Beam (from top-left, matching the video's lighting shaft) */}
        <div
          className="absolute -top-[20%] -left-[15%] w-[80vw] h-[130vh] pointer-events-none z-10"
          style={{
            transform: 'rotate(-28deg)',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.08) 35%, rgba(255, 255, 255, 0.02) 65%, transparent 100%)',
            filter: 'blur(38px)',
          }}
        />

        {/* Second soft diffusion fill along light axis */}
        <div
          className="absolute top-0 left-0 w-[45vw] h-[75vh] pointer-events-none z-10"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 65%)',
            filter: 'blur(50px)',
          }}
        />

        {/* Drifting Atmospheric Micro Dust Motes */}
        <AtmosphericDustMotes />

        {/* Vignette Gradients framing typography and floor-length drape */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-transparent to-[#0A0A0A]/70 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/70 via-transparent to-[#0A0A0A]/70 pointer-events-none z-10" />
      </div>

      {/* =======================================================================
         2. TOP CAMERA TELEMETRY HUD: Viewfinder Metadata
         ======================================================================= */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 flex items-center justify-between pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.25em] text-[#888888] font-mono">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            {isPlaying ? 'REC // 24FPS' : 'PAUSED'}
          </span>
          <span className="hidden sm:inline-block text-[9px] uppercase tracking-[0.25em] text-[#666666] font-mono">
            31°32&apos;N 74°20&apos;E · ATELIER LAHORE
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex items-center gap-3"
        >
          <span className="text-[9px] uppercase tracking-[0.25em] text-[#888888] font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            FOCAL: {CAMERA_PRESETS.find((p) => p.id === activeStage)?.lens || '85mm Macro'}
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-white font-mono bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
            {currentScale.toFixed(2)}x
          </span>
        </motion.div>
      </div>

      {/* =======================================================================
         3. HERO EDITORIAL CONTENT: Typography & Staggered Motion
         ======================================================================= */}
      <motion.div
        style={{ opacity: scrollOpacitySpring }}
        className="relative z-20 text-center max-w-5xl mx-auto px-6 flex flex-col items-center my-auto py-8"
      >
        {/* Edition Sub-headline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md"
        >
          <Sparkles className="w-3 h-3 text-[#888888]" />
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#888888] font-medium font-sans">
            Edition 01 // Bespoke Obsidian Architecture
          </span>
        </motion.div>

        {/* Primary Headline with Staggered Entrance */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-serif leading-[1.04] tracking-tight mb-7 text-white drop-shadow-2xl"
        >
          Loomz: Structural
          <br />
          <span className="italic text-white font-light">Eastern Wear.</span>
        </motion.h1>

        {/* Architectural Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent mb-7"
        />

        {/* Editorial Narrative */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-[#888888] max-w-xl leading-relaxed text-center mb-8"
        >
          Architectural bespoke sherwanis, tailored karandi kurtas, and structured outerwear engineered with concealed plackets, mandarin collars, and geometric threadwork.
        </motion.p>

        {/* Direct Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={onScrollToExplore}
            className="px-7 py-3 rounded-full bg-white text-black text-[11px] uppercase tracking-[0.22em] font-medium font-sans hover:bg-[#e0e0e0] transition-all duration-300 shadow-xl shadow-white/5 hover:scale-[1.02]"
          >
            Explore Collection
          </button>

          <button
            onClick={() => handleSelectStage('macro')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-[11px] uppercase tracking-[0.22em] font-medium text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300"
          >
            <Scan className="w-3.5 h-3.5 text-[#888888]" />
            <span>Inspect Macro Stitches</span>
          </button>
        </motion.div>
      </motion.div>

      {/* =======================================================================
         4. FLOATING CAMERA CONTROLLER & TIMELINE SCRUBBER: The Video Sequence
         ======================================================================= */}
      <div
        className="relative z-30 max-w-4xl w-full mx-auto px-4 sm:px-6"
        onMouseEnter={() => setIsHoveringControls(true)}
        onMouseLeave={() => setIsHoveringControls(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.75 }}
          className="glass-panel rounded-2xl sm:rounded-full p-2.5 sm:px-5 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 border border-white/10 bg-black/70 backdrop-blur-xl shadow-2xl"
        >
          {/* Stage Buttons */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-center sm:justify-start">
            {CAMERA_PRESETS.map((preset) => {
              const isCurrent = activeStage === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectStage(preset.id)}
                  className={`px-3 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-mono transition-all duration-300 ${
                    isCurrent
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'text-[#888888] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          {/* Interactive Timeline Progress & Transport Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Scrub Slider */}
            <div className="flex items-center gap-2 flex-grow sm:w-44">
              <span className="text-[9px] font-mono text-[#888888] w-8">
                00:0{currentSeconds}
              </span>
              <div
                className="relative flex-grow h-1.5 rounded-full bg-white/10 cursor-pointer overflow-hidden group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setProgress(ratio);
                  setIsPlaying(false);
                }}
              >
                <div
                  className="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-100"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-[9px] font-mono text-[#666666]">00:07</span>
            </div>

            {/* Play/Pause & Replay Controls */}
            <div className="flex items-center gap-1 border-l border-white/10 pl-2">
              <button
                onClick={handleTogglePlay}
                title={isPlaying ? 'Pause Cinematic Trajectory' : 'Play Cinematic Trajectory'}
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#888888] hover:text-white hover:bg-white/10 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>

              <button
                onClick={handleRestart}
                title="Restart Reveal Sequence"
                className="w-7 h-7 rounded-full flex items-center justify-center text-[#888888] hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =======================================================================
         5. BOTTOM SCROLL INDICATOR
         ======================================================================= */}
      <div className="relative z-20 flex justify-center pt-4">
        <motion.button
          id="scroll-indicator-btn"
          onClick={onScrollToExplore}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[8px] uppercase tracking-[0.35em] text-[#888888] group-hover:text-white transition-colors">
            Scroll To Explore
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#888888] via-[#888888]/30 to-transparent group-hover:from-white transition-colors" />
          <ChevronDown className="w-3 h-3 text-[#888888] group-hover:text-white transition-transform group-hover:translate-y-0.5" />
        </motion.button>
      </div>
    </header>
  );
}
