import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FotoService } from './foto.service';
import { plainToInstance } from 'class-transformer';
import { FotoEntity } from './foto.entity/foto.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptor/busines-errors/busines-errors.interceptor';

@Controller('track')
@UseInterceptors(BusinessErrorsInterceptor)
export class FotoController {
  constructor(private readonly fotoService: FotoService) {}

  @Get()
  async findAll() {
    return await this.fotoService.findAll();
  }

  @Get(':fotoId')
  async findOne(@Param('trackId') id: string) {
    return await this.fotoService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    const { albumId, ...fotoDto } = body;
    const foto = plainToInstance(FotoEntity, fotoDto);
    return await this.fotoService.create(albumId, foto);
  }
}
