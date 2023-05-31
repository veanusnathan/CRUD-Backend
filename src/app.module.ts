import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Balance } from './models/balance.model';
import { Transaction } from './models/transaction.model';
import { BalanceTransactionModule } from './inputData/balance-transaction.module';
import { TransactionModule } from './modules/transactions/transaction.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'jcwd2302',
      database: 'crud',
      models: [Balance, Transaction],
    }),
    BalanceTransactionModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
