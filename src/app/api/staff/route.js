import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const staffList = await prisma.staff.findMany();
  return NextResponse.json({
    status: 200,
    message: null,
    data: staffList,
  });
}

export async function POST(request) {
  const req = await request.json();
  const staffList = await prisma.staff.create({
    data: req,
  });
  return NextResponse.json({
    status: 200,
    message: null,
    data: staffList,
  });
}

export async function PUT(request) {
  let req = await request.json();
  const username = request.nextUrl.searchParams.get("username");
  const staff = await prisma.staff.updateMany({
    where: {
      username: username,
    },
    data: req,
  });
  return NextResponse.json({
    status: 200,
    message: null,
    data: staff,
  });
}

export async function DELETE(request) {
  try {
    const username = request.nextUrl.searchParams.get("username");
    const staffList = await prisma.staff.deleteMany({
      where: {
        username: username,
      },
    });
    return NextResponse.json({
      status: 200,
      message: null,
      data: staffList,
    });
  } catch (e) {
    return NextResponse.json({
      status: 403,
      message: "Bad Request",
      data: null,
    });
  }
}
