import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from 'class-validator';
import { Alugueis } from "src/alugueis/alugueis.entity";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Clientes {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    clientName: string;

    @ApiProperty()
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @ApiProperty()
    @Column({ unique: true })
    phone: string;

    @ApiProperty()
    @Column({ nullable: true })
    rentCount: number;

    @ApiProperty()
    @OneToMany(() => Alugueis, alugueis => alugueis.cliente)
    alugueis: Alugueis[];
}