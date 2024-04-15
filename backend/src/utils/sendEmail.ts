import { EmailUser, User } from "../types/interfaces";
import nodemailer from "nodemailer";
import pug from "pug";
import { htmlToText } from "html-to-text";
// new Email(user, url).sendWelcome();

export interface Message {
  subject: string;
  sender?: string;
  message?: string;
  firstName?: string;
}

export class sendEmail {
  to: string | string[];
  url: string;
  from: string;

  constructor(options: EmailUser, url: string) {
    this.to = options.email || "bellhouseexcavating@gmail.com";
    this.url = url;
    this.from = options.from
      ? `${options.firstName} ${options.lastName ? options.lastName : ""} <${
          options.from
        }>`
      : `${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   return 1;
    // }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
  //Send actual email
  async send(template: string, message: Message) {
    //1) Render HTML based on a pug template

    console.log(message.subject);

    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        firstName: message.firstName,
        url: this.url,
        subject: message.subject,
        message: message.message,
        sender: message.sender,
      }
    );
    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      message: message.message,
      html,
      text: htmlToText(html),
      subject: message.subject,
    };

    // 3) Create transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", {
      subject: `Welcome to ${this.url}!`,
      message: "Hi Welcome",
      sender: this.from,
    });
  }

  async sendContactMessage(message: Message) {
    await this.send("contact", message);
  }
}
