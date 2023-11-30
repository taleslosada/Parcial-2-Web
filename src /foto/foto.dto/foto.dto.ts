import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class FotoDto {
  @IsString()
  @IsNotEmpty()
  readonly ISO: int;
  @IsNumber()
  @IsNotEmpty()
  readonly velObturacion: string;

  @IsNumber()
  @IsNotEmpty()
  readonly apertura: int;

  @IsNumber()
  @IsNotEmpty()
  readonly fecha: string;

  @IsNumber()
  @IsNotEmpty()
  readonly id: long;
}
