import { Button, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { issueStatus } from "../../lib/issueStatusUtils";
import { Issue, PrismaClient } from "@prisma/client";
import IssueStatusFilter from "./IssueStatusFilter";
import { columns } from "./IssueTable";
import Pagination from "@/app/components/Pagination";
import IssueTable from "./IssueTable";
import { Metadata } from "next";

interface Props {
  searchParams: {
    status: keyof typeof issueStatus;
    orderBy: keyof Issue;
    page: string;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const prisma = new PrismaClient();

  const params = await searchParams;
  const { status } = await searchParams;

  const orderBy = columns.map((column) => column.value).includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const page = parseInt(params.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: pageSize * (page - 1),
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="3" className="px-4">
      <Flex direction="row" justify="between">
        <Heading>Issues</Heading>
        <Flex gap="3" align="center">
          <IssueStatusFilter />
          <Button>
            <Link href="/issues/new">New Issue</Link>
          </Button>
        </Flex>
      </Flex>
      <IssueTable issues={issues} params={params} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic"; //To referesh data on every request

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues",
};

export default IssuesPage;
