import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";

@Entity()
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    userId: number;

    @ApiProperty()
    @Column({ nullable: false })
    userName: string;

    @ApiProperty()
    @Column({ nullable: false, length: 60 })
    password: string;

    @ApiProperty()
    @Column({ nullable: false })
    typeUser: string;
}