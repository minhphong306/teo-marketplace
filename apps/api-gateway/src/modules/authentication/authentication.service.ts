import {UserService} from "../user/user.service";
import * as bcrypt from 'bcrypt'
import {RegistrationDto} from "./dto/registration.dto";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {PostgresErrorCodeEnum} from "../database/postgresErrorCode.enum";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

  public getCookieWithJwtToken(userId: number) {
    const payload: IToken = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
  }

  public getCookieForLogOut(){
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`
  }
}
