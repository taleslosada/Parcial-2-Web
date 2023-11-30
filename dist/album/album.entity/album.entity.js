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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumEntity = void 0;
const performer_entity_1 = require("../../performer/performer.entity/performer.entity");
const track_entity_1 = require("../../track/track.entity/track.entity");
const typeorm_1 = require("typeorm");
let AlbumEntity = class AlbumEntity {
};
exports.AlbumEntity = AlbumEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AlbumEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlbumEntity.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlbumEntity.prototype, "caratula", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlbumEntity.prototype, "fechaLanzamiento", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], AlbumEntity.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => performer_entity_1.PerformerEntity, (performer) => performer.albums),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], AlbumEntity.prototype, "performers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => track_entity_1.TrackEntity, (track) => track.album),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], AlbumEntity.prototype, "tracks", void 0);
exports.AlbumEntity = AlbumEntity = __decorate([
    (0, typeorm_1.Entity)()
], AlbumEntity);
//# sourceMappingURL=album.entity.js.map