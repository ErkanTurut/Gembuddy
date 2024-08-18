import { createClient } from "@/lib/supabase/server";
import { AccessToken } from "livekit-server-sdk";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const db = createClient();

  const {
    data: { session },
    error,
  } = await db.auth.getSession();
  if (error) {
    return Response.json(error.message, { status: error.status });
  }
  if (!session) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const { data: company } = await db
    .from("company")
    .select("*, company_user(user_id)")
    .eq("company_user.user_id", session.user.id)
    .single();

  const roomName = Math.random().toString(36).substring(7);
  const apiKey = process.env.LIVEKIT_API_KEY;
  const apiSecret = process.env.LIVEKIT_API_SECRET;

  const at = new AccessToken(apiKey, apiSecret, {
    identity: "human_user",
    metadata: JSON.stringify({
      session,
      company,
    }),
  });
  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canPublishData: true,
    canSubscribe: true,
  });
  return Response.json({
    accessToken: await at.toJwt(),
    url: process.env.LIVEKIT_URL,
  });
}
