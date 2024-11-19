import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Collection, Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ collection: 'users' })
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: string;

    @Prop()
    created_at: Date;

    @Prop()
    updated_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);