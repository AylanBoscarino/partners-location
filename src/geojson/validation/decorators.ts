import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';

import { GeoJsonType } from '../geojson.interface';
import { GeojsonValidator } from './geojson-validator';

export function IsGeoJson(
  geoJsonType: GeoJsonType,
  validationOptions?: ValidationOptions,
) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isGeoJson',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [geoJsonType],
      options: validationOptions,
      validator: GeojsonValidator,
    });
  };
}

export interface GeoJsonValidationArguments extends ValidationArguments {
  constraints: [GeoJsonType];
}
