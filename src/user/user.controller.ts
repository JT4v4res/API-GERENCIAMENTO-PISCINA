import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { User } from "./user.entity";
import { UserService } from "./user.service"
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Usuários')
@Controller('User')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}
    
    @ApiOperation({ summary: 'Lista todos os usuários.', tags: ['get']})
    @ApiResponse({status: 200, description: 'JSON com a lista dos usuários.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros, retorna um NOT FOUND.'})
    @Get()
    async getAllUsers(): Promise<User[]> {
        return await this.userService.getAll();
    }

    @ApiOperation({ summary: 'Cadastra um novo usuário.', tags: ['post']})
    @ApiResponse({status: 201, description: 'Usuário cadastrado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso qualquer propriedade do body seja nula, retorna um BAD REQUEST.' })
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar, retorna um INTERNAL SERVER ERROR.'})
    @Post()
    async createUser(
        @Body() param: User
    ): Promise<User> {
        await this.userService.createNewUser(param);

        return param;
    }
}