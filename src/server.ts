import fastify from "fastify";
import { createUser } from "./routes/user/create-user";
import { loginUser } from "./routes/user/login-user";
import fastifyJwt from "@fastify/jwt";
import { env } from "../env";
import { getUser } from "./routes/user/get-user";
import { updateUser } from "./routes/user/update-user";
import { deleteUser } from "./routes/user/delete-user";

const app = fastify()

app.get("/", ()=>{
    return 'Home'
})

app.register(fastifyJwt, { secret: env.JWT_KEY }); 

//user routes
app.register(createUser)
app.register(loginUser)
app.register(getUser)
app.register(updateUser)
app.register(deleteUser)


app.listen({port: env.PORT}).then(()=>{
    console.log(`server running on port ${env.PORT}`)
})
