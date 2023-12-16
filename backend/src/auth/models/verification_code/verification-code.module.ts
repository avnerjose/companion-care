import { Module } from '@nestjs/common';
import { VerificationCodeService } from './verification-code.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VerificationCodeService, PrismaService],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}
