/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    validateUser(username: string, password: string) {
        const user = this.userService.findOne(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    login(loginUserInput: LoginUserInput) {
        const user = this.userService.findOne(loginUserInput.username);
        const { password, ...result } = user;
        return { access_token: 'fake-token', user: result };
    }
}
