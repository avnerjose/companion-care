import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { MagicLoginStrategy } from './magic-login.strategy';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { CompanionService } from 'src/models/companion/companion.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private companionService: CompanionService,
    private magicLinkStrategy: MagicLoginStrategy,
  ) {}

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: { destination: string },
  ) {
    try {
      await this.authService.validateDoctor(body.destination);

      return this.magicLinkStrategy.send(req, res);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(AuthGuard('magiclogin'))
  @Get('login/callback')
  async loginCallback(@Req() req) {
    return await this.authService.generateTokens(req.user);
  }

  @Post('/send-code')
  async sendVerificationCode(@Body('email') email: string) {
    try {
      await this.authService.validateCompanion(email);

      return this.authService.sendVerificationCodeForCompanion(email);
    } catch {
      throw new UnauthorizedException();
    }
  }

  @Post('/verify-code')
  async validateVerificationCode(
    @Body('email') email: string,
    @Body('code') code: string,
    @Body('notificationToken') notificationToken: string,
  ) {
    try {
      const companion = await this.authService.validateCompanion(email);

      await this.authService.validateCompanionCode(email, code);
      await this.companionService.addNotificationToken(
        companion.id,
        notificationToken,
      );

      return await this.authService.generateTokens(companion);
    } catch {
      throw new UnauthorizedException();
    }
  }
}
