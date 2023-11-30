import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioDto } from './usuario.dto/usuario.dto';
import { plainToInstance } from 'class-transformer';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptor/busines-errors/busines-errors.interceptor';

@Controller('usuario')
@UseInterceptors(BusinessErrorsInterceptor)
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll() {
    return await this.usuarioService.findAll();
  }

  @Get(':usuarioId')
  async findOne(@Param('usuarioId') id: string) {
    return await this.usuarioService.findOne(id);
  }

  @Post()
  async create(@Body() usuarioDto: UsuarioDto) {
    const usuario: UsuarioEntity = plainToInstance(
      UsuarioEntity,
      usuarioDto,
    );
    return await this.usuarioService.create(usuario);
  }
}
