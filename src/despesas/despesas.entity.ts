import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Despesa{
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({nullable: false})
    tipoDespesa: string;

    @ApiProperty()
    @Column({nullable: false})
    despesa: string;

    @ApiProperty()
    @Column({nullable: false})
    descricaoDespesa: string;

    @ApiProperty()
    @Column({nullable: false})
    valorDespesa: number;

    @ApiProperty()
    @Column({nullable: false})
    dataDespesa: Date;

    @ApiProperty()
    @Column({nullable:false})
    statusDespesa: string;
}