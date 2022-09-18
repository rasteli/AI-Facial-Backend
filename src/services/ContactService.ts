import { sendMail } from "../utils/sendMail"

export class ContactService {
  async execute(email: string, subject: string, description: string) {
    try {
      const mail = {
        fromEmail: process.env.MY_EMAIL as string,
        toEmail: process.env.MY_EMAIL as string,
        payload: { fromEmail: email, description },
        subject,
        template: "../utils/email/templates/contact.handlebars"
      }

      sendMail(mail)
      return { data: { message: "Email enviado." }, code: 200 }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
