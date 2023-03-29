import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DespesaService } from "./despesas.service";
import { Despesa } from "./despesas.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

@UseGuards(AuthGuard('jwt'))
@ApiTags('Despesas')
@Controller('Despesas')
export class DespesasController {
    constructor(
        private readonly despesaService: DespesaService
    ) {}
    
    @ApiOperation({summary: 'Retorna um JSON com todas as despesas cadastradas.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Registros encontrados e retornados.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não seja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros, retorna um NOT FOUND.'})
    @Get()
    async getAll(): Promise<Despesa[]> {
        return await this.despesaService.getAll();
    }

    @ApiOperation({summary: 'Retorna um JSON com todas as despesas de determinado tipo cadastradas.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Registros encontrados e retornados.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não seja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros, retorna um NOT FOUND.'})
    @Get(':tipoDespesa')
    async getByDespesa(
        @Param('tipoDespesa') tipoDespesa: string
    ): Promise<Despesa[]> {
        return await this.despesaService.getByDespesa(tipoDespesa);
    }

    @ApiOperation({summary: 'Cadastra uma nova despesa', tags: ['post']})
    @ApiResponse({status: 201, description: 'Despesa criada'})
    @ApiResponse({status: 400, description: 'Caso algum campo do body seja nulo, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não seja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar, retorna um INTERNAL SERVER ERROR.'})
    @Post()
    async createNewDespesa(
        @Body() despesa: Despesa
    ): Promise<Despesa> {
        await this.despesaService.createNewDespesa(despesa);

        return despesa;
    }

    @ApiOperation({summary: 'Atualiza uma despesa', tags: ['patch']})
    @ApiResponse({status: 201, description: 'Despesa atualizada.'})
    @ApiResponse({status: 400, description: 'Caso algum campo do/ou o body seja nulo, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não seja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível atualizar, retorna um INTERNAL SERVER ERROR.'})
    @Patch(':despesaId')
    async updateDespesa(
        @Param('despesaId') despId: number,
        @Body() despesa: Partial<Despesa>
    ): Promise<Partial<Despesa>> {
        await this.despesaService.updateDespesa(despId, despesa);

        return despesa;
    }

    @ApiOperation({summary: 'Atualiza uma despesa', tags: ['delete']})
    @ApiResponse({status: 201, description: 'Despesa deletada.'})
    @ApiResponse({status: 400, description: 'Caso o id seja nulo, retorna um BAD REQUEST.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não seja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível deletar, retorna um INTERNAL SERVER ERROR.'})
    @Delete(':despesaId')
    async deleteDespesa(
        @Param('despesaId') despId: number,
    ): Promise<DeleteResult> {
        return await this.despesaService.deleteDespesa(despId);
    }
}