import { IsNotEmpty } from 'class-validator';

import { IsGeoJson } from '../geojson/validation/decorators';
import { MultiPolygon, Point } from '../geojson/geojson.interface';

export class CreatePartnerDto {
  @IsNotEmpty()
  tradingName: string;

  @IsNotEmpty()
  ownerName: string;

  @IsNotEmpty()
  document: string;

  @IsGeoJson('MultiPolygon')
  coverageArea: MultiPolygon;

  @IsGeoJson('Point')
  address: Point;
}
