import { User } from "src/user/user.entity";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        
        return await this.authService.validateUser(username);
    }
}