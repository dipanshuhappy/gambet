import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string(),
    NEXT_PUBLIC_SUPABASE_API_KEY: z.string(),
    NEXT_PUBLIC_RECLAIM_APPLICATION: z.string(),
    NEXT_PUBLIC_RECLAIM_SECRET: z.string(),
  },
  server:{
    DOMAIN: z.string(),
    KEY: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    NEXT_PUBLIC_RECLAIM_APPLICATION: process.env.NEXT_PUBLIC_RECLAIM_APPLICATION,
    NEXT_PUBLIC_RECLAIM_SECRET: process.env.NEXT_PUBLIC_RECLAIM_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
    DOMAIN: process.env.DOMAIN,
    KEY: process.env.KEY,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});