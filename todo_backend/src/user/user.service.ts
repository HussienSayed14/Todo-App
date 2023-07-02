import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
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
  const payload = { sub: user.id, email: user.email, username:user.userName };
  
  return {
    access_token: await this.jwtService.signAsync(payload),
  };

}else{
  throw new HttpException('Wrong Password',HttpStatus.UNAUTHORIZED)
}
}

}



}
