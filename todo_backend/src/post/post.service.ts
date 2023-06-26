import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { time } from 'console';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PostService {

  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  

  async create(post: CreatePostDto) {
    
    const user = await this.userRepository.findOne({where:{id:1}})
    const newPost = await this.postRepository.create(post);
    newPost.user = user
    return this.postRepository.save(newPost) ;
  }

   findAll() {
    
    return this.postRepository.find()

  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id,updatePostDto);
  }

  deletePost(id: number) {
    return this.postRepository.delete(id);
  }
}
