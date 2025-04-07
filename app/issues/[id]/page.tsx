import { Issue } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const response = await axios.get("http://localhost:3000/api/issues/" + id);

  const issueDetail: Issue = response.data;

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issueDetail} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton issueId={issueDetail.id} />
          <DeleteIssueButton issueId={issueDetail.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
