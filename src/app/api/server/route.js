import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const server = await prisma.server.findFirst();
  return NextResponse.json({
    status: 200,
    message: null,
    data: server,
  });
}

export async function POST(request) {
  const req = await request.json();
  const server = await prisma.server.findFirst();
  if (server != null) {
    const update = await prisma.server.update({
      where: {
        id: server.id,
      },
      data: req,
    });
    return NextResponse.json({
      status: 200,
      message: null,
      data: update,
    });
  } else {
    const create = await prisma.server.create({
      data: req,
    });
    return NextResponse.json({
      status: 200,
      message: null,
      data: create,
    });
  }
}
