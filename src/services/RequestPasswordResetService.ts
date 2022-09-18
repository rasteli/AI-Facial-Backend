import crypto from "crypto"

import { prismaClient } from "../prisma"
import { sendMail } from "../utils/sendMail"
import { hashPassowrd } from "../utils/bcryption"

export class RequestPasswordResetService {
  async execute(email: string) {
    try {
      let user = await prismaClient.user.findFirst({
        where: {
          email
        }
      })

      if (user) {
        const token = crypto.randomBytes(32).toString("hex")
        const hashedToken = await hashPassowrd(token)

        user = await prismaClient.user.update({
          where: {
            email
          },
          data: {
            token: hashedToken
          }
        })

        const link = `${process.env.CLIENT_URL}/passwordReset?token=${token}&id=${user.id}`

        const mail = {
          fromEmail: process.env.MY_EMAIL as string,
          toEmail: email,
          payload: { name: user.name, link },
          subject: "Alteração de senha",
          template: "../utils/email/templates/requestResetPassword.handlebars"
        }

        sendMail(mail)
        return { data: { message: "Email enviado.", link }, code: 200 }
      }

      return {
        data: { error: "Email não vinculado a nenhuma conta." },
        code: 404
      }
    } catch {
      return { data: { error: "Ops! Algo deu errado..." }, code: 500 }
    }
  }
}
