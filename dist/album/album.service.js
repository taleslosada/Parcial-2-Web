"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const album_entity_1 = require("./album.entity/album.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
const performer_entity_1 = require("../performer/performer.entity/performer.entity");
let AlbumService = class AlbumService {
    constructor(albumRepository, performerRepository) {
        this.albumRepository = albumRepository;
        this.performerRepository = performerRepository;
    }
    async create(album) {
        if (!album.nombre) {
            throw new business_errors_1.BusinessLogicException('Album name cannot be empty', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        if (!album.desc) {
            throw new business_errors_1.BusinessLogicException('Album description cannot be empty', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        return await this.albumRepository.save(album);
    }
    async findOne(id) {
        const album = await this.albumRepository.findOne({
            where: { id },
            relations: ['performers'],
        });
        if (!album) {
            throw new business_errors_1.BusinessLogicException('Album was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        return album;
    }
    async findAll() {
        return await this.albumRepository.find();
    }
    async delete(id) {
        const album = await this.albumRepository.findOne({
            where: { id },
        });
        if (!album) {
            throw new business_errors_1.BusinessLogicException('Album was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        if (album.tracks) {
            throw new business_errors_1.BusinessLogicException('Album cannot be deleted because it has tracks', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        await this.albumRepository.remove(album);
    }
    async addPerformerToAlbum(albumId, performerId) {
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
            relations: ['performers'],
        });
        if (!album) {
            throw new business_errors_1.BusinessLogicException('Album was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        const performer = await this.performerRepository.findOne({
            where: { id: performerId },
            relations: ['albums'],
        });
        if (!performer) {
            throw new business_errors_1.BusinessLogicException('Performer was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        if (album.performers.length > 3) {
            throw new business_errors_1.BusinessLogicException('Album cannot have more than 3 performers', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        album.performers.push(performer);
        return await this.albumRepository.save(album);
    }
};
exports.AlbumService = AlbumService;
exports.AlbumService = AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(album_entity_1.AlbumEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(performer_entity_1.PerformerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlbumService);
//# sourceMappingURL=album.service.js.map