import { Issue } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import SelectAssignee from "./SelectAssignee";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const { id } = await params;

  const response = await axios.get("http://localhost:3000/api/issues/" + id);

  const issueDetail: Issue = response.data;

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issueDetail} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <SelectAssignee />
            <EditIssueButton issueId={issueDetail.id} />
            <DeleteIssueButton issueId={issueDetail.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
