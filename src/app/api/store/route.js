import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const staffList = await prisma.store.findMany();
  return NextResponse.json({
    status: 200,
    message: null,
    data: staffList,
  });
}

export async function POST(request) {
  let req = await request.json();
  req.price = parseInt(req.price);
  const store = await prisma.store.create({
    data: req,
  });
  return NextResponse.json({
    status: 200,
    message: null,
    data: store,
  });
}

export async function PUT(request) {
  let req = await request.json();
  req.price = parseInt(req.price);
  const id = request.nextUrl.searchParams.get("id");
  const store = await prisma.store.update({
    where: {
      id: id,
    },
    data: req,
  });
  return NextResponse.json({
    status: 200,
    message: null,
    data: store,
  });
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    const store = await prisma.store.deleteMany({
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      status: 200,
      message: null,
      data: store,
    });
  } catch (e) {
    return NextResponse.json({
      status: 403,
      message: "Bad Request",
      data: null,
    });
  }
}
