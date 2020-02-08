import { Injectable } from '@nestjs/common';

Injectable();
export class ConfigService {
  get(variable: string): string | undefined {
    return process.env[variable];
  }
}
