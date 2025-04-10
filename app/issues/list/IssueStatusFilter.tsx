"use client";

import { Select } from "@radix-ui/themes";
import { issueStatus } from "@/app/lib/issueStatusUtils";
import React from "react";
import { useRouter } from "next/navigation";

const statuses: {
  label: string;
  color?: "green" | "red" | "yellow" | null;
  value: string;
}[] = [{ label: "All", value: "ALL" }, ...Object.values(issueStatus)];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status != "ALL" ? `?status=${status}` : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." className="w-48" />
      <Select.Content position="popper">
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
