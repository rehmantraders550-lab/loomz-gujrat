export interface WeavingPatternSpec {
  gridSize: number; // e.g. 8x8 or 12x12
  matrix: number[][]; // 1 for warp-up, 0 for weft-up
  warpColor: string;
  weftColor: string;
  highlightWarpColor: string;
  highlightWeftColor: string;
  draftType: string;
  repeatInfo: string;
}

export interface FabricSpotlightData {
  id: string;
  name: string;
  technicalCode: string;
  category: string;
  primaryImage: string;
  macroImage: string;
  weavingType: string;
  loomType: string;
  originAtelier: string;
  threadDensity: {
    epi: number; // Ends Per Inch (warp)
    ppi: number; // Picks Per Inch (weft)
    totalGauge: string;
  };
  yarns: {
    warp: {
      fiber: string;
      count: string;
      twist: string;
    };
    weft: {
      fiber: string;
      count: string;
      twist: string;
    };
  };
  metrics: {
    gsm: number;
    tensileLoad: string; // e.g. "680 N"
    drapeScore: string; // e.g. "0.78 (Architectural Rigid)"
    breathability: string; // e.g. "12.4 cm³/cm²/s"
    luster: string; // e.g. "Subtle Matte Sheen"
  };
  tactileCharacteristics: string[];
  weavingPattern: WeavingPatternSpec;
  editorialDescription: string;
  conservationNotes: string[];
}

export const FABRIC_SPOTLIGHTS: Record<string, FabricSpotlightData> = {
  'Monochromatic Jamawar Detail': {
    id: 'monochromatic-jamawar',
    name: 'Monochromatic Obsidian Jamawar',
    technicalCode: 'TX-JMW-8801',
    category: 'Jacquard Brocade / Compound Weave',
    primaryImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=85&w=1600',
    macroImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=90&w=2000',
    weavingType: 'Compound Jacquard Figured Weft Float',
    loomType: '24-Harness Punched Card Jacquard Handloom',
    originAtelier: 'Lahore Walled City & Kashmir Border Atelier',
    threadDensity: {
      epi: 168,
      ppi: 124,
      totalGauge: 'High-Density Warp Packing',
    },
    yarns: {
      warp: {
        fiber: 'Filament Grade 6A Mulberry Silk',
        count: '20/22 Denier (Dual Ply)',
        twist: 'High-Twist Organzine (650 TPM Z-Twist)',
      },
      weft: {
        fiber: 'Spun Mulberry Silk & Raw Tussar Fluff',
        count: '60/2 Nm Count',
        twist: 'Low-Twist Tram (220 TPM S-Twist)',
      },
    },
    metrics: {
      gsm: 340,
      tensileLoad: '740 N / 5cm warp direction',
      drapeScore: '0.82 (Sculptural, Architectural Hold)',
      breathability: '14.2 cm³/cm²/s (Balanced Porosity)',
      luster: 'Deep Obsidian Dual-Tone Refraction',
    },
    tactileCharacteristics: [
      'Crisp hand feel with dense micro-ribbed tactile relief',
      'Engineered floating horsehair compatibility without blistering',
      'Deep light absorption with specular reflection along thread bevels',
      'Structural resistance against bias stretching and wrinkling',
    ],
    weavingPattern: {
      gridSize: 10,
      matrix: [
        [1, 0, 1, 1, 0, 1, 0, 0, 1, 1],
        [0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 1, 0, 0, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0, 0, 1, 0, 1, 1],
        [0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
        [1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
        [0, 1, 1, 0, 0, 1, 0, 1, 1, 0],
        [1, 0, 0, 1, 1, 0, 1, 0, 1, 1],
        [0, 1, 0, 1, 1, 1, 0, 0, 1, 0],
      ],
      warpColor: '#1a1a1a',
      weftColor: '#0d0d0d',
      highlightWarpColor: '#444444',
      highlightWeftColor: '#2b2b2b',
      draftType: 'Compound Jacquard Satin-Brocade Float',
      repeatInfo: '10x10 Thread Micro-Cell Repeat',
    },
    editorialDescription:
      'Woven by master weavers on 24-harness custom handlooms in old Lahore. Each square centimeter contains over 400 micro-interlacings of high-twist mulberry organzine warp and tonal tussar weft. The surface creates an architectural, sculpture-like drape that retains its razor-sharp silhouette under studio lighting.',
    conservationNotes: [
      'Store suspended on broad-shoulder contoured cedar hangers',
      'Specialist dry clean with non-aqueous petroleum solvents only',
      'Steam press with protective damp pressing cloth at low heat',
    ],
  },
  'Textured Khaddar': {
    id: 'textured-khaddar',
    name: 'Artisanal Handloom Textured Khaddar',
    technicalCode: 'TX-KHD-4202',
    category: 'Handloom Slub Plain Weave',
    primaryImage: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=85&w=1600',
    macroImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=90&w=2000',
    weavingType: '2/2 Plain Weave with Organic Slub Yarn Insertion',
    loomType: 'Traditional Wooden Pit Loom with Flying Shuttle',
    originAtelier: 'Haripur & Kamalia Rural Weaving Collectives',
    threadDensity: {
      epi: 72,
      ppi: 64,
      totalGauge: 'Organic Open-Pore Weave',
    },
    yarns: {
      warp: {
        fiber: 'Giza 88 Long-Staple Egyptian Cotton',
        count: '30/1 Ne Ring Spun',
        twist: 'Balanced Medium Twist (480 TPM Z-Twist)',
      },
      weft: {
        fiber: 'Organic Hand-Spun Desi Cotton with Natural Slubs',
        count: '16/1 Ne Hand Charkha Spun',
        twist: 'Variable Soft Twist (180–310 TPM)',
      },
    },
    metrics: {
      gsm: 285,
      tensileLoad: '520 N / 5cm warp direction',
      drapeScore: '0.64 (Crisp Yet Air-Permeable)',
      breathability: '42.8 cm³/cm²/s (High Air Permeability)',
      luster: 'Matte Earth Grain with Raw Slub Highlights',
    },
    tactileCharacteristics: [
      'Pronounced tactile slub ridges giving multidimensional grain',
      'High thermal regulation allowing year-round breathability',
      'Gets progressively softer with age while maintaining collar stiffness',
      'Absorbs ambient humidity without clinging to the body',
    ],
    weavingPattern: {
      gridSize: 8,
      matrix: [
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
      ],
      warpColor: '#242424',
      weftColor: '#171717',
      highlightWarpColor: '#525252',
      highlightWeftColor: '#383838',
      draftType: 'Plain Weave with Controlled Slub Variance',
      repeatInfo: 'Fundamental 2/2 Interlace with Irregular Weft Diameter',
    },
    editorialDescription:
      'Spun on wooden spinning wheels and woven on ancestral pit looms in rural Punjab. The natural irregular slub of hand-spun indigenous cotton yarns creates a distinctive raw texture that stands apart from homogenized industrial milling.',
    conservationNotes: [
      'Cold water wash with gentle enzymatic detergent',
      'Line dry away from direct UV exposure to preserve deep tone',
      'Iron while slightly damp for pristine crisp collar finish',
    ],
  },
  'Pure Boski Silk': {
    id: 'pure-boski-silk',
    name: 'Heritage Spun Pure Boski Silk',
    technicalCode: 'TX-BSK-1004',
    category: 'Spun Silk Heavy Satin Twill',
    primaryImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=1600',
    macroImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=90&w=2000',
    weavingType: '5-Harness Warp-Faced Satin Weave (16-Momme Weight)',
    loomType: 'High-Precision Dobby Shuttleless Air-Jet Loom',
    originAtelier: 'Historical Silk Route Import & Multan Finishing Atelier',
    threadDensity: {
      epi: 196,
      ppi: 110,
      totalGauge: 'Ultra-Dense Micro-Filament Compact',
    },
    yarns: {
      warp: {
        fiber: 'Grade 6A Pure Mulberry Filament Silk',
        count: '21D/2Ply Filament',
        twist: 'Crepe High Twist (720 TPM)',
      },
      weft: {
        fiber: 'Traditional Degummed Spun Silk Floss',
        count: '140/2 Nm Spun Silk',
        twist: 'Zero-Twist Floss with Natural Luster Core',
      },
    },
    metrics: {
      gsm: 210,
      tensileLoad: '610 N / 5cm warp direction',
      drapeScore: '0.42 (Fluid Waterfall Drape with Memory)',
      breathability: '28.5 cm³/cm²/s (Natural Protein Thermoregulation)',
      luster: 'Pearlescent Liquid Satin Luster',
    },
    tactileCharacteristics: [
      'Incomparable cool-touch tactile sensation on initial contact',
      'Signature Boski rustle (scroop) when fabric moves against itself',
      'Supple drape that accentuates structured pagoda shoulders',
      'Natural protein fiber regulates skin temperature continuously',
    ],
    weavingPattern: {
      gridSize: 10,
      matrix: [
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
      ],
      warpColor: '#2b2b2b',
      weftColor: '#121212',
      highlightWarpColor: '#6e6e6e',
      highlightWeftColor: '#3a3a3a',
      draftType: '5-End Sateen Weave with Long Surface Floats',
      repeatInfo: 'Step-of-2 Satin Dispersion Matrix',
    },
    editorialDescription:
      'Boski is the revered crown jewel of Eastern bespoke menswear. Formed through traditional sericulture and degumming techniques, this 16-momme spun silk features long warp floats that produce its signature pearlescent liquid sheen and tactile cooling sensation.',
    conservationNotes: [
      'Never spray perfume or alcohol directly on silk fibers',
      'Store wrapped in acid-free unbleached cotton muslin cloth',
      'Professional specialized silk dry cleaning only',
    ],
  },
  'Egyptian Cotton Blend': {
    id: 'egyptian-cotton-blend',
    name: 'Architectural Egyptian Cotton & Raw Tussar Blend',
    technicalCode: 'TX-EGY-6508',
    category: 'High-Twist Compact Dobby Twill',
    primaryImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=85&w=1600',
    macroImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=90&w=2000',
    weavingType: '3/1 Diagonal Left-Hand Technical Twill',
    loomType: 'Rapier Loom with Electronic Dobby Shedding',
    originAtelier: 'Karachi Specialized Fine Spinning & Lahore Dyehouse',
    threadDensity: {
      epi: 142,
      ppi: 98,
      totalGauge: 'High-Density Structural Twill',
    },
    yarns: {
      warp: {
        fiber: 'Extra-Long Staple Giza 92 Egyptian Cotton',
        count: '80/2 Ne Combed Compact Yarn',
        twist: 'High Warp Twist (760 TPM Z-Twist)',
      },
      weft: {
        fiber: 'Tussar Wild Silk & Combed Mako Cotton',
        count: '40/1 Ne Blended Slub',
        twist: 'Medium Twist (420 TPM S-Twist)',
      },
    },
    metrics: {
      gsm: 260,
      tensileLoad: '690 N / 5cm warp direction',
      drapeScore: '0.72 (Crisp Architectural Form Retention)',
      breathability: '22.0 cm³/cm²/s (Balanced Air Pass)',
      luster: 'Low-Luster Matte with Micro-Subtle Silk Flecks',
    },
    tactileCharacteristics: [
      'Impeccable structural recovery; resists seat and elbow creasing',
      'Smooth hand with microscopic textured slub flecks from wild tussar',
      'Crisp knife-edge pressed seam retention for waistcoat darts',
      'Subtle weight provides anchoring posture without bulk',
    ],
    weavingPattern: {
      gridSize: 8,
      matrix: [
        [1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 0, 1],
      ],
      warpColor: '#222222',
      weftColor: '#141414',
      highlightWarpColor: '#4f4f4f',
      highlightWeftColor: '#2f2f2f',
      draftType: '3/1 Diagonal Left-Hand Technical Twill',
      repeatInfo: '4-End Continuous Twill Wale Alignment',
    },
    editorialDescription:
      'Engineered specifically for mid-layer vests and waistcoats that demand sharp, non-collapsing darts. The extra-long staple Egyptian cotton provides supreme tensile stability, while wild tussar weft additions impart character and breathability.',
    conservationNotes: [
      'Wash inside out on gentle cycle with mild detergent',
      'Medium iron with steam for razor-sharp edge restoration',
      'Store flat or on structured hangers',
    ],
  },
};

/**
 * Fallback helper to resolve fabric data by fabricType string or material name.
 */
export function getFabricSpotlight(fabricKey: string): FabricSpotlightData {
  if (FABRIC_SPOTLIGHTS[fabricKey]) {
    return FABRIC_SPOTLIGHTS[fabricKey];
  }

  // Fuzzy match
  const lower = fabricKey.toLowerCase();
  for (const [key, data] of Object.entries(FABRIC_SPOTLIGHTS)) {
    if (
      lower.includes(key.toLowerCase()) ||
      key.toLowerCase().includes(lower) ||
      lower.includes(data.id)
    ) {
      return data;
    }
  }

  // Default to Jamawar
  return FABRIC_SPOTLIGHTS['Monochromatic Jamawar Detail'];
}
