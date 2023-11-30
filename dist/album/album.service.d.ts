import { AlbumEntity } from './album.entity/album.entity';
import { Repository } from 'typeorm';
import { PerformerEntity } from '../performer/performer.entity/performer.entity';
export declare class AlbumService {
    private readonly albumRepository;
    private readonly performerRepository;
    constructor(albumRepository: Repository<AlbumEntity>, performerRepository: Repository<PerformerEntity>);
    create(album: AlbumEntity): Promise<AlbumEntity>;
    findOne(id: string): Promise<AlbumEntity>;
    findAll(): Promise<AlbumEntity[]>;
    delete(id: string): Promise<void>;
    addPerformerToAlbum(albumId: string, performerId: string): Promise<AlbumEntity>;
}
