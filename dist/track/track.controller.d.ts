import { TrackService } from './track.service';
import { TrackEntity } from './track.entity/track.entity';
export declare class TrackController {
    private readonly trackService;
    constructor(trackService: TrackService);
    findAll(): Promise<TrackEntity[]>;
    findOne(id: string): Promise<TrackEntity>;
    create(body: any): Promise<TrackEntity>;
}
