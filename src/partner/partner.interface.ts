import { Document } from 'mongoose';

export interface PartnerInterface {
  id: number;
  tradingName: string;
  ownerName: string;
  document: string;
  coverageArea: MultiPolygon;
  address: Point;
}

export type PartnerInterfaceDocument = PartnerInterface & Document;

export type MultiPolygon = {
  type: 'MultiPolygon';
  coordinates: [number, number][][][];
};

export type Point = {
  type: 'Point';
  coordinates: [number, number];
};
