import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwtStrategy.service";
import * as dotenv from 'dotenv';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';

dotenv.config()

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '1h'},
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy , JwtService],
    exports: [AuthService],
})
export class AuthModule {}