import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { plainToInstance } from 'class-transformer';
import { AlbumDto } from './album.dto/album.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptor/busines-errors/busines-errors.interceptor';

@Controller('album')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':albumId')
  async findOne(@Param('albumId') id: string) {
    return await this.albumService.findOne(id);
  }

  @Post()
  async create(@Body() albumDto: AlbumDto) {
    const album: AlbumEntity = plainToInstance(AlbumEntity, albumDto);
    return await this.albumService.create(album);
  }

  @Delete(':albumId')
  @HttpCode(204)
  async delete(@Param('albumId') albumId: string) {
    return await this.albumService.delete(albumId);
  }

  @Post(':albumId/addUsuario/:usuarioId')
  async addUsuario(
    @Param('usuarioId') usuarioId: string,
    @Param('albumId') albumId: string,
  ) {
    return await this.albumService.addUsuarioToAlbum(albumId, usuarioId);
  }
}
