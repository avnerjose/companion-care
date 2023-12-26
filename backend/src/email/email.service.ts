import * as nodemailer from 'nodemailer';
import { SendEmailDTO } from './dtos/send-email-dto';

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  async sendEmail({ email, subject, text }: SendEmailDTO) {
    try {
      await this.transporter.sendMail({
        from: {
          name: 'CompanionCare',
          address: process.env.MAIL_USERNAME,
        },
        to: email,
        subject,
        html: text,
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}
