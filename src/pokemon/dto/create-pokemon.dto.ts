
export class CreatePokemonDto {
  name: string;
  type: string;
  level?: number;
  height?: number;
  weight?: number;
  abilities?: string[];
  image?: string;
  stats?: {
    name: string;
    base_stat: number;
  }[];
}
