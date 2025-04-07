import { Box, Button } from "@radix-ui/themes";
import { IoPencil } from "react-icons/io5";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: String }) => {
  return (
    <Button>
      <IoPencil />
      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
