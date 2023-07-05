import { EnumType } from "typescript";

export type ProjectType = {
  id: string;
  name: string;
  description: string;
  status: Status;
};

enum Status {
  new = "Not Started",
  progress = "In Progress",
  completed = "Completed",
}
