import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "../infrastructure/security/guards/jwt-auth.guard";
import { LocalAuthGuard } from "../infrastructure/security/guards/local-auth.guard";
import { LoginRequestDTO, LoginResponseDTO } from "src/domain/dtos/login";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Body() loginDto: LoginRequestDTO) : Promise<LoginResponseDTO> {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req): Promise<{ email: string; name: string }> {
        const user = await this.authService.fetchUserProfile(req.user.userId);
        console.log("user", user)
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return {...user}
    }
}
