// contacts.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contacts.entity';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contact, User])],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [TypeOrmModule.forFeature([Contact, User])]
})
export class ContactsModule {}
