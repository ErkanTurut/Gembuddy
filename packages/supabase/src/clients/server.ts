import { createServerClient } from "@supabase/ssr";
import { cookies, type UnsafeUnwrappedCookies } from "next/headers";
import type { Database } from "../types";

export const createClient = () => {
  const cookieStore = (cookies() as unknown as UnsafeUnwrappedCookies);

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch (error) {}
        },
      },
    },
  );
};
