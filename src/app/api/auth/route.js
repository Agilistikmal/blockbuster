import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  const cookie = cookies();
  const admin = await prisma.admin.findFirst({
    where: {
      username: "Admin",
    },
  });
  if (cookie.get("Auth").value != admin.password) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }
  return NextResponse.json({
    status: 200,
    message: null,
    data: null,
  });
}

export async function POST(request) {
  const req = await request.json();
  const admin = await prisma.admin.findFirst({
    where: {
      username: req.username,
      password: req.password,
    },
  });

  if (admin == null) {
    return NextResponse.json({
      status: 401,
      message: "Unauthorized",
      data: null,
    });
  }
  const cookie = cookies();
  cookie.set("Auth", admin.password);
  return NextResponse.json({
    status: 200,
    message: null,
    data: admin,
  });
}
