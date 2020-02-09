import { Document } from 'mongoose';

export interface CounterInterface {
  id: string;
  sequence_value: number;
}

export interface CounterInterfaceDocument extends CounterInterface, Document {
  id: string;
}
