import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Clientes } from "./clientes.entity";
import { ClientesService } from "./clientes.service";
import { ApiTags, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger'; 
import { DeleteResult } from "typeorm";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@ApiTags('Clientes')
@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @ApiOperation({ summary: 'Retorna uma lista com todos os clientes cadastrados.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Lista em JSON com os clientes encontrados.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'caso não sejam encontrados registros retorna um NOT FOUND.'})
    @ApiOkResponse({type: [Clientes]})
    @Get()
    async findAll(): Promise<Clientes[]> {
        return await this.clientesService.findAll();
    }

    @ApiOperation({ summary: 'Retorna um cliente específico.', tags: ['get']})
    @ApiResponse({status: 200, description: 'JSON contendo dados de um cliente específico.'})
    @ApiResponse({status: 400, description: 'Caso parâmetro name seja nulo, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @ApiOkResponse({type: Clientes})
    @Get(':name')
    async findByName(@Param('name') name: string): Promise<Clientes> {
        return await this.clientesService.findByName(name);
    }

    @ApiOperation({ summary: 'Cadastra um cliente.', tags:['post']})
    @ApiResponse({status: 200, description: 'Cliente cadastrado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso os campos não obrigatóris sejam nulos, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Post()
    async create(@Body() cliente: Clientes): Promise<Clientes> {
        await this.clientesService.create(cliente);

        return cliente;
    }

    @ApiOperation({summary: 'Atualiza um cliente.', tags: ['patch']})
    @ApiResponse({status: 200, description: 'Cliente atualizado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso o body não contenha nada, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Patch(':name')
    async updateByName(
        @Param('name') name: string,
        @Body() param: Partial<Clientes>
    ): Promise<void> {
        return await this.clientesService.updateByName(name, param)
    }

    @ApiOperation({summary: 'Deleta um cliente.', tags: ['delete']})
    @ApiResponse({status: 200, description: 'Cliente atualizado com sucesso.'})
    @ApiResponse({status: 400, description: 'Caso o body não contenha nada, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar devido a um erro no banco de dados, retorna um INTERNAL SERVER ERROR.'})
    @Delete(':name')
    async deleteClient(
        @Param('name') name: string
    ): Promise<DeleteResult> {
        return await this.clientesService.deleteClient(name);
    }
}