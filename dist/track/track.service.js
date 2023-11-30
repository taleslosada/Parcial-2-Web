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
exports.TrackService = void 0;
const common_1 = require("@nestjs/common");
const album_entity_1 = require("../album/album.entity/album.entity");
const business_errors_1 = require("../shared/errors/business-errors");
const track_entity_1 = require("./track.entity/track.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TrackService = class TrackService {
    constructor(trackRepository, albumRepository) {
        this.trackRepository = trackRepository;
        this.albumRepository = albumRepository;
    }
    async create(albumId, track) {
        if (track.duracion < 0) {
            throw new business_errors_1.BusinessLogicException('Track duration cannot be negative', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        const album = await this.albumRepository.findOne({
            where: { id: albumId },
        });
        if (!album) {
            throw new business_errors_1.BusinessLogicException('Album was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        track.album = album;
        return await this.trackRepository.save(track);
    }
    async findOne(id) {
        const track = await this.trackRepository.findOne({
            where: { id },
        });
        if (!track) {
            throw new business_errors_1.BusinessLogicException('Track was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        return track;
    }
    async findAll() {
        return await this.trackRepository.find();
    }
};
exports.TrackService = TrackService;
exports.TrackService = TrackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(track_entity_1.TrackEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(album_entity_1.AlbumEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TrackService);
//# sourceMappingURL=track.service.js.map