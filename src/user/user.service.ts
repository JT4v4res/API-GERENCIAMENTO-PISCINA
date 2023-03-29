import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    
    async getAll(): Promise<User[]> {
        try{
            return await this.userRepository.find();
        }catch(err){
            throw new HttpException(`Não há registros encontrados, ${err}`, HttpStatus.NOT_FOUND);
        }
    }

    async findByName(name: string): Promise<User> {
        if (name === null) {
            throw new Error('Nome não pode ser vazio.');
        }

        try{
            return await this.userRepository.findOneBy({userName: name});
        }catch(err)
        {
            throw new Error(`Ocorreu um erro ao realizar a busca, ${err}`);
        }
    }

    async createNewUser(user: User): Promise<void> {
        if (Object.values(user).some((value) => value === null)) {
            throw new BadRequestException('Nome e senha são obrigatórios.');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = this.userRepository.create({
            userName: user.userName,
            password: hashedPassword,
            typeUser: user.typeUser,
        });

        try{
            await this.userRepository.save(newUser);
        }catch(err){
            throw new HttpException(`Ocorreu um erro ao cadastrar novo usuário, ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
