import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  getTask(id: number) {
    return this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  getTasks() {
    return this.taskRepo.find({
      relations: ['user'],
    });
  }

  createTask(body: any) {
    const task = this.taskRepo.create(body);
    return this.taskRepo.save(task);
  }

  async updateTask(id: number, body: any) {
    await this.taskRepo.update(id, body);
    return this.getTask(id);
  }

  deleteTask(id: number) {
    return this.taskRepo.delete(id);
  }
}
