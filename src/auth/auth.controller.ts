import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login') // Ini yang akan jadi /auth/login
  async login(@Body() body: { username: string; password: string }) {
    console.log('📥 Login request:', body); // Tambah ini untuk debugging
    try {
      const user = await this.authService.validateUser(body.username, body.password);
      if (!user) {
        console.log('❌ User not found or invalid credentials');
        return { message: 'Invalid credentials' };
      }
      console.log('✔️ User found, returning login response');
      return this.authService.login(user);
    } catch (error) {
      console.error('❌ Error in login controller:', error);
      return { message: 'Internal server error' };
    }
  }
}
