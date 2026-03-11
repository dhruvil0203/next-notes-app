import dbConnection from "@/lib/db";
import Note from "@/models/notes";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function GET() {
  try {
    await dbConnection();

    try {
      if (redis) {
        const cachedNotes = await redis.get("notes");
        if (cachedNotes) {
          return NextResponse.json({ success: true, data: JSON.parse(cachedNotes) });
        }
      }
    } catch (redisError) {
      console.error("Redis GET error:", redisError.message);
    }

    const notes = await Note.find({}).sort({ createdAt: -1 });

    try {
      if (redis) await redis.set("notes", JSON.stringify(notes), "EX", 60);
    } catch (redisError) {
      console.error("Redis SET error:", redisError.message);
    }

    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(request) {
  try {
    await dbConnection();
    const body = await request.json();
    const note = await Note.create(body);

    try {
      if (redis) await redis.del("notes");
    } catch (redisError) {
      console.error("Redis DEL error:", redisError.message);
    }

    return NextResponse.json({ success: true, data: note }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
