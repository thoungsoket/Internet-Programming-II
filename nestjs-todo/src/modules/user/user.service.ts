import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  createUser(body: any) {
    const user = this.usersRepo.create(body);
    return this.usersRepo.save(user);
  }

  getUser(username: string) {
    return this.usersRepo.findOne({
      where: { username },
      relations: ['tasks'],
    });
  }

  getUsers() {
    return this.usersRepo.find({
      relations: ['tasks'],
    });
  }

  async updateUser(username: string, body: any) {
    await this.usersRepo.update({ username }, body);
    return this.getUser(username);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}
