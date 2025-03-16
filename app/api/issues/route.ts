import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchemas";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = createIssueSchema.safeParse(body); //safeParse doesn't throw errors if validation fails instead returns a object
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(issues);
}
