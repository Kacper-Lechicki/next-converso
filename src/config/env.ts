import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().min(1),
  NEXT_PUBLIC_VAPI_WEB_TOKEN: z.string().min(1),
  NEXT_PUBLIC_APP_URL: z.string().optional().default('http://localhost:3000'),
});

const clientEnvRaw = {
  NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
  NEXT_PUBLIC_VAPI_WEB_TOKEN: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  CLERK_SECRET_KEY: z.string().min(1),
});

const isServer = typeof window === 'undefined';

function validateEnv() {
  const clientResult = clientEnvSchema.safeParse(clientEnvRaw);

  if (!clientResult.success) {
    console.error('❌ Invalid client environment variables:');

    Object.entries(clientResult.error.flatten().fieldErrors).forEach(
      ([key, errors]) => {
        console.error(`  - ${key}: ${errors?.join(', ')}`);
      },
    );

    if (isServer) {
      process.exit(1);
    }

    throw new Error('Invalid client environment variables');
  }

  if (isServer) {
    const serverResult = serverEnvSchema.safeParse(process.env);

    if (!serverResult.success) {
      console.error('❌ Invalid server environment variables:');

      Object.entries(serverResult.error.flatten().fieldErrors).forEach(
        ([key, errors]) => {
          console.error(`  - ${key}: ${errors?.join(', ')}`);
        },
      );

      process.exit(1);
    }

    return { ...clientResult.data, ...serverResult.data };
  }

  return clientResult.data;
}

type ClientEnv = z.infer<typeof clientEnvSchema>;
type ServerEnv = z.infer<typeof serverEnvSchema>;
type Env = ClientEnv & Partial<ServerEnv>;

export const env: Env = validateEnv();
