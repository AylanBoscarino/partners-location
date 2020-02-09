import {
  Controller,
  Get,
  Param,
  BadRequestException,
  NotFoundException,
  Post,
  Body,
  HttpCode,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './create-partner.dto';
import { FindOneParams } from '../util/validation/find-one-params';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  async index() {
    const pdvs = await this.partnerService.find();
    return { pdvs };
  }

  @Get(':id')
  async get(@Param() params: FindOneParams) {
    const partner = await this.partnerService.get(params.id);
    if (!partner) {
      throw new NotFoundException();
    }
    return partner;
  }

  @Post()
  @HttpCode(201)
  async store(@Body() createPartnerDto: CreatePartnerDto) {
    return this.partnerService.create(createPartnerDto);
  }
}
