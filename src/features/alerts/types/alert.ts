export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  createdAt: string; //follow ISO string
}