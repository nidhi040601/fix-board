import IssueForm from "@/app/issues/_components/IssueForm";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const prisma = new PrismaClient();

  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
