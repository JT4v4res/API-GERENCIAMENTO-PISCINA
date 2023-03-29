import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, Repository } from "typeorm";
import { Despesa } from "./despesas.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class DespesaService {
    constructor(
        @InjectRepository(Despesa)
        private readonly despesaRepository: Repository<Despesa>
    ) {}

    async getAll(): Promise<Despesa[]> {
        try{
            return this.despesaRepository.find();
        }catch(err){
            throw new HttpException(`Não foram encontrados registros, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async getByDespesa(tipoDespesa: string): Promise<Despesa[]> {
        if (tipoDespesa === null) {
            throw new HttpException(`Tipo de despesa é obrigatório`, HttpStatus.BAD_REQUEST);
        }

        try{
            return this.despesaRepository.findBy({tipoDespesa: tipoDespesa});
        }catch(err){
            throw new HttpException(`Não foram encontrados registros, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async createNewDespesa(despesa: Despesa): Promise<void> {
        if(Object.values(despesa).some((value) => value === null)) {
            throw new HttpException(`Os campos não podem ser nulos.`, HttpStatus.BAD_REQUEST);
        }

        try{
            await this.despesaRepository.create(despesa);
        }catch(err){
            throw new HttpException(`Não foi possível inserir a despesa, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateDespesa(despId: number, despesa: Partial<Despesa>): Promise<void> {
        if(Object.values(despesa).some((value) => value === null)) {
            throw new HttpException(`Deve haver ao menos um campo para editar.`, HttpStatus.BAD_REQUEST);
        }

        try{
            await this.despesaRepository.update({id: despId}, despesa);
        }catch(err){
            throw new HttpException(`Não foi possível atualizar a despesa, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteDespesa(despId: number): Promise<DeleteResult> {
        if (despId === null) {
            throw new HttpException(`Id da despesa a ser deletada é obrigatório.`, HttpStatus.BAD_REQUEST);
        }

        try{
            return await this.despesaRepository.delete({id: despId});
        }catch(err){
            throw new HttpException(`Não foi possível deletar a despesa, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}