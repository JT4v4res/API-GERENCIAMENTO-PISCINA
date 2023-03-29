import { Controller, Get, Post, Param, Body, Delete, Patch, UseGuards } from "@nestjs/common";
import { AlugueisService } from "./alugueis.service";
import { ApiTags, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { Alugueis } from "./alugueis.entity";
import { DeleteResult } from "typeorm";
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@ApiTags('Alugueis')
@Controller('alugueis')
export class AlugueisController{
    constructor(private readonly alugueisService: AlugueisService) {}

    @ApiOperation({ summary: 'Retorna uma lista com todos os alugueis cadastrados.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Lista em JSON com os alugueis encontrados.'})
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @ApiOkResponse({type: [Alugueis]})
    @Get()
    async findAll(): Promise<Alugueis[]> {
        return await this.alugueisService.findAll();
    }

    @ApiOperation({ summary: 'Retorna um registro único ou uma lista de registros de alugueis.', tags: ['get']})
    @ApiResponse({ status: 200, description: 'Realiza uma query no banco de dados e retorna um' + 
        ' JSON contendo o único registro representando os alugueis de x pessoa em determinado mês ou' + 
        ' todos os alugueis de determinado mês'})  
    @ApiResponse({ status: 400, description: 'Caso as propriedades nameOrMonth e property sejam nulas, retorna um BAD REQUEST.' })   
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({ status: 404, description: 'Caso não sejam encontrados registros, retorna um NOT FOUND.' })
    @ApiOkResponse({ type: [Alugueis]})
    @Get(':nameOrMonth/:property/:month')
    async findByNameAndMonth(
        @Param('nameOrMonth') nameOrMonth: string,
        @Param('property') property: string,
        @Param('month') month: number,
    ): Promise<Alugueis | Alugueis[]> {
        return await this.alugueisService.defineIsMonthOrName(nameOrMonth, property, month);
    }

    @ApiOperation({ summary: 'Retorna os alugueis de um determinado cliente.', tags: ['get']})
    @ApiResponse({status: 200, description: 'Retorna um array JSON contendo todos os alugueis de determinado cliente.'})
    @ApiResponse({ status: 400, description: 'Caso a propriedade name seja nula, retorna um BAD REQUEST.' })
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 404, description: 'Caso não sejam encontrados registros retorna um NOT FOUND.'})
    @Get(':name')
    async findByName(@Param('name') name: string): Promise<Alugueis[]> {
        return await this.alugueisService.findByName(name);
    }

    @ApiOperation({ summary: 'Cadastra um novo aluguel.', tags: ['post']})
    @ApiResponse({status: 201, description: 'Aluguel cadastrado com sucesso.'})
    @ApiResponse({ status: 400, description: 'Caso qualquer propriedade do body seja nula, retorna um BAD REQUEST.' })
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível criar, retorna um INTERNAL SERVER ERROR.'})
    @Post()
    async create(@Body() aluguel: Alugueis): Promise<Alugueis> {
        await this.alugueisService.create(aluguel);

        return aluguel;
    }

    @ApiOperation({ summary: 'Atualiza parcialmente um registro de aluguel.', tags: ['patch']})
    @ApiResponse({status: 200, description: 'Aluguel atualizado com sucesso.'})
    @ApiResponse({ status: 400, description: 'Caso nome, mês ou qualquer propriedade do body sejam nulas, retorna um BAD REQUEST.' })
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível atualizar, retorna um INTERNAL SERVER ERROR.'})
    @Patch(':name/:month')
    async updateByNameAndMonth(
        @Param('name') name: string,
        @Param('month') month: number,
        @Body() params: Partial<Alugueis>
    ): Promise<Partial<Alugueis>> {
        await this.alugueisService.updateByNameAndMonth(name, month, params);

        return params;
    }

    @ApiOperation({ summary: 'Deleta um registro de aluguel.', tags: ['delete']})
    @ApiResponse({status: 200, description: 'Aluguel deletado com sucesso.'})
    @ApiResponse({ status: 400, description: 'Caso nome, startDay ou mes sejam nulos, retorna um BAD REQUEST.' })
    @ApiResponse({status: 401, description: 'Caso o usuário não esteja autenticado, retorna um UNAUTHORIZED.'})
    @ApiResponse({status: 500, description: 'Caso não seja possível deletar, retorna um INTERNAL SERVER ERROR.'})
    @Delete(':name/:startDay/:month/:year')
    async deleteByNameAndMonth(
        @Param('name') name: string,
        @Param('startDay') startDay: number,
        @Param('month') month: number,
        @Param('year') year: number
    ): Promise<DeleteResult> {
        return await this.alugueisService.deleteRent(name, startDay, month, year);
    }
}