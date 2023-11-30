import { AlbumEntity } from '../../album/album.entity/album.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  duracion: number;

  @ManyToOne(() => AlbumEntity, (album) => album.tracks)
  @JoinTable()
  album: AlbumEntity;
}
