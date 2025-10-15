import { z } from 'zod';

const envSchema = z.object({
    ATLAS_URL: z.string(),
    TOKEN_SECRET: z.string()
});

envSchema.parse(process.env);

declare global {
    namespace NodeJS {
        interface ProcessEnv extends z.infer<typeof envSchema> {}
    }
}