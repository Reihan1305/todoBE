import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/lib/prisma/prisma.service'
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../lib/auth/jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'todoAPP',
      signOptions: { expiresIn: '25h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService,JwtStrategy],
})
export class UserModule {}
