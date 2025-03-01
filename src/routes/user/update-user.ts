import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'

export async function updateUser(app: FastifyInstance) {
  app.patch('/users/:userId', async (request, reply) => {
    const getUserParam = z.object({
      userId: z.string().uuid(),
    })
    const getUserBody = z.object({
      email: z.string(),
      address: z.string(),
      phone: z.string(),
    })

    const { userId } = getUserParam.parse(request.params)
    const { email, address, phone } = getUserBody.parse(request.body)

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      reply.status(404).send('User not found')
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email || user?.email,
        address: address || user?.address,
        phone: phone || user?.phone,
      },
    })

    reply.send(user)
  })
}
