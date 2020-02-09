import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { GeoJsonType, GeoJson } from '../geojson/geojson.interface';

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
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return validateGeoJson(value, geoJsonType);
        },
      },
    });
  };
}

function validateGeoJson(value: GeoJson, type: GeoJsonType) {
  if (value.type !== type) {
    return false;
  }
  try {
    return coordinateValidator[value.type](value.coordinates);
  } catch {
    return false;
  }
}

const coordinateValidator: Record<GeoJsonType, (args: any[]) => boolean> = {
  MultiPolygon(args: any) {
    const [long, lat] = args[0][0][0];
    if (!!long && !!lat) {
      return true;
    }
    return false;
  },
  Point(args: any) {
    const [long, lat] = args;
    if (!!long && !!lat) {
      return true;
    }
    return false;
  },
};
