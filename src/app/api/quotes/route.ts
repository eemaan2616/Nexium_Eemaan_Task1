import clientPromise from '../../lib/mongodb';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const quotes = await db.collection('quotes').find({ deleted: { $ne: true } }).toArray();
  return NextResponse.json(quotes);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const body = await req.json();
  const result = await db.collection('quotes').insertOne({ ...body, deleted: false });
  return NextResponse.json(result);
}

export async function DELETE(req: Request) {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const result = await db
    .collection('quotes')
    .updateOne({ _id: new ObjectId(id) }, { $set: { deleted: true } });

  return NextResponse.json({ success: true, result });
}
