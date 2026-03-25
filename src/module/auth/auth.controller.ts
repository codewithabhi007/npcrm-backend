import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from "@nestjs/swagger";
import { LoginDto, RegisterDto } from "./dto/register.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto:RegisterDto) {
        try {
            console.log(registerDto);
            return this.authService.register(registerDto);
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error.message);
        }
       
    }
    @Post('login')
    login(@Body() loginDto:LoginDto) {
        try {
            console.log(loginDto);
            return this.authService.login(loginDto);
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error.message);
        }
    }
}