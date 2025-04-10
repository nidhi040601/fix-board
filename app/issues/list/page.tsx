import { Badge, Button, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { issueStatus } from "../../lib/issueStatusUtils";
import { PrismaClient } from "@prisma/client";
import IssueStatusFilter from "./IssueStatusFilter";

interface Props {
  searchParams: { status: string };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const prisma = new PrismaClient();

  const { status } = await searchParams;

  const issues = await prisma.issue.findMany({
    where: { status },
  });

  console.log("issues", issues);

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
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
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
