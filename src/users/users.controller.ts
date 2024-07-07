import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): User {
    return this.usersService.findOne(Number(id));
  }

  @Post()
  create(@Body() user: Omit<User, 'id'>): User {
    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUser: Partial<User>): User {
    return this.usersService.update(Number(id), updateUser);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.usersService.delete(Number(id));
  }
}
