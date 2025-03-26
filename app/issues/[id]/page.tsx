import { issueStatus } from "@/app/lib/issueStatusUtils";
import { Issue } from "@prisma/client";
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
import axios from "axios";
import Link from "next/link";
import { IoPencil } from "react-icons/io5";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const response = await axios.get("http://localhost:3000/api/issues/" + id);

  const issueDetail: Issue = response.data;

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{issueDetail.title}</Heading>
        <Flex className="space-x-3" my="2">
          <Badge color={issueStatus[issueDetail.status].color}>
            {issueStatus[issueDetail.status].label}
          </Badge>
          <Text>{new Date(issueDetail.createdAt).toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <p>{issueDetail.description}</p>
        </Card>
      </Box>
      <Box>
        <Button>
          <IoPencil />
          <Link href={`/issues/${issueDetail.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
