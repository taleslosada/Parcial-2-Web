import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { UsuarioEntity } from '../usuario/usuario.entity/usuario.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(album: AlbumEntity): Promise<AlbumEntity> {
    if (!album.titulo) {
      throw new BusinessLogicException(
        'Album name cannot be empty',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    if (!album.fechaInicio) {
      throw new BusinessLogicException(
        'Album description cannot be empty',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.albumRepository.save(album);
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: ['usuarios'],
    });

    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return album;
  }

  async findAll(): Promise<AlbumEntity[]> {
    return await this.albumRepository.find();
  }

  async delete(id: string) {
    const album: AlbumEntity = await this.albumRepository.findOne({
      where: { id },
    });
    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }

    if (album.foto) {
      throw new BusinessLogicException(
        'Album cannot be deleted because it has foto',
        BusinessError.PRECONDITION_FAILED,
      );
    }

    await this.albumRepository.remove(album);
  }

  async addUsuarioToAlbum(albumId: string, usuarioId: string) {
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
      relations: ['usuario'],
    });
    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: usuarioId },
      relations: ['albums'],
    });
    if (!usuario) {
      throw new BusinessLogicException(
        'Usuario was not found',
        BusinessError.NOT_FOUND,
      );
    }


    album.usuarios.push(usuario);

    return await this.albumRepository.save(album);
  }
}
