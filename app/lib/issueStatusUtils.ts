export const issueStatus: Record<
  string,
  { label: string; color: "green" | "red" | "yellow" }
> = {
  OPEN: { label: "Open", color: "red" },
  CLOSED: { label: "Closed", color: "green" },
  IN_PROGRESS: { label: "In Progress", color: "yellow" },
};
