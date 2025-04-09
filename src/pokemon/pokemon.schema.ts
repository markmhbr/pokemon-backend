import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop({ required: true })
  name: string;

  @Prop()
  type: string;

  @Prop()
  level: number;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop({ type: [String] }) // karena abilities adalah array of string
  abilities: string[];

  @Prop()
  image: string;

  @Prop({
    type: [
      {
        name: String,
        base_stat: Number,
      },
    ],
  })
  stats: {
    name: string;
    base_stat: number;
  }[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
