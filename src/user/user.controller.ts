import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './interface/userInterface';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreatePipe } from 'src/common/pipe/user-create-pipe/user-create-pipe.pipe';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enums';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { HttpExceptionFilter } from 'src/filter/http-exception/http-exception.filter';
@Controller('user')
@UseFilters(HttpExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  getAllStudents(): User[] {
    return this.userService.getAllStudents();
  }
  @Get(':id')
  getStudentById(@Param('id', ParseIntPipe) id: string) {
    return this.userService.getStudentById(Number(id));
  }
  @Post()
  createStudent(
    @Body('name', new UserCreatePipe()) name: string,
    @Body('age', new UserCreatePipe()) age: number,
    @Body() body: CreateUserDto,
  ) {
    return this.userService.createStudent({ ...body, name, age });
  }
  @Put(':id')
  updateWholeStudent(
    @Param('id') id: string,
    @Body() body: { name: string; age: number },
  ) {
    return this.userService.updateStudent(Number(id), body);
  }
  @Patch(':id')
  updateStudentPartially(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; age: number }>,
  ) {
    return this.userService.updatePartialStudent(Number(id), body);
  }
}
