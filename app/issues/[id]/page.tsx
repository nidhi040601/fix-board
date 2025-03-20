import { issueStatus } from "@/app/lib/issueStatusUtils";
import { Issue } from "@prisma/client";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const response = await axios.get("http://localhost:3000/api/issues/" + id);

  const issueDetail: Issue = response.data;

  return (
    <div className="space-y-5">
      <Heading>{issueDetail.title}</Heading>
      <Flex className="space-x-3" my="2">
        <Badge color={issueStatus[issueDetail.status].color}>
          {issueStatus[issueDetail.status].label}
        </Badge>
        <Text as="p">{new Date(issueDetail.createdAt).toDateString()}</Text>
      </Flex>
      <Card>
        <p>{issueDetail.description}</p>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
