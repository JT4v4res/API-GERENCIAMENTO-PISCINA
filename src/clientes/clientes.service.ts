import { HttpException, HttpStatus, Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Clientes } from "./clientes.entity";
import { DeleteResult, Repository } from "typeorm";


@Injectable()
export class ClientesService {
    constructor(
        @InjectRepository(Clientes)
        private readonly clientesRepository: Repository<Clientes>
    ) {}

    async findAll(): Promise<Clientes[]> {
        try{
            return await this.clientesRepository.find();
        }catch(err){
            throw new HttpException(`Não foi encontrado nenhum registro, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async findByName(name: string): Promise<Clientes> {
        if (name === null) {
            throw new BadRequestException('Nome é obrigatório');
        }
        
        try{
            return await this.clientesRepository.findOneBy({
                clientName: name,
            });
        }catch(err){
            throw new HttpException(`Não foi encontrado nenhum registro, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async create(cliente: Clientes): Promise<void> {
        const camposObrigatorios = ['clientName'];
        const camposEmFalta = [];

        camposObrigatorios.forEach((campo) => {
            if (!cliente[campo]) {
                camposEmFalta.push(campo);
            }
        });

        if (camposEmFalta.length > 0) {
            throw new BadRequestException('Campos obrigatórios não informados');
        }

        
        try{
            const newCliente = this.clientesRepository.create(cliente);
            await this.clientesRepository.save(newCliente);
        }catch(err){
            throw new HttpException(`Falha ao criar novo registro, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateByName(name: string, cliente: Partial<Clientes>): Promise<void> {
        if (cliente === null) {
            throw new BadRequestException('Cliente precisa ter ao menos um campo para atualizar.');
        }

        try{
            await this.clientesRepository.update({clientName: name}, cliente);
        }catch(err){
            throw new HttpException(`Falha ao atualizar registro, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteClient(name: string): Promise<DeleteResult> {
        if (name === null) {
            throw new BadRequestException('Nome é obrigatório.');
        }

        try{
            return await this.clientesRepository.delete({clientName: name});
        }catch(err){
            throw new HttpException(`Falha ao deletar cliente, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
