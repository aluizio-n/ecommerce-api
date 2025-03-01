import type { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";
import { hashPassword } from "../../lib/hashPassword";

export async function createUser(app:FastifyInstance) {
    app.post ('/register', async (request, reply)=>{

       const createUserBody = z.object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        password: z.string()
       })

       const {name, email, phone, address, password} = createUserBody.parse(request.body)

       const passwordHash = await hashPassword(password)

       const user = await prisma.user.create({
        data:{
            name,
            email,
            phone,
            address,
            passwordHash
        }
       })

       return reply.status(201).send({userId:user.id})
    })
}