import { Module } from '@nestjs/common';
import { TrackService } from './foto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './foto.entity/foto.entity';
import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { FotoController } from './foto.controller';

@Module({
  providers: [FotoService],
  imports: [TypeOrmModule.forFeature([FotoEntity, AlbumEntity])],
  controllers: [FotoController],
})
export class FotoModule {}
