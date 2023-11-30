import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './foto/foto.module';
import { AlbumModule } from './album/album.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuarioEntity } from './usuario/usuario.entity/usuario.entity';
import { AlbumEntity } from './album/album.entity/album.entity';
import { FotoEntity } from './foto/foto.entity/foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TrackModule,
    AlbumModule,
    UsuarioModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'marketplace',
      entities: [UsuarioEntity, FotoEntity, AlbumEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
