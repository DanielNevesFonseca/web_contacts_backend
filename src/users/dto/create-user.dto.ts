import { IsNumberString, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsNumberString()
  phone_number: string | number;
}
