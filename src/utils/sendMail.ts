import fs from "fs"
import path from "path"
import nodemailer from "nodemailer"
import handlebars from "handlebars"

interface Mail {
  fromEmail: string
  toEmail: string
  payload: any
  subject: string
  template: string
}

export function sendMail({
  fromEmail,
  toEmail,
  payload,
  subject,
  template
}: Mail) {
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
    from: fromEmail,
    to: toEmail,
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
