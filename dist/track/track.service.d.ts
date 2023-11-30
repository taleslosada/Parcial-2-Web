import { AlbumEntity } from '../album/album.entity/album.entity';
import { TrackEntity } from './track.entity/track.entity';
import { Repository } from 'typeorm';
export declare class TrackService {
    private readonly trackRepository;
    private readonly albumRepository;
    constructor(trackRepository: Repository<TrackEntity>, albumRepository: Repository<AlbumEntity>);
    create(albumId: string, track: TrackEntity): Promise<TrackEntity>;
    findOne(id: string): Promise<TrackEntity>;
    findAll(): Promise<TrackEntity[]>;
}
