import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
  try {
    const userDoc = await this.usersService.findOne(username);
    if (userDoc && userDoc instanceof Document && await bcrypt.compare(password, userDoc.password)) {
      const { password, ...result } = userDoc.toObject();
      return result;
    }
    return null;
  } catch (err) {
    console.error('❌ Error in validateUser:', err); // 🔍 log error
    throw err;
  }
}


  async login(user: any) {
    return {
      access_token: 'dummy-jwt-token',
      user,
    };
  }
}
