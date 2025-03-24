import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/application/services/users/users.service';
import { LoginResponseDTO } from 'src/domain/dtos/login';

@Injectable()
export class AuthService {
   constructor(
      private readonly jwtService: JwtService,
      private readonly usersService: UsersService
   ) {}

   async validateUser(email: string, password: string) {
      return this.usersService.validateUserPassword(email, password);
   }

   async login(user: any): Promise<LoginResponseDTO> {
      const payload = { email: user.email, sub: user.id, roles: user.roles };
      
      return {
         access_token: this.jwtService.sign(payload),
         email: user.email,
         name: user.name,
      };
   }

   async fetchUserProfile(userId: string) {
      return await this.usersService.findById(userId);
   }
}
