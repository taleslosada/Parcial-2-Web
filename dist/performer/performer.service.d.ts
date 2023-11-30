import { PerformerEntity } from './performer.entity/performer.entity';
import { Repository } from 'typeorm';
export declare class PerformerService {
    private readonly performerRepository;
    constructor(performerRepository: Repository<PerformerEntity>);
    create(performer: PerformerEntity): Promise<PerformerEntity>;
    findOne(id: string): Promise<PerformerEntity>;
    findAll(): Promise<PerformerEntity[]>;
}
