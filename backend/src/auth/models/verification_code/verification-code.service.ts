import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerificationCodeService {
  constructor(private prismaService: PrismaService) {}

  async findOneByCompanionId(id: number) {
    return this.prismaService.verificationCode.findFirst({
      where: {
        companionId: id,
      },
    });
  }
}
