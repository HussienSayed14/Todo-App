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
  


  async create(post: CreatePostDto, id:number) {
    
    const user = await this.userRepository.findOneBy({id})
    const newPost = await this.postRepository.create(post);
    newPost.user = user
    return this.postRepository.save(newPost) ;
  }

  

  async getPosts(id: number){
    const user = await this.userRepository.findOneBy({id})
    return user.posts
    
  }


   findAll() {
    
    return this.postRepository.find()

  }


  markAsDone(id: number, updatePostDto: UpdatePostDto){
    return this.postRepository.update(id,updatePostDto)
  }

  removeDone(id: number, updatePostDto: UpdatePostDto){
    return this.postRepository.update(id,updatePostDto)
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return this.postRepository.update(id,updatePostDto);
  }

  deletePost(id: number) {
    return this.postRepository.delete(id);
  }
}
