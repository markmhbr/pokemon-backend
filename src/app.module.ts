import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // biar bisa dipake di semua module
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HttpModule,
    PokemonModule,
  ],
})
export class AppModule {}


