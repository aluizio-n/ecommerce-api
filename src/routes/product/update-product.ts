import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../../lib/prisma'

export async function updateProduct(app: FastifyInstance) {
  app.patch('/products/:productId', async (request, reply) => {
    const getProductParam = z.object({
      productId: z.string().uuid(),
    })
    const getProductBody = z.object({
      name: z.string(),
      description: z.string(),
      price: z.number(),
      stock: z.number(),
      image: z.string(),
      categoryId: z.string(),
    })

    const { productId } = getProductParam.parse(request.params)
    const { name, description, price, stock, image, categoryId } =
      getProductBody.parse(request.body)

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      reply.status(404).send('Product not found')
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: name || product?.name,
        description: description || product?.description,
        price: price || product?.price,
        stock: stock || product?.stock,
        image: image || product?.image,
        categoryId: categoryId || product?.categoryId,
      },
    })

    reply.send(product)
  })
}
