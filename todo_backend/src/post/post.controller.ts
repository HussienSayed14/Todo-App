import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UserGuard } from 'src/user/auth.guard';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}



  @UseGuards(UserGuard)
  @Post('createPost/:id')
  create(@Body() createPostDto: CreatePostDto,@Param('id') id: number ) {
    
    return this.postService.create(createPostDto,id);
  }




  @UseGuards(UserGuard)
  @Get('getPosts/:id')
  getPosts(@Param ('id') id: number){
    return this.postService.getPosts(id);

  }


  @Get()
  findAll() {
    return this.postService.findAll();
  }


  
 
  @Patch('updatePost/:id')
  update(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }


  
 
  @Patch('markAsDone/:id')
  markAsDone(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    updatePostDto.status = "Done"
    
    return this.postService.markAsDone(id, updatePostDto);
  }

 
  @Patch('removeDone/:id')
  RemoveDone(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    updatePostDto.status = "onGoing"
    
    return this.postService.removeDone(id, updatePostDto);
  }



   
  @UseGuards(UserGuard)
  @Delete('deletePost/:id')
  remove(@Param('id') id: number) {
    return this.postService.deletePost(id);
  }
}
