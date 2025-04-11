import { PrismaClient } from "@prisma/client";
import { Avatar, Badge, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { issueStatus } from "./lib/issueStatusUtils";

const LatestIssues = async () => {
  const prisma = new PrismaClient();

  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4" mb="5">
        Latest Issues
      </Heading>
      <Table.Root>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" align="start" gap="2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <Badge color={issueStatus[issue.status].color}>
                      {issueStatus[issue.status].label}
                    </Badge>
                  </Flex>
                  {issue.assignedUser && (
                    <Avatar
                      src={issue.assignedUser.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
