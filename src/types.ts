export interface Task {
  id: string;
  name: string;
  emotionalROI: number;
  businessROI: number;
  timeRequired: number;
  energyDrain: number;
  canDelegate: boolean;
  delegateTo?: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  canDelay: boolean;
  urgency: number;
  importance: number;
}
