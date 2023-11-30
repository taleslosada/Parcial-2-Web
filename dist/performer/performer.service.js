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
exports.PerformerService = void 0;
const common_1 = require("@nestjs/common");
const performer_entity_1 = require("./performer.entity/performer.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const business_errors_1 = require("../shared/errors/business-errors");
let PerformerService = class PerformerService {
    constructor(performerRepository) {
        this.performerRepository = performerRepository;
    }
    async create(performer) {
        if (performer.desc.length > 100) {
            throw new business_errors_1.BusinessLogicException('Description is too long, max 100 chars', business_errors_1.BusinessError.PRECONDITION_FAILED);
        }
        return await this.performerRepository.save(performer);
    }
    async findOne(id) {
        const performer = await this.performerRepository.findOne({
            where: { id },
            relations: ['albums'],
        });
        console.log(performer);
        if (!performer) {
            throw new business_errors_1.BusinessLogicException('Performer was not found', business_errors_1.BusinessError.NOT_FOUND);
        }
        return performer;
    }
    async findAll() {
        return await this.performerRepository.find();
    }
};
exports.PerformerService = PerformerService;
exports.PerformerService = PerformerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(performer_entity_1.PerformerEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PerformerService);
//# sourceMappingURL=performer.service.js.map