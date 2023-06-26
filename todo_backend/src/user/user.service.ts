import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    const email = createUserDto.email
    const user = await this.userRepository.findOneBy({email})
    if(user){
      throw new HttpException('This E-mail already exist, Choose another email',HttpStatus.BAD_REQUEST)
    }else{
      const newUser = this.userRepository.create(createUserDto)
      return this.userRepository.save(newUser)

    }
     ;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id,updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }


  async signIn(email:string,password:string){
  const user = await this.userRepository.findOneBy({email})
  if(!user){
    throw new HttpException('This E-mail Does Not Exist',HttpStatus.BAD_REQUEST)
}else{

const actualPassword = user.password
if(password == actualPassword){
  return true

}else{
  throw new HttpException('Wrong Password',HttpStatus.FORBIDDEN)
}
}

}


async getPosts(id: number){
  const user = await this.userRepository.findOneBy({id})
  return user.posts
  
}

}
