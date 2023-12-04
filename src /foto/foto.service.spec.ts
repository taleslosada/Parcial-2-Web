/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/errors/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { FotoEntity } from '../foto/foto.entity/foto.entity';
import { FotoService } from '../foto/foto.service';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotoList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotoList = [];
    for (let i = 0; i < 5; i++) {
      const foto: FotoEntity = await repository.save({
        iso: 300, 
        velObturacion: 20,
        apertura: 10,
        fecha: new Date(),
      });
      fotoList.push(foto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all photos', async () => {
    const fotos: FotoEntity[] = await service.findAll();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotoList.length);
  });

  it('should return a photo by id', async () => {
    const storedFoto: FotoEntity = fotoList[0];
    const foto: FotoEntity = await service.findOne(storedFoto.id);
    expect(foto).not.toBeNull();
  });

  it('should create a new photo', async () => {
    const newFoto: FotoEntity = {
      id: '',
      iso: 500, 
      velObturacion: 30,
      apertura: 15,
      fecha: new Date(),
      album: null,
      usuario: null,
    };
    const createdFoto: FotoEntity = await service.create(newFoto);
    expect(createdFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: createdFoto.id },
    });
    expect(storedFoto).not.toBeNull();

  });

  it('should throw an error if the photo does not fit the iso standards', async () => {
    const newFoto: FotoEntity = {
      id: '',
      iso: 90, 
      velObturacion: 30,
      apertura: 15,
      fecha: new Date(),
      album: null,
      usuario: null,
    };
    await expect(() => service.create(newFoto)).rejects.toHaveProperty(
      'message',
      "The foto's iso must be between 100 and 6400",
    );
  });

  it('should update an existing photo', async () => {
    const foto: FotoEntity = fotoList[0];
    foto.velObturacion = 25;
    foto.apertura = 12;

    const updatedFoto: FotoEntity = await service.update(foto.id, foto);
    expect(updatedFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({
      where: { id: updatedFoto.id },
    });
    expect(storedFoto).not.toBeNull();
    
  });

  it('should delete an existing photo', async () => {
    const foto: FotoEntity = fotoList[0];
    await service.delete(foto.id);
    const deletedFoto: FotoEntity = await repository.findOne({
      where: { id: foto.id },
    });
    expect(deletedFoto).toBeNull();
  });
});