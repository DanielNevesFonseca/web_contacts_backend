import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ContactsService } from 'src/contacts/contacts.service';
import { Response } from 'express';
import { CreateContactDTO } from 'src/contacts/dto/create-contact.dto';
import { UpdateContactDTO } from 'src/contacts/dto/update-contact.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly contactService: ContactsService,
  ) {}

  @Get()
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Post()
  createUser(@Body() createBody: CreateUserDTO) {
    return this.userService.createUser(createBody);
  }

  // =============================== Rotas com id ================================
  @Get(':id')
  findSingleUser(@Param('id') id: string) {
    return this.userService.findSingleUser(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: UpdateUserDTO) {
    return this.userService.updateUser(parseInt(id), updateUser);
  }

  @HttpCode(204)
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(parseInt(id));
  }

  // =============================== Rotas De Correlação com Contacts ================================

  @Post(':id/contacts')
  async createContact(
    @Body() createBody: CreateContactDTO,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    const newContact = await this.contactService.createContact(
      createBody,
      id,
      res,
    );

    return res.status(201).json(newContact);
  }

  // =============================== Rotas com :contact_id ================================

  @Get(':id/contacts/:contact_id')
  async findSingleContact(
    @Param('id') user_id: string,
    @Param('contact_id') contact_id: string,
    @Res() res: Response,
  ) {
    const foundContact = await this.contactService.findSingleContact(
      user_id,
      contact_id,
      res,
    );

    return res.status(200).json(foundContact);
  }

  @Patch(':id/contacts/:contact_id')
  async updateContact(
    @Param('id') user_id: string,
    @Param('contact_id') contact_id: string,
    @Res() res: Response,
    @Body() updateBody: UpdateContactDTO,
  ) {
    const updatedContact = await this.contactService.updateContact(
      user_id,
      contact_id,
      res,
      updateBody,
    );

    return res.status(200).json(updatedContact);
  }

  @Delete(':id/contacts/:contact_id')
  async deleteContact(
    @Param('id') user_id: string,
    @Param('contact_id') contact_id: string,
    @Res() res: Response,
  ) {
    await this.contactService.removeContact(user_id, contact_id, res);
    return res.status(204).json()
  }
}
