import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envSchema = z.object({
  PORT: z.coerce.number().default(4444),
  JWT_KEY: z.string(),
})

export const env = envSchema.parse(process.env)
