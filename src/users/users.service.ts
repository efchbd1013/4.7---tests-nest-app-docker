import { Injectable } from '@nestjs/common';
import { User } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find(user => user.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser = { ...user, id: this.idCounter++ };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUser: Partial<User>): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updateUser };
    return this.users[userIndex];
  }

  delete(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
  }
}
