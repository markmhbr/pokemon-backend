import { Controller, Get, Post, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    console.log('Body:', createPokemonDto); // Tambah ini untuk cek
    return this.pokemonService.create(createPokemonDto);
  }


  @Get('fetch')
  async fetchPokemonData(): Promise<string> {
    await this.pokemonService.fetchAndSaveAllPokemon();
    return 'Pokémon berhasil di-fetch dan disimpan!';
  }
  
  @Get()
  async findAll() {
    return this.pokemonService.findAll();
  }

}
