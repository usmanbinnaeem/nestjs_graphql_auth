/* eslint-disable prettier/prettier */
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/modules/users/entities/user.entity";

@ObjectType()
export class LoginResponse {
    @Field()
    access_token: string;

    @Field(() => User)
    user: User

}