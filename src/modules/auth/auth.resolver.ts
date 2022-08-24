/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { LocalAuthGuard } from './guards/auth.guard';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(LocalAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
        return this.authService.login(loginUserInput)
    }
}
