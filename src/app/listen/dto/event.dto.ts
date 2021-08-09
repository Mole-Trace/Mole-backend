import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EventBodyDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsString({ always: false })
  name: string;

  @IsString({ always: false })
  service: string;

  @IsString({ always: false })
  status: string;

  @IsString({ always: false })
  data: any;

  @IsNumber()
  state: number;
}
