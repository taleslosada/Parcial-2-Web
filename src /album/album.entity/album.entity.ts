import { UsuarioEntity } from '../../usuario/usuario.entity/usuario.entity';
import { TrackEntity } from '../../foto/foto.entity/foto.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fechaInicio: string;

  @Column()
  fechaFin: string;
  @Column()
  titulo: string;

  @ManyToMany(() => UsuarioEntity, (usuario) => usuario.albums)
  @JoinTable()
  usuarios: UsuarioEntity[];

  @OneToMany(() => FotoEntity, (foto) => foto.album)
  @JoinTable()
  foto: FotoEntity[];
}
