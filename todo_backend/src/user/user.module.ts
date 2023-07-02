import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constans';

@Module({
  imports: [TypeOrmModule.forFeature([User]),JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    
  })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
