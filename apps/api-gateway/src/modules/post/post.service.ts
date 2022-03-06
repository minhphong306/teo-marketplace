import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {IPost} from './interfaces/post.interface'
import {InjectRepository} from "@nestjs/typeorm";
import Post from "./entities/post.entity";
import {Repository} from "typeorm";

@Injectable()
export default class PostService {
  private lastPostId = 0;
  private posts: IPost[] = [];

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>
  ) {
  }

  getAllPosts() {
    return this.postRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postRepository.findOne({id: id})
    if (post) {
      return post;
    }

    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async replacePost(id: number, post: UpdatePostDto) {
   await this.postRepository.update(id, post);
   const updatedPost = this.postRepository.findOne({id: id});
    if (!updatedPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return updatedPost;
  }

  async createPost(post: CreatePostDto) {
    const newPost = await this.postRepository.create(post);
    await this.postRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
   const deleteResponse = await this.postRepository.delete(id);
   if(!deleteResponse.affected) {
     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
   }
  }
}
