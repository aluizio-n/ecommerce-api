import type { FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import z from "zod";

export async function getUser(app:FastifyInstance) {
    app.get('/users', async (request, reply) => {
        
        const getAllUsers = await prisma.user.findMany()
        return reply.status(200).send(getAllUsers)
    })

    app.get('/users/:userId', async (request, reply)=>{

        const getUserParam = z.object({
            userId:  z.string().uuid()
        })

        const {userId} = getUserParam.parse(request.params)

        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        })

        return reply.status(200).send(user)
    })
    
}