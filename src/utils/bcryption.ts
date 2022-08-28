import * as bcrypt from "bcrypt"

export async function hashPassowrd(password: string) {
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(password, salt)

  return hash
}

export async function compareHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash)
}
