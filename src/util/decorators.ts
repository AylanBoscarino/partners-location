import {
  ValidationOptions,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { GeoJsonType } from '../partner/partner.interface';

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
        validate(value: Record<string, any>, _args: ValidationArguments) {
          if (value.type !== geoJsonType) {
            return false;
          }
          return coordinateValidator[value.type](value.coordinates);
        },
      },
    });
  };
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
