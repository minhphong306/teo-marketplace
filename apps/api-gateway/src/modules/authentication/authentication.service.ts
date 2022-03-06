import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt'
import {RegistrationDto} from "./dto/registration.dto";
import {HttpException, HttpStatus} from "@nestjs/common";

export class AuthenticationService {
  constructor(
    private readonly userService: UserService
  ) {
  }

  public async register(registrationData: RegistrationDto) {
    try {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);
      const createdUser = await this.userService.createUser({
        ...registrationData,
        password: hashedPassword
      });

      createdUser.password = undefined;
      return createdUser
    } catch (e) {
      console.error('Got err: ', e)
      if (e?.code === PostgresErrorCodeEnum.UniqueViolation) {
        throw new HttpException('User with that email already exist', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(user.password, hashedPassword);

      user.password = undefined;
      return user;
    } catch (e) {
      throw new HttpException('Wrong credentitals provided', HttpStatus.BAD_REQUEST);
    }
  }

  public async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = bcrypt.compare(
      hashedPassword,
      plainTextPassword,
    )

    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
