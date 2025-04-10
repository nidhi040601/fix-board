export const issueStatus: Record<
  string,
  { label: string; color: "green" | "red" | "yellow"; value: string }
> = {
  OPEN: { label: "Open", color: "red", value: "OPEN" },
  CLOSED: { label: "Closed", color: "green", value: "CLOSED" },
  IN_PROGRESS: { label: "In Progress", color: "yellow", value: "IN_PROGRESS" },
};
