import { IsNotEmpty, IsString } from 'class-validator';

export class AddNewGroupBodyDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
