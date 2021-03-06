import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt";
import {ConfigService} from "@nestjs/config";
import {UserService} from "../user/user.service";
import {ExtractJwt} from "passport-jwt";
import {Request} from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }

  async validate(payload: IToken) {
    return this.userService.getById(payload.userId);
  }
}
