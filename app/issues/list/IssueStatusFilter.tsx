"use client";

import { Select } from "@radix-ui/themes";
import { issueStatus } from "@/app/lib/issueStatusUtils";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: {
  label: string;
  color?: "green" | "red" | "yellow" | null;
  value: string;
}[] = [{ label: "All", value: "ALL" }, ...Object.values(issueStatus)];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (searchParams.get("orderBy"))
          params.append("orderBy", searchParams.get("orderBy")!);
        const query = params.size ? "?" + params.toString() : "";
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
