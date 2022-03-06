import { Module } from '@nestjs/common'
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {AuthenticationService} from "./authentication.service";
import {LocalStrategy} from "./local.strategy";
import {AuthenticationController} from "./authentication.controller";

@Module({
  imports: [UserModule, PassportModule],
  providers: [AuthenticationService, LocalStrategy],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
