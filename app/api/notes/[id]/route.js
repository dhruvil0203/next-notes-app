import dbConnection from "@/lib/db";
import Note from "@/models/notes";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    await dbConnection();

    const note = await Note.findByIdAndDelete(id);

    // Always flush Redis cache, even if the note wasn't found in MongoDB.
    // This handles the case where a note was manually deleted from DB but
    // is still in the Redis cache (ghost note).
    try {
      if (redis) await redis.del("notes");
    } catch (redisError) {
      console.error("Redis DEL error:", redisError.message);
    }

    if (!note) {
      // Return 200 with notFound flag so frontend can still remove it from UI
      return NextResponse.json(
        { success: true, notFound: true },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, data: {} });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    await dbConnection();

    const body = await request.json();

    const note = await Note.findByIdAndUpdate(
      id,
      { ...body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!note) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }

    try {
      if (redis) await redis.del("notes");
    } catch (redisError) {
      console.error("Redis DEL error:", redisError.message);
    }

    return NextResponse.json({ success: true, data: note });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}