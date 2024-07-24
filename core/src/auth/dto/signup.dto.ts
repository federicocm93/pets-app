import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
