import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import * as bcrypt from 'bcrypt';
import { User } from "./user.schema";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':id')
    async getUserById(@Param('id') userId: string) {
        return await this.userService.getUserById(userId);
    }

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Post()
    async createUser(@Body() user: { username: string; email: string; password: string; }) {
        user.password = await bcrypt.hash(user.password, 10);
        return await this.userService.createUser(user);
    }

    // get user by id and password
    @Get(':id/:password')
    async getUserByIdAndPassword(@Param('id') userId: string, @Param('password') password: string) : Promise<User | null>{
        const user = await this.userService.getUserById(userId);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    @Patch(':id')
    async updateUser(@Param('id') userId: string, @Body() user: { username: string; email: string; password: string; }) {
        return await this.userService.updateUser(userId, user);
    }
}