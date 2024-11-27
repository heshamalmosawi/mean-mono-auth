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

    @Post('signup')
    async createUser(@Body() user: { username: string; email: string; password: string; }) {
        console.log("creating user", user);
        user.password = await bcrypt.hash(user.password, 10);
        return await this.userService.createUser(user);
    }

    // get user by id and password
    @Post('login')
    async getUserByIdAndPassword(@Body() body: { username: string; password: string }): Promise<User | null> {
        const user = await this.userService.getUserByUserName(body.username);
        if (user && await bcrypt.compare(body.password, user.password)) {
            return user;
        }
        return null;
    }

    @Patch(':id')
    async updateUser(@Param('id') userId: string, @Body() user: { username: string; email: string; password: string; }) {
        return await this.userService.updateUser(userId, user);
    }
}