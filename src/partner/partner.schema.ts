import { Schema } from 'mongoose';

export const PartnerSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  tradingName: { type: String, required: true },
  ownerName: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  coverageArea: {
    type: { type: String, enum: ['MultiPolygon'], required: true },
    coordinates: { type: [[[[Number]]]], required: true },
  },
  address: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true },
  },
});

PartnerSchema.index({ location: '2dsphere' });
