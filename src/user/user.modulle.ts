import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MainService } from './main.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, MainService],
})
export class UserModule {}
