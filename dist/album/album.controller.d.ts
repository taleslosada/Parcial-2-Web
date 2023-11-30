import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { AlbumDto } from './album.dto/album.dto';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    findAll(): Promise<AlbumEntity[]>;
    findOne(id: string): Promise<AlbumEntity>;
    create(albumDto: AlbumDto): Promise<AlbumEntity>;
    delete(albumId: string): Promise<void>;
    addPerformer(performerId: string, albumId: string): Promise<AlbumEntity>;
}
