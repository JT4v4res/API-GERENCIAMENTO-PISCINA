import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Despesa } from './despesas.entity';
import { DespesaService } from './despesas.service';
import { DespesasController } from './despesas.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Despesa])],
    providers: [DespesaService],
    controllers: [DespesasController],
    exports: [TypeOrmModule],
})
export class DespesasModule {}