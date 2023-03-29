import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { Alugueis } from './alugueis.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, Repository } from 'typeorm'
import { Clientes } from 'src/clientes/clientes.entity';

@Injectable()
export class AlugueisService {
    constructor(
        @InjectRepository(Alugueis)
        private readonly alugueisRepository: Repository<Alugueis>,
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>
    ){}

    async create(alugueis: Alugueis): Promise<void> {
        if(Object.values(alugueis).some((value) => value === null)){
            throw new BadRequestException('Todos os campos são obrigatórios');
        }
        
        const client = await this.clientesRepository.findOneBy({ clientName: alugueis.fullName});

        const hasAluguel = await this.alugueisRepository.findOneBy({ startDay: alugueis.startDay });

        if (hasAluguel && alugueis.endHour > hasAluguel.startHour) {
            throw new HttpException(`Já existe um aluguel cadastrado para esse dia e horário.`, HttpStatus.CONFLICT);
        }

        if (!client) {
            throw new HttpException(`Cliente não encontrado`, HttpStatus.NOT_FOUND);
        }

        try {
            client.rentCount += 1;

            await this.clientesRepository.save(client);

            alugueis.cliente = client;

            const newAluguel = this.alugueisRepository.create(alugueis);
            await this.alugueisRepository.save(newAluguel);
        }catch (err) {
            console.log(`O seguinte erro ocorreu: ${err}`);
            throw new HttpException(`Não foi possível cadastrar novo aluguel, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Alugueis[]> {
        try{
            return await this.alugueisRepository.find();
        }catch(err){
            throw new HttpException(`Não há registros no banco, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async defineIsMonthOrName(nameOrMonth: string, property: string, month: number): Promise<Alugueis | Alugueis[]> {
        if (nameOrMonth === null || property === null){
            throw new BadRequestException('Nome/mês e propriedade são obrigatórios');
        }

        if (!isNaN(parseInt(nameOrMonth)) && property === 'month') {
            const month = parseInt(nameOrMonth);
            
            return await this.findByMonth(month);
        }else{
            return await this.findByNameAndMonth(nameOrMonth, month);
        }
    }

    async findByMonth(month: number): Promise<Alugueis[]> {
        try{
            const options: FindManyOptions<Alugueis> = {
                where: {
                    rentMonth: month,
                }
            }

            return await this.alugueisRepository.find(options);
        }catch(err){
            throw new HttpException(`Não foram encontrados registros, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async findByName(name: string): Promise<Alugueis[]> {
        if(name === null){
            throw new BadRequestException('Nome é obrigatório');
        }
        
        try{
            const options: FindManyOptions<Alugueis> = {
                where: {
                    fullName: name
                }
            }

            return await this.alugueisRepository.find(options);
        }catch(err){
            throw new HttpException(`Registro não encontrado, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async findByNameAndMonth(name: string, month: number): Promise<Alugueis> {
        try{
            return await this.alugueisRepository.findOneBy({
                fullName: name,
                rentMonth: month,
            });
        }catch (err){
            throw new HttpException(`Não foi possivel encontrar os dados solicitados, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async updateByNameAndMonth(name: string, month: number, params: Partial<Alugueis>): Promise<void> {
        if(name === null || month === null || params === null){
            throw new BadRequestException('Nome e Mês e body são obrigatórios');
        }

        try{
            await this.alugueisRepository.update({fullName: name, rentMonth: month}, params);
        }catch(err){
            throw new HttpException(`Não foi possível alterar devido a um erro no processo de UPDATE, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteRent(name: string, startDay: number, month: number, year: number): Promise<DeleteResult> {
        if((name === null) || (startDay === null) || (month === null) || (year === null)){
            throw new BadRequestException('Nome, mês e dia são obrigatórios');
        }
        
        const diaInicio: Date = new Date(year, month - 1, startDay);

        try{
            return await this.alugueisRepository.delete({fullName: name, startDay: diaInicio, rentMonth: month});
        }catch(err){
            throw new HttpException(`Erro ao deletar registro, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
