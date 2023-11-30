import { PerformerEntity } from '../../performer/performer.entity/performer.entity';
import { TrackEntity } from '../../track/track.entity/track.entity';
export declare class AlbumEntity {
    id: string;
    nombre: string;
    caratula: string;
    fechaLanzamiento: string;
    desc: string;
    performers: PerformerEntity[];
    tracks: TrackEntity[];
}
