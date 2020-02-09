import { CreatePartnerDto } from '../../partner/create-partner.dto';
import { GeoJsonValidationArguments } from './decorators';
import { GeojsonValidator } from './geojson-validator';

describe('GeojsonValidator', () => {
  let geoJsonValidator: GeojsonValidator;
  let mockGeoJsonValidationArguments: GeoJsonValidationArguments;

  beforeEach(() => {
    geoJsonValidator = new GeojsonValidator();
    mockGeoJsonValidationArguments = {
      constraints: ['MultiPolygon'],
      object: {},
      property: '',
      targetName: '',
      value: 1,
    };
  });

  it('should be defined', () => {
    expect(geoJsonValidator).toBeDefined();
  });

  it('should validate MultiPolygon GeoJson', () => {
    const multiPolygon = mockedValue.coverageArea;
    const point = mockedValue.address;
    mockGeoJsonValidationArguments.constraints = ['MultiPolygon'];
    expect(
      geoJsonValidator.validate(multiPolygon, mockGeoJsonValidationArguments),
    ).toBe(true);
    expect(
      geoJsonValidator.validate(point, mockGeoJsonValidationArguments),
    ).toBe(false);
  });

  it('should validate Point GeoJson', () => {
    const point = mockedValue.address;
    const multiPolygon = mockedValue.coverageArea;
    mockGeoJsonValidationArguments.constraints = ['Point'];
    expect(
      geoJsonValidator.validate(point, mockGeoJsonValidationArguments),
    ).toBe(true);
    expect(
      geoJsonValidator.validate(multiPolygon, mockGeoJsonValidationArguments),
    ).toBe(false);
  });
});

const mockedValue: CreatePartnerDto = {
  tradingName: 'Adega da Cerveja - Pinheiros',
  ownerName: 'Zé da Silva',
  document: '1432132123891/0001', //CNPJ
  coverageArea: {
    type: 'MultiPolygon',
    coordinates: [
      [
        [
          [30, 20],
          [45, 40],
          [10, 40],
          [30, 20],
        ],
      ],
      [
        [
          [15, 5],
          [40, 10],
          [10, 20],
          [5, 10],
          [15, 5],
        ],
      ],
    ],
  },
  address: {
    type: 'Point',
    coordinates: [-46.57421, -21.785741],
  },
};
