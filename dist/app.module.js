"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const track_module_1 = require("./track/track.module");
const album_module_1 = require("./album/album.module");
const performer_module_1 = require("./performer/performer.module");
const performer_entity_1 = require("./performer/performer.entity/performer.entity");
const album_entity_1 = require("./album/album.entity/album.entity");
const track_entity_1 = require("./track/track.entity/track.entity");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            track_module_1.TrackModule,
            album_module_1.AlbumModule,
            performer_module_1.PerformerModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'marketplace',
                entities: [performer_entity_1.PerformerEntity, track_entity_1.TrackEntity, album_entity_1.AlbumEntity],
                dropSchema: true,
                synchronize: true,
                keepConnectionAlive: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map