import { Table } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <Table.Root size="3" className="mt-4">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
          {/* <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell> */}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue}>
            <Table.RowHeaderCell>
              <Skeleton />
            </Table.RowHeaderCell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
            <Table.Cell>
              <Skeleton />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LoadingIssuesPage;
