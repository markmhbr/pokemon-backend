import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://miftaalfareza:markmhbr4525@cluster0.rdi2n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    HttpModule,
    PokemonModule,
  ],
})
export class AppModule {}

