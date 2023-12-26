import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-magic-login';

import { AuthService } from './auth.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class MagicLoginStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {
    super({
      secret: 'tet',
      jwt: {
        expiresIn: '150m',
      },
      callbackUrl: `${process.env.FRONT_END_URL}/login/callback`,
      sendMagicLink: async (email: string, href: string) => {
        await this.emailService.sendEmail({
          email,
          subject: 'CompanionCare Login - Doctor',
          text: `Click on the link to login to the website: <a href="${href}" target="_blank" >Login</a> `,
        });
      },
      verify: async (payload, callback) => {
        callback(null, this.validate(payload));
      },
    });
  }

  validate(payload: any) {
    return this.authService.validateDoctor(payload.destination);
  }
}
