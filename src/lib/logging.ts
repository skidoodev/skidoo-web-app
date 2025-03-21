import { db } from "@/server/db";
import { userLogs } from "@/server/db/schema";
import { createId } from "@paralleldrive/cuid2";

export type LogAction = 
  | 'generate_itinerary'
  | 'modify_itinerary'
  | 'save_itinerary'
  | 'rate_limit_exceeded'
  | 'login'
  | 'signup'
  | 'error';

/**
 * Logs a user action to the database and console
 */
export async function logUserAction(
  action: LogAction,
  details: Record<string, any>,
  userId?: string,
  userName?: string,
  userEmail?: string
) {
  try {
    // Log to console for Vercel's built-in logs
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      action,
      userId,
      userName,
      userEmail,
      details,
    }));
    
    // Save to Turso database
    await db.insert(userLogs).values({
      // This line adds the id field which was missing
      id: createId(), // Make sure to import createId from "@paralleldrive/cuid2"
      userId: userId || null,
      userName: userName || null,
      userEmail: userEmail || null,
      action,
      details: JSON.stringify(details),
    });
  } catch (error) {
    // Don't let logging errors affect the application
    console.error('Failed to log user action:', error);
  }
}