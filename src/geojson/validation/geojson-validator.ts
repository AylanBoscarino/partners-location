import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { GeoJsonValidationArguments } from './decorators';
import { CoortinatesValidator } from './coortinates-validator';

@ValidatorConstraint()
export class GeojsonValidator implements ValidatorConstraintInterface {
  private coordinatesValidator = new CoortinatesValidator();

  validate(value: any, validationArguments?: GeoJsonValidationArguments) {
    const [type] = validationArguments.constraints;
    return this.coordinatesValidator[type](value.coordinates);
  }

  defaultMessage(validationArguments?: GeoJsonValidationArguments) {
    const [type] = validationArguments.constraints;
    return `the value passed is not a valid ${type} GeoJSON`;
  }
}
