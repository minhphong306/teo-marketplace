import {Body, Controller, HttpCode, Post, Req, UseGuards} from '@nestjs/common'
import {AuthenticationService} from "./authentication.service";
import {RegistrationDto} from "./dto/registration.dto";
import {LocalAuthenticationGuard} from "./localAuthentication.guard";
import IRequestWithUser from "./interfaces/requestWithUser.interface";

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
  async logIn(@Req() request: IRequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
