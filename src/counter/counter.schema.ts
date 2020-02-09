import { Schema } from 'mongoose';

export const CounterSchema = new Schema({
  id: { type: String, required: true, unique: true },
  sequence_value: { type: Number, required: true },
});
