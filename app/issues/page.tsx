import { Badge, Button, Flex, Heading, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React from "react";
import ErrorMessage from "../components/ErrorMessage";
import { issueStatus } from "../lib/issueStatusUtils";
import { Issue } from "@prisma/client";

const IssuesPage = async () => {
  let issues: Issue[] = [];
  let errorMessage: string = "";

  try {
    const response = await axios.get("http://localhost:3000/api/issues/");
    issues = await response.data;
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "An unknown error occured";
  }

  return (
    <div className="px-4">
      <Flex direction="row" justify="between">
        <Heading>Issues</Heading>
        <Button>
          <Link href="issues/new">New Issue</Link>
        </Button>
      </Flex>
      <ErrorMessage>{errorMessage}</ErrorMessage>
      {!errorMessage && issues.length == 0 && <Text as="p">No issues</Text>}
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
                  <Link href={`issues/${id}`}> {title}</Link>
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
