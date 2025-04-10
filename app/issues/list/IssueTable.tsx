import { Issue } from "@prisma/client";
import { Badge, Table } from "@radix-ui/themes";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import React from "react";
import { issueStatus } from "@/app/lib/issueStatusUtils";

interface IssueQuery {
  status: keyof typeof issueStatus;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  issues: Issue[];
  params: IssueQuery;
}

const IssueTable = ({ issues, params }: Props) => {
  return (
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
            <Table.Cell>{new Date(createdAt).toLocaleDateString()}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export const columns: {
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

export default IssueTable;
