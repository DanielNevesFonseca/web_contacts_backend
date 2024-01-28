import { IsNumberString, IsString } from 'class-validator';

export class CreateContactDTO {
  @IsString()
  fullname: string;

  @IsString()
  email: string;

  @IsNumberString()
  phone_number: string | number;
}
