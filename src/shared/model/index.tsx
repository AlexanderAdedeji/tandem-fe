import {z} from 'Zod'

export const authDataSchema = z.object({
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    token: z.string(),

  });


export type AuthDataSchemaInterface = z.infer<typeof authDataSchema>
