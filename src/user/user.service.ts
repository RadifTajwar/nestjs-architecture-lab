import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './interface/userInterface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  private Students: User[] = [
    { id: 1, name: 'Radif', age: 22 },
    { id: 2, name: 'Jubayer', age: 25 },
  ];
  getAllStudents(): User[] {
    return this.Students;
  }
  getStudentById(id: number): User {
    const user = this.Students.find((student) => student.id === id);
    if (!user) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return user;
  }
  createStudent(student: CreateUserDto): User {
    const newUser: User = {
      id: Date.now(),
      ...student,
    };
    this.Students.push(newUser);
    return newUser;
  }
  updateStudent(id: number, student: CreateUserDto): User {
    const index = this.Students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.Students[index] = { ...this.Students[index], ...student };
      return this.Students[index];
    } else {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
  }
  updatePartialStudent(id: number, student: Partial<CreateUserDto>): User {
    const index = this.Students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this.Students[index] = { ...this.Students[index], ...student };
      return this.Students[index];
    } else {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
  }
}
