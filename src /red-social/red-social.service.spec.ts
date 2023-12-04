/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/errors/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { redSocialEntity } from './red-social.entity/red-social.entity';
import { redSocialService } from './red-social.service';

describe('redSocialService', () => {
  let service: redSocialService;
  let repository: Repository<redSocialEntity>;
  let redSocialList: redSocialEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [redSocialService],
    }).compile();

    service = module.get<redSocialService>(redSocialService);
    repository = module.get<Repository<redSocialEntity>>(
      getRepositoryToken(redSocialEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    redSocialList = [];
    for (let i = 0; i < 5; i++) {
      const redSocial: redSocialEntity = await repository.save({
        nombre: faker.company.name(),
        slogan: faker.company.catchPhrase(),
      });
      redSocialList.push(redSocial);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all redSocials', async () => {
    const redSocials: redSocialEntity[] = await service.findAll();
    expect(redSocials).not.toBeNull();
    expect(redSocials).toHaveLength(redSocialList.length);
  });

  it('should return a redSocial by id', async () => {
    const storedRedSocial: redSocialEntity = redSocialList[0];
    const redSocial: redSocialEntity = await service.findOne(
      storedRedSocial.id,
    );
    expect(redSocial).not.toBeNull();
    expect(redSocial.nombre).toEqual(storedRedSocial.nombre);
    expect(redSocial.slogan).toEqual(storedRedSocial.slogan);
  });

  it('should throw an error if redSocial does not exist', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'redSocial was not found',
    );
  });

  it('should create a new redSocial', async () => {
    const redSocial: redSocialEntity = {
      id: '',
      nombre: faker.company.name(),
      slogan: faker.company.catchPhrase(),
      usuarios: [],
    };

    const newRedSocial: redSocialEntity = await service.create(redSocial);
    expect(newRedSocial).not.toBeNull();
  
    const storedRedSocial: redSocialEntity = await repository.findOne({
      where: { id: newRedSocial.id },
    });
    expect(storedRedSocial).not.toBeNull();
    expect(storedRedSocial.nombre).toEqual(redSocial.nombre);
    expect(storedRedSocial.slogan).toEqual(redSocial.slogan);
  });

  it('should throw an error if redSocial does not contain a slogan', async () => {
    const redSocial: redSocialEntity = {
      id: '',
      nombre: faker.company.name(),
      slogan: '',
      usuarios: [],
    };
    await expect(() => service.create(redSocial)).rejects.toHaveProperty(
      'message',
      'Slogan must not be empty and have at least 20 characters',
    );
  });

  it('should update an existing redSocial', async () => {
    const redSocial: redSocialEntity = redSocialList[0];
    redSocial.nombre = 'New Name';

    const updatedRedSocial: redSocialEntity = await service.update(
      redSocial.id,
      redSocial,
    );
    expect(updatedRedSocial).not.toBeNull();

    const storedRedSocial: redSocialEntity = await repository.findOne({
      where: { id: updatedRedSocial.id },
    });
    expect(storedRedSocial).not.toBeNull();
    expect(storedRedSocial.nombre).toEqual(redSocial.nombre);
  });

  it('should throw an error if redSocial does not exist', async () => {
    let redSocial: redSocialEntity = redSocialList[0];
    redSocial = {
      ...redSocial,
      nombre: 'New Name',
    };
    await expect(() => service.update('0', redSocial)).rejects.toHaveProperty(
      'message',
      'redSocial  was not found',
    );
  });

  it('should delete an existing redSocial', async () => {
    const redSocial: redSocialEntity = redSocialList[0];
    await service.delete(redSocial.id);
    const deletedRedSocial: redSocialEntity = await repository.findOne({
      where: { id: redSocial.id },
    });
    expect(deletedRedSocial).toBeNull();
  });

});