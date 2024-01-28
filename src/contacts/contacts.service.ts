import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { Contact } from './entities/contacts.entity';
import { CreateContactDTO } from './dto/create-contact.dto';
import { Response } from 'express';
import { classToPlain } from 'class-transformer';
import { UpdateContactDTO } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  private classToPlainUser(contact: Contact) {
    return classToPlain(contact);
  }

  async createContact(
    createBody: CreateContactDTO,
    user_id: string,
    res: Response,
  ) {
    const signedUserDecoded = res.locals.decoded;

    if (parseInt(user_id) !== parseInt(signedUserDecoded.userId)) {
      throw new HttpException(
        `Only owner of account has permission to action.`,
        HttpStatus.FORBIDDEN,
      );
    }

    const signedUser = await this.userRepository.findOne({
      where: {
        id: signedUserDecoded.userId,
      },
    });

    if (!signedUser) {
      throw new HttpException('Invalid credentials to CREATE Contact', 401);
    }

    const contactCreated = this.contactRepository.create({
      ...createBody,
      user: signedUser,
    });

    const contactSaved = await this.contactRepository
      .save(contactCreated)
      .then((contact) => this.classToPlainUser(contact));

    console.log(contactSaved);
    return contactSaved;
  }

  async findSingleContact(user_id: string, contact_id: string, res: Response) {
    const signedUserDecoded = res.locals.decoded;

    if (parseInt(user_id) !== parseInt(signedUserDecoded.sub)) {
      throw new HttpException(
        `Only owner of account has permission to action.`,
        HttpStatus.FORBIDDEN,
      );
    }

    const signedUser = await this.userRepository.findOne({
      where: {
        id: signedUserDecoded.userId,
      },
      relations: ['contacts'],
    });

    if (!signedUser) {
      throw new HttpException('Invalid credentials to READ Contact', 401);
    }

    const foundContact = signedUser.contacts.find(
      (contact) => contact.id === parseInt(contact_id),
    );

    if (!foundContact) {
      throw new HttpException(`Contact with ID: ${contact_id} not found`, 404);
    }

    return foundContact;
  }

  async updateContact(
    user_id: string,
    contact_id: string,
    res: Response,
    updateBody: UpdateContactDTO,
  ) {
    const signedUserDecoded = res.locals.decoded;

    if (parseInt(user_id) !== parseInt(signedUserDecoded.sub)) {
      throw new HttpException(
        `Only owner of account has permission to action.`,
        HttpStatus.FORBIDDEN,
      );
    }

    const signedUser = await this.userRepository.findOne({
      where: {
        id: signedUserDecoded.userId,
      },
      relations: ['contacts'],
    });

    if (!signedUser) {
      throw new HttpException('Invalid credentials to READ Contact', 401);
    }

    let foundContact = signedUser.contacts.find(
      (contact) => contact.id === parseInt(contact_id),
    );

    if (!foundContact) {
      throw new HttpException(`Contact with ID: ${contact_id} not found`, 404);
    }

    const saveContact = await this.contactRepository.save({
      ...foundContact,
      ...updateBody,
    });

    return saveContact;
  }

  async removeContact(user_id: string, contact_id: string, res: Response) {
    const signedUserDecoded = res.locals.decoded;

    if (parseInt(user_id) !== parseInt(signedUserDecoded.sub)) {
      throw new HttpException(
        `Only owner of account has permission to action.`,
        HttpStatus.FORBIDDEN,
      );
    }

    const signedUser = await this.userRepository.findOne({
      where: {
        id: signedUserDecoded.userId,
      },
      relations: ['contacts'],
    });

    if (!signedUser) {
      throw new HttpException('Invalid credentials to READ Contact', 401);
    }

    let foundContact = signedUser.contacts.find(
      (contact) => contact.id === parseInt(contact_id),
    );

    if (!foundContact) {
      throw new HttpException(`Contact with ID: ${contact_id} not found`, 404);
    }

    await this.contactRepository.remove(foundContact)
  }
}
