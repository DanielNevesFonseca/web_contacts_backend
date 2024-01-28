// app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { DatabaseModule } from './database/database.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [DatabaseModule,UsersModule, SessionModule, ContactsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
