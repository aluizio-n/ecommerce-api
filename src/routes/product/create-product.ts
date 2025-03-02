import type { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'

export async function createProduct(app: FastifyInstance) {
  app.post('/register_product', async (request, reply) => {
    const getProductBody = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      stock: z.number(),
      image: z.string(),
      categoryId: z.string(),
    })

    const { name, description, price, stock, image, categoryId } =
      getProductBody.parse(request.body)

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        image,
        categoryId,
      },
    })

    reply.status(201).send({ productId: product.id })
  })
}
