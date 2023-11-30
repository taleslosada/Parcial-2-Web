"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformerModule = void 0;
const common_1 = require("@nestjs/common");
const performer_service_1 = require("./performer.service");
const performer_entity_1 = require("./performer.entity/performer.entity");
const typeorm_1 = require("@nestjs/typeorm");
const performer_controller_1 = require("./performer.controller");
let PerformerModule = class PerformerModule {
};
exports.PerformerModule = PerformerModule;
exports.PerformerModule = PerformerModule = __decorate([
    (0, common_1.Module)({
        providers: [performer_service_1.PerformerService],
        imports: [typeorm_1.TypeOrmModule.forFeature([performer_entity_1.PerformerEntity])],
        controllers: [performer_controller_1.PerformerController],
    })
], PerformerModule);
//# sourceMappingURL=performer.module.js.map