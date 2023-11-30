import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../album/album.entity/album.entity';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';
import { FotoEntity } from './foto.entity/foto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FotoService {
  constructor(
    @InjectRepository(FotoEntity)
    private readonly fotoRepository: Repository<FotoEntity>,
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: Repository<AlbumEntity>,
  ) {}

  async create(albumId: string, foto: FotoEntity): Promise<FotoEntity> {
    if (foto.ISO > 100 && FotoEntity.ISO < 6400) {
      throw new BusinessLogicException(
        ' su valor debe estar entre 100 y 6400',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    const album = await this.albumRepository.findOne({
      where: { id: albumId },
    });
    if (!album) {
      throw new BusinessLogicException(
        'Album was not found',
        BusinessError.NOT_FOUND,
      );
    }
    track.album = album;
    return await this.fotoRepository.save(track);
  }

  async findOne(id: string): Promise<FotoEntity> {
    const foto = await this.fotoRepository.findOne({
      where: { id },
    });

    if (!foto) {
      throw new BusinessLogicException(
        'Track was not found',
        BusinessError.NOT_FOUND,
      );
    }
    return foto;
  }

  async findAll(): Promise<FotoEntity[]> {
    return await this.fotoRepository.find();
  }
}
