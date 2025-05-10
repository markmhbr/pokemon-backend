import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // biar bisa dipake di semua module
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI + '&tls=true'),
    HttpModule,
    PokemonModule,
    AuthModule,
  ],
})
export class AppModule {}


