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
exports.PerformerController = void 0;
const common_1 = require("@nestjs/common");
const performer_service_1 = require("./performer.service");
const performer_dto_1 = require("./performer.dto/performer.dto");
const class_transformer_1 = require("class-transformer");
const performer_entity_1 = require("./performer.entity/performer.entity");
const busines_errors_interceptor_1 = require("../shared/interceptor/busines-errors/busines-errors.interceptor");
let PerformerController = class PerformerController {
    constructor(performerService) {
        this.performerService = performerService;
    }
    async findAll() {
        return await this.performerService.findAll();
    }
    async findOne(id) {
        return await this.performerService.findOne(id);
    }
    async create(performerDto) {
        const performer = (0, class_transformer_1.plainToInstance)(performer_entity_1.PerformerEntity, performerDto);
        return await this.performerService.create(performer);
    }
};
exports.PerformerController = PerformerController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerformerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':performerId'),
    __param(0, (0, common_1.Param)('performerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PerformerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [performer_dto_1.PerformerDto]),
    __metadata("design:returntype", Promise)
], PerformerController.prototype, "create", null);
exports.PerformerController = PerformerController = __decorate([
    (0, common_1.Controller)('performer'),
    (0, common_1.UseInterceptors)(busines_errors_interceptor_1.BusinessErrorsInterceptor),
    __metadata("design:paramtypes", [performer_service_1.PerformerService])
], PerformerController);
//# sourceMappingURL=performer.controller.js.map