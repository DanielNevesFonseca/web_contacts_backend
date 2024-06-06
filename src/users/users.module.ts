// users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Contact } from 'src/contacts/contacts.entity';
import { ContactsService } from 'src/contacts/contacts.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  controllers: [UsersController],
  providers: [UsersService, ContactsService],
  exports: [TypeOrmModule.forFeature([User])]
})
export class UsersModule {}
