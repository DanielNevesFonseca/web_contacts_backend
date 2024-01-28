import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from 'src/contacts/entities/contacts.entity';
import { User } from 'src/users/entities/users.entity';
import { DataSourceOptions } from 'typeorm';


export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'docker',
  database: 'webcontacts_db',
  // entities que irão virar Tabelas
  entities: [User, Contact],
  // relacionar Classe com TypeORM
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async() => {
        return {
          ...dataSourceOptions
        }
      }
    })
  ]
})
export class DatabaseModule {}
