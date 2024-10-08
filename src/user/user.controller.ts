import { Controller, Get, Post, Body, Patch, Param, Delete, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { ConfigService } from '@nestjs/config';
import { getAppToken } from '../helper/auth'
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService

  ) { }

  @Post()
  @Version([VERSION_NEUTRAL, '1'])
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  async findAll() {
    const data =  await getAppToken();

    debugger
    return data
  }
  @Get('findError')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {}
    console.log(a.b.c)
    return this.userService.findAll();
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  findBusinessError() {

    const a: any = {}
    try {
      console.log(a.b.c)
    } catch (error) {
      throw new BusinessException('你这个参数传错了')
    }
  }

  @Get('getTestName')
  getTestName() {
    return this.configService.get('TEST_VALUE').name
  }

  @Get()
  @Version('2')
  findAll2() {
    return '我是版本二11'
  }

  @Get()
  @Version('3')
  findAll3() {
    return '我是版本三'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
