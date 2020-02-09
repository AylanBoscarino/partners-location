import { GeoJsonType } from '../geojson.interface';

export type CoordinateTypeRecord = Record<GeoJsonType, (args: any) => boolean>;

export class CoortinatesValidator implements CoordinateTypeRecord {
  MultiPolygon(args: any) {
    try {
      const [long, lat] = args[0][0][0];
      if (this.areNumbers(long, lat)) {
        return true;
      }
    } catch {}
    return false;
  }

  Point(args: any) {
    try {
      const [long, lat] = args;
      if (this.areNumbers(long, lat)) {
        return true;
      }
    } catch {}
    return false;
  }

  private areNumbers(...args: any[]) {
    for (const item of args) {
      if (typeof item !== 'number') return false;
    }
    return true;
  }
}
