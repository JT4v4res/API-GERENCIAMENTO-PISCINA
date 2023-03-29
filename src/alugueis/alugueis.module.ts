import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlugueisService } from "./alugueis.service";
import { AlugueisController } from "./alugueis.controller";
import { Alugueis } from "./alugueis.entity";
import { Clientes } from "src/clientes/clientes.entity";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [TypeOrmModule.forFeature([Alugueis, Clientes]), AuthModule],
    providers: [AlugueisService],
    controllers: [AlugueisController],
    exports: [TypeOrmModule, AlugueisService],
})
export class AlgueisModule {}