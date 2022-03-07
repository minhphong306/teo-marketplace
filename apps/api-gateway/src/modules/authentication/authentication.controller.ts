import {Body, Controller, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common'
import {AuthenticationService} from "./authentication.service";
import {RegistrationDto} from "./dto/registration.dto";
import {LocalAuthenticationGuard} from "./localAuthentication.guard";
import IRequestWithUser from "./interfaces/requestWithUser.interface";
import { Response } from 'express'
import JwtAuthenticationGuard from "./jwt-authentication.guard";

@Controller('/authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ){}

  @Post('register')
  async register(@Body() registrationData: RegistrationDto) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: IRequestWithUser, @Res() response: Response) {
    const { user } = request;
    const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    response.setHeader('Set-Cookie', cookie);
    user.password = undefined;
    return response.send(user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: IRequestWithUser, @Res() response: Response) {
    response.setHeader('Set-Cookie', this.authenticationService.getCookieForLogOut());
    return response.sendStatus(200);
  }
}
