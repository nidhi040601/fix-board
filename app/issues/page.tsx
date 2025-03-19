"use client";

import { Badge, Button, Flex, Heading, Table, Text } from "@radix-ui/themes";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { issueStatus } from "../lib/issueStatusUtils";
import LoadingIssuesPage from "./loading";

interface Issue {
  id: string;
  title: string;
  status: string;
  createdAt: Date;
}

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("/api/issues");
        setIssues(response.data);
        setLoading(false);
      } catch (err) {
        setError("An unexpected error occured");
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  return (
    <div className="px-4">
      <Flex direction="row" justify="between">
        <Heading>Issues</Heading>
        <Button>
          <Link href="issues/new">New Issue</Link>
        </Button>
      </Flex>
      <ErrorMessage>{error}</ErrorMessage>
      {loading && <LoadingIssuesPage />}
      {!loading && !error && issues.length == 0 && (
        <Text as="p">No issues</Text>
      )}
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
                <Table.RowHeaderCell>{title}</Table.RowHeaderCell>
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

export default IssuesPage;
