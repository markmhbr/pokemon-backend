// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UsersModule } from '../users/users.module'; // ✅

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule, // tidak boleh diduplikat
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
