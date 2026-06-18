import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const db = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('Falta ADMIN_EMAIL o ADMIN_PASSWORD en .env.local')
    process.exit(1)
  }

  const existing = await db.usuario.findUnique({ where: { email } })
  if (existing) {
    console.log(`El usuario ${email} ya existe.`)
    return
  }

  const hashed = await hash(password, 12)
  await db.usuario.create({ data: { email, password: hashed } })
  console.log(`Usuario admin creado: ${email}`)
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect())
