import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Companion, Doctor } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'tet',
    });
  }

  async validate(payload: { email: string; role: 'doctor' | 'companion' }) {
    let user: Doctor | Companion;

    if (payload.role === 'doctor') {
      user = await this.authService.validateDoctor(payload.email);
    } else {
      user = await this.authService.validateCompanion(payload.email);
    }

    if (!user) {
      new UnauthorizedException();
    }

    return { ...user, role: payload.role };
  }
}
