import { PrismaClient } from "@prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import IssueDetails from "./IssueDetails";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import SelectAssignee from "./SelectAssignee";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const prisma = new PrismaClient();

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <SelectAssignee issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

// Next.js calls this method before rendering the page
export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: id },
  });

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
