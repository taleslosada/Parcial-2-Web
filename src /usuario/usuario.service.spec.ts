import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity/usuario.entity';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;
  let usuarioList: UsuarioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);

    repository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );

    await seedDataBase();
  });

  const seedDataBase = async () => {
    repository.clear();
    usuarioList = [];

    for (let i = 0; i < 10; i++) {
      const usuario: UsuarioEntity = await repository.save({
        nombre: faker.person.firstName(),
        imagen: faker.image.url(),
        desc: faker.lorem.paragraph(),
      });
      usuarioList.push(usuario);
    }
  };

  it('should create a usuario', async () => {
    const newUsuario: UsuarioEntity = {
      id: '',
      nombre: faker.person.firstName(),
      telefono: faker.telefono.telefono(),
      redSocial: faker.redSocial.redSocial(),
      fotos: [],
    };

    const inserted = await service.create(newUsuario);
    expect(inserted).not.toBeNull();
  });

  it('should not create a usuario with a very long description', async () => {
    const newUsuario: UsuarioEntity = {
      id: '',
      nombre: faker.person.firstName(),
      telefono: faker.telefono.telefono(),
      redSocial: faker.redSocial.redSocial(),
      fotos: [],
    };

    await expect(service.create(newUsuario)).rejects.toHaveProperty(
      'message',
      'Description is too long, max 10 chars',
    );
  });

  it('should find a usuario with ID', async () => {
    const searched = await service.findOne(usuarioList[0].id);

    expect(searched).not.toBeNull();
    expect(searched.id).toEqual(usuarioList[0].id);
  });

  it('should not find a ususario', async () => {
    const find = await service.findOne('id invalido');
    expect(find).toBeNull();
  });

  it('should find all usuarios', async () => {
    const usuarios = await service.findAll();
    expect(usuarios.length).toEqual(10);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
