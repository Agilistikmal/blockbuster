import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const req = await request.json();
  const admin = await prisma.admin.create({
    data: req,
  });

  return NextResponse.json({
    status: 200,
    message: null,
    data: admin,
  });
}

export async function PUT(request) {
  const req = await request.json();
  const admin = await prisma.admin.findFirst({
    where: {
      username: req.username,
      password: req.current_password,
    },
  });
  if (admin == null) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }

  const update = await prisma.admin.update({
    where: {
      id: admin.id,
    },
    data: {
      password: req.new_password,
    },
  });

  return NextResponse.json({
    status: 200,
    message: null,
    data: update,
  });
}
