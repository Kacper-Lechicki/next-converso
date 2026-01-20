import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:');

  const fieldErrors = _env.error.flatten().fieldErrors;

  Object.entries(fieldErrors).forEach(([key, errors]) => {
    console.error(`  - ${key}: ${errors?.join(', ')}`);
  });

  process.exit(1);
}

export const env = _env.data;
