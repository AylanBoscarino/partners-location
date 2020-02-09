import { CoortinatesValidator } from './coortinates-validator';
import { MultiPolygon } from '../geojson.interface';

describe('CoortinatesValidator', () => {
  let coordinatesValidator: CoortinatesValidator;

  beforeEach(() => {
    coordinatesValidator = new CoortinatesValidator();
  });

  it('should be defined', () => {
    expect(coordinatesValidator).toBeDefined();
  });

  it('should validate MultiPolygon', () => {
    const validMultiPolygon: MultiPolygon = {
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
    };
    expect(
      coordinatesValidator[validMultiPolygon.type](
        validMultiPolygon.coordinates,
      ),
    ).toBe(true);
    expect(coordinatesValidator.MultiPolygon([1, 2])).toBe(false);
    expect(coordinatesValidator.MultiPolygon([[1, 2]])).toBe(false);
    expect(coordinatesValidator.MultiPolygon([[[1, 2]]])).toBe(false);
    expect(coordinatesValidator.MultiPolygon([[[['1', '2']]]])).toBe(false);
  });

  it('should validate Point', () => {
    const validPoint = {
      type: 'Point',
      coordinates: [-46.57421, -21.785741],
    };
    expect(coordinatesValidator[validPoint.type](validPoint.coordinates)).toBe(
      true,
    );
    expect(coordinatesValidator.Point(['1', '2'])).toBe(false);
    expect(coordinatesValidator.Point(1234)).toBe(false);
  });
});
