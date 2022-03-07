import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common'
import PostService from "./post.service";
import JwtAuthenticationGuard from "../authentication/jwt-authentication.guard";

@Controller("/posts")
export default class PostController {
  constructor(
    private readonly postsService: PostService
  ) {
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  async createPost(@Body() post: CreatePostDto) {
    return this.postsService.createPost(post);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.replacePost(Number(id), post)
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return this.postsService.deletePost(Number(id));
  }
}
