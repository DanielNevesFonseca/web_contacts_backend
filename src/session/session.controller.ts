// session.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { SessionService } from './session.service';

@Controller('login')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post()
  async login(@Body() loginBody: LoginDTO) {
    return await this.sessionService.login(loginBody);
  }
}
