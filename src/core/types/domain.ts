export type Direction = 'rtl' | 'ltr';
export type Language = 'en' | 'fa';

export interface Zone {
  id: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  width: number; // percentage (0-100)
  height: number; // percentage (0-100)
  label: string;
  defaultValue?: string;
}

export interface ZoneStyle {
  fontSize: number; // percentage of image height (0-100)
  color: string;
  direction: Direction;
  // Potentially font family later
}

export interface Template {
  id: string;
  name: string;
  imageData: string; // Base64 string
  width: number; // Original pixel width
  height: number; // Original pixel height
  zones: Zone[];
  createdAt: number;
  updatedAt: number;
}

export interface Document {
  id: string;
  templateId: string;
  values: Record<string, string>; // mapping zoneId -> text value
  styles: Record<string, ZoneStyle>; // mapping zoneId -> style overrides
  createdAt: number;
  updatedAt: number;
}
