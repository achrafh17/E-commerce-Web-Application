import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL, pass: process.env.PASSWORD },
    });
  }
  async sendMail(to: string, subject: string, text: string, html: string) {
    const mail = await this.transporter.sendMail({
      from: `"MegaMart Support" <${process.env.EMAIL}>`,
      to,
      subject,
      text,
      html,
    });
    return mail;
  }
}
