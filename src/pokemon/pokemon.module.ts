// pokemon.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './schemas/pokemon.schema';
import { HttpModule } from '@nestjs/axios'; // INI WAJIB

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }]),
    HttpModule, // <-- Tambahin ini
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
