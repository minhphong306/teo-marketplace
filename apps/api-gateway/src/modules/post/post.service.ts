import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {IPost} from './interfaces/post.interface'

@Injectable()
export default class PostService {
  private lastPostId = 0;
  private posts: IPost[] = [];

  getAllPosts() {
    return this.posts;
  }

  getPostById(id: number) {
    const post = this.posts.find(post => post.id === id);

    if (post) {
      return post;
    }

    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  replacePost(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    this.posts[postIndex] = post;
    return post;
  }

  createPost(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post
    };

    this.posts.push(newPost);
    return newPost;
  }

  deletePost(id: number) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex === -1) {
      throw new HttpException('Not found post', HttpStatus.NOT_FOUND);
    }

    this.posts.splice(postIndex, 1);
  }
}
