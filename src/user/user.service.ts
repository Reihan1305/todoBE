import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/lib/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findEmail = await this.prisma.user.count({
      where: { email: createUserDto.email },
    });

    if (findEmail > 0) {
      throw new HttpException('email alredy exist', HttpStatus.CONFLICT);
    }

    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    return await this.prisma.user.create({
      data: {
        email: createUserDto.email,
        Name: createUserDto.name,
        password: hashPassword,
      },
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const matchPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!matchPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = {
      email: user.email,
      id: user.id,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      profile: payload,
    };
  }

  async findAll() {
    return await this.prisma.user.findMany({
      include: {
        list: true,
        categories: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
      include: {
        list: true,
        categories: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
