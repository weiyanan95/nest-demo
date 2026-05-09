import { Injectable } from '@nestjs/common';

@Injectable()
export class MainService {
  sendMail(options: { to: string; subject: string; text: string }) {
    //发送邮件
    console.log(
      `发送邮件给 ${options.to} ,主题 ${options.subject} ,内容 ${options.text}`,
    );
  }
}
