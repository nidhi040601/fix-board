import { patchIssueSchema } from "@/app/validationSchemas";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized. Please log in to perform this action." },
      { status: 401 }
    );

  const { id } = await params;
  const body = await request.json();

  console.log(body, body.assignedUserId);

  const validation = patchIssueSchema.safeParse(body); //safeParse doesn't throw errors if validation fails instead returns a object
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (body.assignedUserId) {
    const user = prisma.user.findUnique({
      where: { id: body.assignedUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid User." }, { status: 404 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      assignedUserId: body.assignedUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  return NextResponse.json(issue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { message: "Unauthorized. Please log in to perform this action." },
      { status: 401 }
    );

  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) {
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json(
    { message: "Issue deleted successfully." },
    { status: 200 }
  );
}
