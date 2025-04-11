import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Pokemon, PokemonDocument } from './schemas/pokemon.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
    private readonly httpService: HttpService,
  ) {}

  async fetchAndSavePokemonData(): Promise<void> {
    await this.pokemonModel.deleteMany({}); // Bersihin dulu biar fresh
  
    const limit = 1000;
    const offset = 0;
  
    const res = await firstValueFrom(
      this.httpService.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    );
  
    const results = res.data.results;
  
    for (const result of results) {
      const detailRes = await firstValueFrom(this.httpService.get(result.url));
      const detail = detailRes.data;
  
      const about = {
        types: detail.types.map(t => t.type.name),
        height: detail.height,
        weight: detail.weight,
        abilities: detail.abilities.map(a => a.ability.name),
        experience: detail.base_experience,
        moves: detail.moves.map(m => m.move.name),
      };
  
      const stats: any = {};
      for (const s of detail.stats) {
        const name = s.stat.name.replace('-', '_'); // biar kayak "special_attack"
        stats[name] = s.base_stat;
      }
  
      const newPokemon = new this.pokemonModel({
        id: detail.id,
        name: detail.name,
        level: Math.floor(Math.random() * 100),
        image: detail.sprites.other['official-artwork'].front_default,
        about,
        stats,
      });
  
      await newPokemon.save();
    }
  }
  
    // Tambahin ini di bawah method fetchAndSavePokemonData
    async findAll(limit: number, offset: number): Promise<Pokemon[]> {
      return this.pokemonModel.find()
        .sort({ id: 1 }) // urut berdasarkan id
        .skip(offset)
        .limit(limit)
        .exec();
    }
    
    

  async deleteAllPokemon(): Promise<void> {
    await this.pokemonModel.deleteMany({});
  }
  
   // Ambil Pokémon berdasarkan nama
   async findByName(name: string): Promise<Pokemon | null> {
    return this.pokemonModel.findOne({
      name: new RegExp(`^${name}$`, 'i'), // case-insensitive
    }).exec();
  }
  
  
  
}
