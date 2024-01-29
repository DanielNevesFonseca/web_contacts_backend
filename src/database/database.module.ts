import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { Contact } from 'src/contacts/entities/contacts.entity';
import { User } from 'src/users/entities/users.entity';
import { DataSourceOptions } from 'typeorm';



export const settings: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5435,
  username: 'postgres',
  password: 'docker',
  database: 'webcontacts_db',
  entities: [User, Contact],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async() => {
        return {
          ...settings
        }
      }
    })
  ]
})
export class DatabaseModule {}
