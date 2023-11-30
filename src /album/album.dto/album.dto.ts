import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  readonly fechaInicio: Date;

  @IsUrl()
  @IsNotEmpty()
  readonly fechaFin: Date;

  @IsString()
  @IsNotEmpty()
  readonly titulo: string;

  @IsString()
  @IsNotEmpty()
  readonly id: string;
}
