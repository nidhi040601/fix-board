import { Badge, Button, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { issueStatus } from "../../lib/issueStatusUtils";
import { Issue, PrismaClient } from "@prisma/client";
import IssueStatusFilter from "./IssueStatusFilter";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

interface Props {
  searchParams: { status: keyof typeof issueStatus; orderBy: keyof Issue };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: "Title", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const prisma = new PrismaClient();

  const params = await searchParams;
  const { status } = await searchParams;

  const orderBy = columns.map((column) => column.value).includes(params.orderBy)
    ? { [params.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div className="px-4">
      <Flex direction="row" justify="between">
        <Heading>Issues</Heading>
        <Flex gap="3" align="center">
          <IssueStatusFilter />
          <Button>
            <Link href="/issues/new">New Issue</Link>
          </Button>
        </Flex>
      </Flex>
      {issues.length == 0 && <Text as="p">No issues</Text>}
      {issues.length > 0 && (
        <Table.Root size="3" className="mt-4">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell key={column.value}>
                  <Link
                    href={{
                      query: { ...params, orderBy: column.value },
                    }}
                  >
                    {column.label}
                  </Link>
                  {column.value === params.orderBy && (
                    <MdOutlineKeyboardArrowUp className="inline" />
                  )}
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map(({ id, title, status, createdAt }) => (
              <Table.Row key={id}>
                <Table.RowHeaderCell>
                  <Link href={`/issues/${id}`}> {title}</Link>
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Badge color={issueStatus[status].color}>
                    {issueStatus[status].label}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {new Date(createdAt).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </div>
  );
};

export const dynamic = "force-dynamic"; //To referesh data on every request

export default IssuesPage;
