import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'; // Adjust the path as necessary

@Injectable()
export class UserService {
    constructor(private readonly usersRepository: UserRepository) {}

    async getUsers() {
        return await this.usersRepository.find({});
    }

    async getUserById(userId: string) {
        return await this.usersRepository.findOne({ _id: userId });
    }

    async getUserByUserName(username: string) {
        return await this.usersRepository.findOne({ username });
    }

    async createUser({ username, email, password }: { username: string; email: string; password: string;}) {
        console.log("creating user", username, email, password);
        return await this.usersRepository.create({ username, email, password, role: 'user', created_at: new Date(), updated_at: new Date() });
    }

    async updateUser(userId: string, { username, email, password }: { username: string; email: string; password: string;}) {
        return await this.usersRepository.findOneAndUpdate({ _id: userId }, { username, email, password, updated_at: new Date() });
    }
}