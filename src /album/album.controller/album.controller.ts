/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../../shared/interceptors/business-errors/business-errors.interceptor';
import { AlbumDto } from '../album.dto/album.dto';
import { AlbumEntity } from '../album.entity/album.entity';
import { AlbumService } from '../album.service';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':albumId')
  async findOne(@Param('albumId') albumId: string) {
    return await this.albumService.findOne(albumId);
  }