
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an empty array if no users exist', () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => []);
      expect(controller.findAll()).toEqual([]);
    });

    it('should return an array of users', () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' };
      jest.spyOn(service, 'findAll').mockImplementation(() => [user]);
      expect(controller.findAll()).toEqual([user]);
    });

    it('should handle errors gracefully', () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => {
        throw new Error('Something went wrong');
      });
      expect(() => controller.findAll()).toThrow('Something went wrong');
    });
  });

  describe('findOne', () => {
    it('should return null if user does not exist', () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => undefined);
      expect(controller.findOne('1')).toBeUndefined();
    });

    it('should return the user if it exists', () => {
      const user: User = { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890' };
      jest.spyOn(service, 'findOne').mockImplementation(() => user);
      expect(controller.findOne('1')).toEqual(user);
    });

    it('should handle errors gracefully', () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => {
        throw new Error('Something went wrong');
      });
      expect(() => controller.findOne('1')).toThrow('Something went wrong');
    });
  });
});
