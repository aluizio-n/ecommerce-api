import type { FastifyInstance } from "fastify";
import z from "zod";
import { prisma } from "../../lib/prisma";

export async function deleteUser(app:FastifyInstance) {
    app.delete('/users/:userId', async (request, reply)=>{
        const getUserParam = z.object({
            userId:  z.string().uuid()
        })

        const {userId} = getUserParam.parse(request.params)

        const user = await prisma.user.findUnique({
            where:{
                id: userId
            }
        })

        if(!user){
            reply.status(404).send('User not found')
        }

        await prisma.user.delete({
            where:{
                id: userId
            },
        })

        reply.status(204).send()

    })
}