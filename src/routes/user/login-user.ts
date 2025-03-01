import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function loginUser(app: FastifyInstance) {
  app.post('/login', async (request, reply) => {
    const loginUserBody = z.object({
      email: z.string(),
      password: z.string(),
    })

    const { email, password } = loginUserBody.parse(request.body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return reply.status(401).send({ message: 'Usuário não encontrado' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return reply.status(401).send({ message: 'Senha incorreta' })
    }

    const token = app.jwt.sign(
      { userId: user.id, email: user.email },
      { expiresIn: '1h' },
    )

    return reply.send({ message: 'Login bem-sucedido', token })
  })
}
