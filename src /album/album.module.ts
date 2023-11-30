import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from '../ususario/usuario.entity/usuario.entity';
import { AlbumController } from './album.controller';

@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity, UsuarioEntity])],
  controllers: [AlbumController],
})
export class AlbumModule {}
