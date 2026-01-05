import z from "zod";

const testEnvSchema = z.object({
  TEST_HOST: z.url(),
})

export const testEnv = testEnvSchema.parse(process.env);