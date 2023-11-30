import { RedSocialEntity } from '../redSocial/redSocial.entity';
import { FotoEntity } from '../foto/foto.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany,OneToMany,ManyToOne, JoinTable} from 'typeorm';


@Entity()
export class UsuarioEntity{
   
    @PrimaryGeneratedColumn('uuid')
    id: long;
    
    @Column()
    nombre: string;

    @Column()
    telefono: string;



    @OneToMany(type => FotoEntity, foto => foto.usuario)
    @JoinTable()
    fotos: fotoEntity[];

    @ManyToOne(type => RedSocialEntity, redSocial => redSocial.usuarios)
    @JoinTable()
    redSocial: RedSocialEntity[];

}