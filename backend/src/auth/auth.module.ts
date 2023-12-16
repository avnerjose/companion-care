import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { DoctorModule } from 'src/models/doctor/doctor.module';
import { CompanionModule } from 'src/models/companion/companion.module';
import { AuthController } from './auth.controller';
import { MagicLoginStrategy } from './magic-login.strategy';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { VerificationCodeModule } from './models/verification_code/verification-code.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesGuard } from './guards/roles.guard';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [
    DoctorModule,
    CompanionModule,
    PassportModule,
    VerificationCodeModule,
    JwtModule.register({
      secret: 'tet',
      signOptions: {
        expiresIn: '150m',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MagicLoginStrategy,
    JwtStrategy,
    PrismaService,
    RolesGuard,
    EmailService,
  ],
})
export class AuthModule {}
