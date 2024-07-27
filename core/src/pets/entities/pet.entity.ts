import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument } from 'mongoose';

export type PetDocument = HydratedDocument<Pet>;

@Schema({ timestamps: true })
export class Pet {
  @Prop()
  name: string;

  @Prop()
  breed: string;

  @Prop()
  image: string;

  @Prop({ type: Date })
  when: Date;

  @Prop()
  userId: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);
