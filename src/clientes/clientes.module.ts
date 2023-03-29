import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clientes } from "./clientes.entity";
import { ClientesController } from "./clientes.controller";
import { ClientesService } from "./clientes.service";


@Module({
    imports: [TypeOrmModule.forFeature([Clientes])],
    providers: [ClientesService],
    controllers: [ClientesController],
    exports: [TypeOrmModule],
})
export class ClientesModule {}