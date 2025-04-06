import { Issue } from "@prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import axios from "axios";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";

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
        <IssueDetails issue={issueDetail} />
      </Box>
      <Box>
        <EditIssueButton issueId={issueDetail.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
