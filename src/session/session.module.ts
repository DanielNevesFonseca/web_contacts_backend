import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import { VerifyTokenMiddleware } from './session.middleware';
import { ContactsModule } from 'src/contacts/contacts.module';
import { Contact } from 'src/contacts/contacts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UsersModule, ContactsModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [],
})
export class SessionModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyTokenMiddleware)
      .forRoutes({ path: 'users/:id', method: RequestMethod.ALL })
      .apply(VerifyTokenMiddleware)
      .forRoutes({ path: 'users/:id/contacts', method: RequestMethod.ALL })
      .apply(VerifyTokenMiddleware)
      .forRoutes({ path: 'users/:id/contacts/:contact_id', method: RequestMethod.ALL });
  }
}
