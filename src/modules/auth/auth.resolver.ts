/* eslint-disable prettier/prettier */
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {

    constructor(private readonly authService: AuthService) { }

    @Mutation(() => LoginResponse)
    @UseGuards(LocalAuthGuard)
    login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
        return this.authService.login(context.req.user)
    }

    @Mutation(() => User)
    signUp(@Args('signUpUserInput') signUpUserInput: LoginUserInput) {
        return this.authService.signUp(signUpUserInput)
    }
}
