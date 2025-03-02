import type { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import z from 'zod'

export async function getProduct(app: FastifyInstance) {
  app.get('/products', async (request, reply) => {
    const getAllProducts = await prisma.product.findMany()
    return reply.status(200).send(getAllProducts)
  })

  app.get('/products/:productId', async (request, reply) => {
    const getProductParam = z.object({
      productId: z.string().uuid(),
    })

    const { productId } = getProductParam.parse(request.params)

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    return reply.status(200).send(product)
  })
}
