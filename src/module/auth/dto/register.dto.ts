import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator";

export class RegisterDto {
    @ApiProperty()
    @IsString({ message: "First Name must be a string!" })
    @IsNotEmpty({ message: "First Name cannot be empty!" })
    first_name: string;

    @ApiProperty()
    @IsString({ message: "Last Name must be a string!" })
    last_name: string;

    
   
    @ApiProperty()
    @IsEmail({}, { message: "Email must be a valid email address!" })
    @IsNotEmpty({ message: "Email cannot be empty!" })
    // @ExcludeFakeEmails({
    //     message:
    //         "Email must not be from a fake email provider (e.g., temp-mail.org, fakemail.net).",
    // })
    email: string;

    @ApiProperty()
    @IsString({ message: "Password must be a string!" })
    @IsNotEmpty({ message: "Password cannot be empty!" })
    // @StrongPassword({
    //     message:
    //         "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character, and must be at least 8 characters long.",
    // })
    password: string;

    @ApiProperty()
    @IsString({ message: "Confirm Password must be a string!" })
    @IsNotEmpty({ message: "Confirm Password cannot be empty!" })
    // @Match("password", { message: "Confirm Password must match the Password!" })
    confirmPassword: string;
}

export class LoginDto {
    @ApiProperty()
    @IsEmail({}, { message: "Email must be a valid email address!" })
    @IsNotEmpty({ message: "Email cannot be empty!" })
    email: string;
    
    @ApiProperty()
    @IsString({ message: "Password must be a string!" })
    @IsNotEmpty({ message: "Password cannot be empty!" })
    password: string;
}
