import { Clientes } from 'src/clientes/clientes.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Alugueis {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ nullable: false })
    @JoinColumn({ referencedColumnName: 'clientName' })
    fullName: string;

    @ApiProperty()
    @Column({ nullable: false, type: 'date' })
    startDay: Date;

    @ApiProperty()
    @Column({ nullable: false, type: 'date' })
    endDay: Date;
    
    @ApiProperty()
    @Column({ nullable: false, type: 'time' })
    startHour: Date;

    @ApiProperty()
    @Column({ nullable: false, type: 'time'})
    endHour: Date;
    
    @ApiProperty()
    @Column({ nullable: false })
    rentMonth: number;

    @ApiProperty()
    @Column({ nullable: false })
    wasPaid: boolean;

    @ApiProperty()
    @Column({ nullable: false })
    paymentStatus: string;

    @ApiProperty()
    @Column({ nullable: false })
    paymentType: string;

    @ApiProperty()
    @Column({ nullable: false })
    rentPaidValue: number;

    @ApiProperty()
    @Column({ nullable: false })
    totalRentValue: number;

    @ApiProperty()
    @Column({ nullable: false })
    tipoAluguel: string;

    @ApiProperty()
    @ManyToOne(() => Clientes, cliente => cliente.alugueis)
    cliente: Clientes;
}