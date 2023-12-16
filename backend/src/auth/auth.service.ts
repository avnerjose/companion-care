import { ConsoleLogger, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Companion, Doctor } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { CompanionService } from 'src/models/companion/companion.service';
import { DoctorService } from 'src/models/doctor/doctor.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { VerificationCodeService } from './models/verification_code/verification-code.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private doctorService: DoctorService,
    private companionService: CompanionService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private verificationCodeService: VerificationCodeService,
    private emailService: EmailService,
  ) {}

  async generateTokens(user: Doctor | Companion) {
    let payload = {};

    if ('crm' in user) {
      payload = { email: user.email, sub: user.id, role: 'doctor' };
    } else {
      const hospitalProcedure =
        await this.prismaService.hospitalProcedure.findFirst({
          where: {
            companionId: user.id,
            AND: {
              status: 'Opened',
            },
          },
        });
      console.log(hospitalProcedure)

      payload = {
        name: user.name,
        sub: user.email,
        role: 'companion',
        hospitalProcedureId: hospitalProcedure.id,
      };
    }

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateDoctor(email: string) {
    const doctor = await this.doctorService.findOneByEmail(email);

    if (!doctor) {
      throw new UnauthorizedException();
    }

    return doctor;
  }

  async validateCompanion(email: string) {
    const companion = await this.companionService.findOneByEmail(email);

    if (!companion) {
      throw new UnauthorizedException();
    }

    return companion;
  }

  async sendVerificationCodeForCompanion(email: string) {
    const companion = await this.validateCompanion(email);

    const uniqueCode = Math.floor(100000 + Math.random() * 900000);

    await this.emailService.sendEmail({
      email,
      subject: `Login na CompanionCare - Acompanhante - Código: ${uniqueCode}`,
      text: `Seu código de verificação: ${uniqueCode}`,
    });

    const hashedCode = await bcrypt.hash(uniqueCode.toString(), 10);

    const validationCodeExistis =
      await this.prismaService.verificationCode.findFirst({
        where: {
          companionId: companion.id,
        },
      });

    if (validationCodeExistis) {
      await this.prismaService.verificationCode.delete({
        where: {
          id: validationCodeExistis.id,
        },
      });
    }

    await this.prismaService.verificationCode.create({
      data: {
        code: hashedCode,
        expiryDate: new Date(Date.now() + 60000 * 5), // 5 minutos,
        companionId: companion.id,
      },
    });
  }

  async validateCompanionCode(email: string, code: string) {
    const companion = await this.companionService.findOneByEmail(email);
    const companionCode =
      await this.verificationCodeService.findOneByCompanionId(companion.id);

    console.log(companion);
    console.log(companionCode);

    if (!companion) {
      throw new UnauthorizedException();
    }

    const isValid = await bcrypt.compare(code, companionCode.code);

    console.log(isValid);

    if (!isValid) {
      throw new UnauthorizedException();
    }
  }
}
