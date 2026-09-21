export type ModuleCategory = 'all' | 'sherwani' | 'kurta' | 'prince-coat' | 'waistcoat';

export interface SpatialModule {
  id: string;
  moduleNumber: string;
  category: ModuleCategory;
  categoryLabel: string;
  title: string;
  subtitle?: string;
  fabricType: string;
  price: string;
  description: string;
  image: string;
  imageAlt: string;
  gridSpan?: 'wide' | 'medium' | 'full';
  aspectHeight?: string;
  stats?: {
    label: string;
    value: string;
  }[];
  materials?: string[];
  location?: string;
  year?: string;
}
