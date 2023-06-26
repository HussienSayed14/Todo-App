import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),
    UserModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
