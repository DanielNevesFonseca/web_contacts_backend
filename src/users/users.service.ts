import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { Contact } from 'src/contacts/contacts.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { classToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Função auxiliar para transformar User em um objeto simples (POJO)
  private classToPlainUser(user: User) {
    return classToPlain(user);
  }

  // Lista todos os usuários, excluindo o campo de senha
  async findAllUsers() {
    const users = await this.userRepository.find({
      relations: ['contacts'],
    });

    // Mapeia cada usuário usando a função auxiliar de transformação
    return users.map((user) => this.classToPlainUser(user));
  }

  // Cria um novo usuário e retorna o resultado sem a senha
  async createUser(createBody: CreateUserDTO) {
    const userFound = await this.userRepository.findOne({
      where: { email: createBody.email },
    });

    if (userFound) {
      throw new HttpException(
        `User with email: ${userFound.email} already exists!`,
        409,
      );
    }

    // Cria e salva o usuário, e depois retorna o resultado sem a senha
    const user = this.userRepository.create(createBody);
    return await this.userRepository.save(user).then((user) => this.classToPlainUser(user));
  }

  // Encontra um usuário pelo ID e retorna o resultado sem a senha
  async findSingleUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: { id },
      relations: ['contacts'],
    });

    if (!userFound) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.classToPlainUser(userFound);
  }

  // Atualiza um usuário e retorna o resultado sem a senha
  async updateUser(id: number, updateBody: UpdateUserDTO) {
    
    // Pré-carrega o usuário, atualiza e depois retorna o resultado sem a senha
    const user = await this.userRepository.preload({
      ...updateBody,
      id,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.save(user).then((user) => this.classToPlainUser(user));
  }

  // Remove um usuário e retorna o resultado sem a senha
  async removeUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.remove(user).then((user) => this.classToPlainUser(user));
  }
}
