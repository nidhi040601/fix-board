import { Issue } from "@prisma/client";
import { issueStatus } from "@/app/lib/issueStatusUtils";
import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <Badge color={issueStatus[issue.status].color}>
          {issueStatus[issue.status].label}
        </Badge>
        <Text>{new Date(issue.createdAt).toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <p>{issue.description}</p>
      </Card>
    </>
  );
};

export default IssueDetails;
