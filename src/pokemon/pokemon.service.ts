import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pokemon, PokemonDocument } from './schemas/pokemon.schema';
import { firstValueFrom } from 'rxjs';
import { CreatePokemonDto } from './dto/create-pokemon.dto';



@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonModel.find().exec();
  }  

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    return this.pokemonModel.create(createPokemonDto);
  }

  async fetchAndSaveAllPokemon(): Promise<void> {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    const response = await firstValueFrom(this.httpService.get(url));

    const results = response.data.results;
    console.log('Total Pokémon:', results.length);

    const first10 = results.slice(0, 10);

    for (const pokemon of first10) {
      const detail = await firstValueFrom(this.httpService.get(pokemon.url));

      const data = {
        name: detail.data.name,
        type: detail.data.types[0]?.type.name || 'unknown',
        level: Math.floor(Math.random() * 100),
        height: detail.data.height,
        weight: detail.data.weight,
        abilities: detail.data.abilities.map((a) => a.ability.name),
        image: detail.data.sprites.other['official-artwork'].front_default,
        stats: detail.data.stats.map((s) => ({
          name: s.stat.name,
          base_stat: s.base_stat,
        })),
      };

      await this.pokemonModel.create(data);
    }

    console.log('Pokémon berhasil disimpan!');
  }
}
