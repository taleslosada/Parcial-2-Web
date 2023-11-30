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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const album_entity_1 = require("./album.entity/album.entity");
const class_transformer_1 = require("class-transformer");
const album_dto_1 = require("./album.dto/album.dto");
const busines_errors_interceptor_1 = require("../shared/interceptor/busines-errors/busines-errors.interceptor");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    async findAll() {
        return await this.albumService.findAll();
    }
    async findOne(id) {
        return await this.albumService.findOne(id);
    }
    async create(albumDto) {
        const album = (0, class_transformer_1.plainToInstance)(album_entity_1.AlbumEntity, albumDto);
        return await this.albumService.create(album);
    }
    async delete(albumId) {
        return await this.albumService.delete(albumId);
    }
    async addPerformer(performerId, albumId) {
        return await this.albumService.addPerformerToAlbum(albumId, performerId);
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':albumId'),
    __param(0, (0, common_1.Param)('albumId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [album_dto_1.AlbumDto]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':albumId'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('albumId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':albumId/addPerformer/:performerId'),
    __param(0, (0, common_1.Param)('performerId')),
    __param(1, (0, common_1.Param)('albumId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "addPerformer", null);
exports.AlbumController = AlbumController = __decorate([
    (0, common_1.Controller)('album'),
    (0, common_1.UseInterceptors)(busines_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map