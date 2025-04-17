import { getSession } from "next-auth/react";

export async function getAuthToken(): Promise<string | null> {
  const session = await getSession();
  console.log(session);  
  return session?.accessToken || null;
}
