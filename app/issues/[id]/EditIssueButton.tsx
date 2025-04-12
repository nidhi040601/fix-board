import { Box, Button } from "@radix-ui/themes";
import { IoPencil } from "react-icons/io5";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: String }) => {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button className="w-full cursor-pointer">
        <IoPencil />
        Edit Issue
      </Button>
    </Link>
  );
};

export default EditIssueButton;
