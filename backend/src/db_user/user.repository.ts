import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class UserRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async create(user: User): Promise<User> {
        return await new this.userModel(user).save();
    }

    async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
        return await this.userModel.findOne(userFilterQuery);
    }

    async find(userFilterQuery: FilterQuery<User>): Promise<User[]> {
        return await this.userModel.find(userFilterQuery);
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>) : Promise<User>{
        return await this.userModel.findOneAndUpdate(userFilterQuery, user);
    }
}