import { IsNotEmpty } from 'class-validator';
import { IsGeoJson } from '../util/decorators';
import { MultiPolygon, Point } from './partner.interface';
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
