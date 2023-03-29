import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @ApiOperation({ summary: 'Cria o token de autenticação para que o usuário possa fazer as requisições.', tags: ['post']})
    @ApiResponse({status: 201, description: 'JSON contendo o token de autenticação e sua data de expiração.'})
    @ApiResponse({status: 404, description: 'Caso o usuário não seja encontrado, retorna um NOT FOUND.'})
    @ApiResponse({status: 500, description: 'Caso haja algum erro no servidor, retorna um INTERNAL SERVER ERROR'})
    @Post('login')
    async login(
        @Body() param: User
    ) {
        return await this.authService.login(param);   
    }
}