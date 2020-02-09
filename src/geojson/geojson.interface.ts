export type GeoJsonType = 'MultiPolygon' | 'Point';

export interface GeoJson {
  type: GeoJsonType;
  coordinates: any[];
}

export interface MultiPolygon extends GeoJson {
  type: 'MultiPolygon';
  coordinates: [number, number][][][];
}

export interface Point extends GeoJson {
  type: 'Point';
  coordinates: [number, number];
}
