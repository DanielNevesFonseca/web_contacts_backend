// app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { SessionModule } from './session/session.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import path from 'path';
import { User } from './users/users.entity';
import { Contact } from './contacts/contacts.entity';
import dataSource, { dataSourceSettings } from 'db/data-source';

config();

const dbUrl: string | undefined = process.env.DATABASE_URL;

if (!dbUrl) throw new Error("Missing env var: 'DATABASE_URL'");

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceSettings()),
    UsersModule,
    SessionModule,
    ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
