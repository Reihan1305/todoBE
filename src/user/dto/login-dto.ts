import { IsNotEmpty, IsString, IsEmail } from "class-validator"

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    name     :string
    @IsEmail()
    @IsNotEmpty()
    email    :string 
    @IsString()
    @IsNotEmpty()
    password :string
}
