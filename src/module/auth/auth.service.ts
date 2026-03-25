import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { User } from "./entities/user.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto) {
        // Check if user already exists
        const existingUser = await this.userRepository.findOne({ 
            where: { email: registerDto.email } 
        });
        
        if (existingUser) {
            throw new BadRequestException("User with this email already exists");
        }

        // Validate password confirmation
        if (registerDto.password !== registerDto.confirmPassword) {
            throw new BadRequestException("Passwords do not match");
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

        // Create user
        const user = this.userRepository.create({
            first_name: registerDto.first_name,
            last_name: registerDto.last_name,
            email: registerDto.email,
            password: hashedPassword,
        });

        const savedUser = await this.userRepository.save(user);

        // Generate JWT token
        const payload = { email: savedUser.email, sub: savedUser.id };
        const access_token = this.jwtService.sign(payload);

        // Remove password from response
        const { password, ...result } = savedUser;

        return {
            ...result,
            access_token,
        };
    }

    async login(loginDto: LoginDto) {
        const user = await this.userRepository.findOne({ 
            where: { email: loginDto.email },
            select: ['id', 'first_name', 'last_name', 'email', 'password']
        });
        
        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        // Generate JWT token
        const payload = { email: user.email, sub: user.id };
        const access_token = this.jwtService.sign(payload);

        // Remove password from response
        const { password, ...result } = user;

        return {
            ...result,
            access_token,
        };
    }
}
