import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import User from "./entity/user.entity";
import {Repository} from "typeorm";
import CreateUserDto from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async getByEmail(email: string): Promise<User>{
    const user = await this.userRepo.findOne({email: email})
    if (!user){
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND)
    }

    return user;
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({id: id});
    if (!user) {
      throw new HttpException('Not found user', HttpStatus.NOT_FOUND)
    }

    return user;
  }

  async createUser(userData: CreateUserDto) {
    const newUser = await this.userRepo.create(userData);
    await this.userRepo.save(newUser);
    return newUser;
  }
}
