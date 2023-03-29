import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alugueis } from './alugueis/alugueis.entity';
import { AlgueisModule } from './alugueis/alugueis.module';
import { Clientes } from './clientes/clientes.entity';
import { ClientesModule } from './clientes/clientes.module';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { AuthModule } from './auth/auth.module';
import { Despesa } from './despesas/despesas.entity';
import { DespesasModule } from './despesas/despesas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '5657',
      database: 'piscina',
      entities: [Alugueis, Clientes, User, Despesa],
      synchronize: true,
    }), AlgueisModule, ClientesModule, UserModule, AuthModule, DespesasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
