import { createId } from "@paralleldrive/cuid2";
import { clerkClient } from "@clerk/nextjs/server";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";

const webhookSecret = process.env.WEBHOOK_SECRET || "";

type EventType = "user.created" | "user.updated" | "user.deleted" | "*";

interface UserEventData {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  email_addresses: Array<{
    email_address: string;
    verification: boolean;
  }>;
  username?: string | null;
  image_url?: string | null;
  external_accounts: Array<{
    provider: string;
    provider_user_id: string;
  }>;
  created_at: number;
  updated_at: number;
}

interface Event {
  data: UserEventData;
  object: "event";
  type: EventType;
}

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;

  if (eventType === "user.created" || eventType === "user.updated") {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      username,
      image_url,
      external_accounts,
      created_at,
      updated_at,
    } = evt.data;

    // Ensure we have an email address
    const primaryEmail = email_addresses[0]?.email_address;
    if (!primaryEmail) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    // Prepare user data according to our schema
    const userData = {
      id: createId(), // If you're using createId from cuid2
      clerkId: id,
      email: primaryEmail,
      emailVerified: email_addresses[0]?.verification ?? false,
      username: username || null,
      firstName: first_name || null,
      lastName: last_name || null,
      imageUrl: image_url || null,
      externalAccounts: external_accounts.map(acc => ({
        provider: acc.provider,
        providerId: acc.provider_user_id
      })),
      updatedAt: new Date(updated_at),
      createdAt: new Date(created_at)
    } satisfies typeof users.$inferInsert;

    try {
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.clerkId, id))
        .get();

      if (existingUser) {
        // Remove id from update data as we don't want to update it
        const { id: _, createdAt: __, ...updateData } = userData;
        
        await db
          .update(users)
          .set(updateData)
          .where(eq(users.clerkId, id));

        return NextResponse.json(
          { message: "User updated successfully" },
          { status: 200 }
        );
      } else {
        await db.insert(users).values(userData);

        return NextResponse.json(
          { message: "User created successfully" },
          { status: 201 }
        );
      }
    } catch (error) {
      console.error("Error handling user data:", error);
      return NextResponse.json(
        { error: "Error processing user data" },
        { status: 500 }
      );
    }
  }

  if (eventType === "user.deleted") {
    try {
      await db
        .delete(users)
        .where(eq(users.clerkId, evt.data.id));

      return NextResponse.json(
        { message: "User deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting user:", error);
      return NextResponse.json(
        { error: "Error deleting user" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;