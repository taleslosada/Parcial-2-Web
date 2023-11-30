import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(usuario: UsuarioEntity): Promise<UsuarioEntity> {
    if (usuario.telefono.length > 10) {
      throw new BusinessLogicException(
        'Telefono is too long, max 10 chars',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.usuarioRepository.save(usuario);
  }

  async findOne(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: ['albums'],
    });
    console.log(usuario);
    if (!usuario) {
      throw new BusinessLogicException(
        'Usuario was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return usuario;
  }

  async findAll(): Promise<UsuarioEntity[]> {
    return await this.usuarioRepository.find();
  }
}
