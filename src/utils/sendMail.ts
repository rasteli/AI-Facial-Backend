import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"
import handlebars from "handlebars"

interface RequestPayload {
  name: string
  link: string
}

export function sendMail(
  email: string,
  payload: RequestPayload,
  subject: string,
  template: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const templateSource = fs.readFileSync(path.join(__dirname, template), "utf8")
  const comiledTemplateSource = handlebars.compile(templateSource)

  const options = {
    from: process.env.FROM_EMAIL,
    to: email,
    subject,
    html: comiledTemplateSource(payload)
  }

  transporter.sendMail(options, (error, info) => {
    if (error) {
      return console.log(error)
    }

    console.log(info)
  })
}
