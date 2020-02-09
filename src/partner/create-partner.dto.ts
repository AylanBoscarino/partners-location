import { IsNotEmpty } from 'class-validator';

import { MultiPolygon, Point } from '../geojson/geojson.interface';
import { IsGeoJson } from '../util/decorators';

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
