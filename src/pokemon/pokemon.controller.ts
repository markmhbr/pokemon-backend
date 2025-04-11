import { Controller, Get, Delete, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './schemas/pokemon.schema';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  async findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<Pokemon[]> {
    const limitNumber = parseInt(limit ?? '21');
    const offsetNumber = parseInt(offset ?? '0');
    return this.pokemonService.findAll(limitNumber, offsetNumber);
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

  @Get(':name')
  async findByName(@Param('name') name: string): Promise<Pokemon | null> {
    return this.pokemonService.findByName(name);
  }

}
