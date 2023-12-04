/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { redSocialEntity } from './red-social.entity/red-social.entity';

@Injectable()
export class redSocialService {
   constructor(
       @InjectRepository(redSocialEntity)
       private readonly redSocialRepository: Repository<redSocialEntity>
   ){}

   async findAll(): Promise<redSocialEntity[]> {
       return await this.redSocialRepository.find({ relations: ["usuarios"] });
   }

   async findOne(id: string): Promise<redSocialEntity> {
       const redSocial: redSocialEntity = await this.redSocialRepository.findOne({where: {id}, relations: ["usuarios"] } );
       if (!redSocial)
         throw new BusinessLogicException("The redSocial with the given id was not found", BusinessError.NOT_FOUND);
  
       return redSocial;
   }
  
   async create(redSocial: redSocialEntity): Promise<redSocialEntity> {
    if (!redSocial.slogan || redSocial.slogan.length < 20) {
      throw new BusinessLogicException("Slogan must not be empty and have at least 20 characters", BusinessError.VALIDATION_ERROR);
    }

    return await this.redSocialRepository.save(redSocial);
    }

    async update(id: string, redSocial: redSocialEntity): Promise<redSocialEntity> {
        const persistedredSocial: redSocialEntity = await this.redSocialRepository.findOne({where:{id}});
        if (!persistedredSocial)
          throw new BusinessLogicException("redSocial was not found", BusinessError.NOT_FOUND);
        redSocial.id = id; 
        return await this.redSocialRepository.save(redSocial);
    }
    
    async delete(id: string) {
        const redSocial: redSocialEntity = await this.redSocialRepository.findOne({where:{id}});
        if (!redSocial)
          throw new BusinessLogicException("redSocial was not found", BusinessError.NOT_FOUND);
     
        await this.redSocialRepository.remove(redSocial);
    }



}