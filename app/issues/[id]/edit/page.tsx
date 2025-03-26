import IssueForm from "@/app/components/IssueForm";
import { Issue } from "@prisma/client";
import axios from "axios";
import React from "react";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const { id } = await params;

  const response = await axios.get("http://localhost:3000/api/issues/" + id);

  const issueDetail: Issue = response.data;

  return <IssueForm issue={issueDetail} />;
};

export default EditIssuePage;
