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

    async createUser({ name, email, password }: { name: string; email: string; password: string;}) {
        return await this.usersRepository.create({ name, email, password, role: 'user', created_at: new Date(), updated_at: new Date() });
    }

    async updateUser(userId: string, { name, email, password }: { name: string; email: string; password: string;}) {
        return await this.usersRepository.findOneAndUpdate({ _id: userId }, { name, email, password, updated_at: new Date() });
    }
}