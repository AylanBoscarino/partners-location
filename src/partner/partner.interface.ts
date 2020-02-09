import { Document } from 'mongoose';
import { MultiPolygon, Point } from '../geojson/geojson.interface';

export interface PartnerInterface {
  id: number;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: MultiPolygon;
  address: Point;
}

export type PartnerInterfaceDocument = PartnerInterface & Document;
