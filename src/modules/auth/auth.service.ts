/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string) {
        const user = this.userService.findOne(username);
        const valid = await bcrypt.compare(password, user?.password);
        if (user && valid) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        return {
            access_token: this.jwtService.sign({
                username: user.username,
                sub: user.id,
            }),
            user,
        };
    }

    async signUp(signUpUserInput: LoginUserInput) {
        const user = await this.userService.findOne(signUpUserInput.username);
        if (user) {
            throw new Error('User already exists');
        }

        const password = await bcrypt.hash(signUpUserInput.password, 10);
        return this.userService.create({
            ...signUpUserInput,
            password,
        });
    }
}
