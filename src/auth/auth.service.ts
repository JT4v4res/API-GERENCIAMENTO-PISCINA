import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(username: string): Promise<User> {
        const user = await this.userService.findByName(username);

        if (!user) {
            throw new UnauthorizedException('Usuário inválido!');
        }

        if (!await this.hasPermission(user)) {
            throw new UnauthorizedException('Permissão inválida!');
        }

        return user;
    }

    async hasPermission(user: User): Promise<boolean> {
        return await user.typeUser.includes('adm');
    }

    async login(user: User) {
        const payload = {username: user.userName, sub: user.userId};
        const expiresIn = 3600
        const expiresAt: Date = new Date();

        expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);

        return {
            access_token: this.jwtService.sign(payload, {
                secret: process.env.JWT_SECRET,
                expiresIn: expiresIn,
            }),
            expiresAt:expiresAt.toISOString(),
        }
    }
}
