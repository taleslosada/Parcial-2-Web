import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UsuarioDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly telefono: string;

  @IsUrl()
  @IsNotEmpty()
  readonly id: long;
}
