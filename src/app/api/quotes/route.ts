import clientPromise from "../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const quotes = await db.collection("quotes").find().toArray();
  return NextResponse.json(quotes);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const body = await req.json();
  const result = await db.collection("quotes").insertOne(body);
  return NextResponse.json(result);
}
