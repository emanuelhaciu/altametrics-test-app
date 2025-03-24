import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// DTO for Login Request
export class LoginRequestDTO {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// DTO for Login Response
export class LoginResponseDTO {
  @IsString()
  access_token: string;
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
};
