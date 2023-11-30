import { PerformerService } from './performer.service';
import { PerformerDto } from './performer.dto/performer.dto';
import { PerformerEntity } from './performer.entity/performer.entity';
export declare class PerformerController {
    private readonly performerService;
    constructor(performerService: PerformerService);
    findAll(): Promise<PerformerEntity[]>;
    findOne(id: string): Promise<PerformerEntity>;
    create(performerDto: PerformerDto): Promise<PerformerEntity>;
}
