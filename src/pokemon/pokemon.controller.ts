import { Controller, Get, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './schemas/pokemon.schema';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(): Promise<Pokemon[]> {
    return this.pokemonService.findAll();
  }

  // Ini endpoint baru buat fetch semua data dari PokéAPI
  @Get('fetch')
  async fetchAllPokemon(): Promise<{ message: string }> {
    await this.pokemonService.fetchAndSavePokemonData();
    return { message: 'Data Pokémon berhasil diambil dan disimpan ke MongoDB' };
  }

  @Delete('delete-all')
async deleteAll(): Promise<{ message: string }> {
  await this.pokemonService.deleteAllPokemon();
  return { message: 'Semua data Pokémon berhasil dihapus' };
}

}
