import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, HydratedDocument, Types } from 'mongoose';

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

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: { type: Types.ObjectId; ref: 'User' };
}

export const PetSchema = SchemaFactory.createForClass(Pet);
