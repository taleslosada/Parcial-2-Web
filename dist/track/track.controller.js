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
exports.TrackController = void 0;
const common_1 = require("@nestjs/common");
const track_service_1 = require("./track.service");
const class_transformer_1 = require("class-transformer");
const track_entity_1 = require("./track.entity/track.entity");
const busines_errors_interceptor_1 = require("../shared/interceptor/busines-errors/busines-errors.interceptor");
let TrackController = class TrackController {
    constructor(trackService) {
        this.trackService = trackService;
    }
    async findAll() {
        return await this.trackService.findAll();
    }
    async findOne(id) {
        return await this.trackService.findOne(id);
    }
    async create(body) {
        const { albumId, ...trackDto } = body;
        const track = (0, class_transformer_1.plainToInstance)(track_entity_1.TrackEntity, trackDto);
        return await this.trackService.create(albumId, track);
    }
};
exports.TrackController = TrackController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':trackId'),
    __param(0, (0, common_1.Param)('trackId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TrackController.prototype, "create", null);
exports.TrackController = TrackController = __decorate([
    (0, common_1.Controller)('track'),
    (0, common_1.UseInterceptors)(busines_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [track_service_1.TrackService])
], TrackController);
//# sourceMappingURL=track.controller.js.map