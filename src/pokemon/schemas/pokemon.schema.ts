import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop()
  name: string;

  @Prop()
  level: number;

  @Prop()
  image: string;

  @Prop({
    type: Object,
  })
  about: {
    types: string[];
    height: number;
    weight: number;
    abilities: string[];
    experience: number;
    moves: string[];
  };

  @Prop({
    type: Object,
  })
  stats: {
    hp: number;
    attack: number;
    defense: number;
    special_attack: number;
    special_defense: number;
    speed: number;
  };
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
