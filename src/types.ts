export interface HubstaffConfig {
  refreshToken: string;
}

export interface PaginationType {
  pageStartId?: number;
  pageLimit?: number;
}

export interface ProjectsQuery extends PaginationType {
  status?: "active" | "archived" | "all";
}

export interface ClientsQuery extends PaginationType {
  status?: "active" | "archived" | "all";
}

export interface TasksQuery extends PaginationType {
  status?: "active" | "completed" | "deleted";
  userIds?: Array<number>;
  projectIds?: Array<number>;
}

export interface ActivitiesQuery extends PaginationType {
  userIds?: Array<number>;
  projectIds?: Array<number>;
  taskIds?: Array<number>;
  startTime: Date;
  stopTime: Date;
}

export interface Organization {
  id?: number;
  name?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  metadata?: object;
  invite_url?: string;
}

export interface Project {
  id?: number;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  status?: string;
  client_id?: number;
  billable?: boolean;
  budget?: Budget;
  metadata?: object;
}

export interface Budget {
  type?: string;
  rate?: string;
  cost?: number;
  hours?: number;
  start_date?: string;
  alerts?: {
    near_limit?: number;
  };
  recurrence?: string;
  include_non_billable?: boolean;
}

export interface Client {
  id?: number;
  organization_id?: number;
  name?: string;
  emails?: Array<string>;
  phone?: string;
  address?: string;
  project_ids?: Array<number>;
  inherit_invoice_notes?: boolean;
  invoice_notes?: string;
  inherit_net_terms?: boolean;
  net_terms?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  budget?: Budget;
}

export interface User {
  id?: number;
  name?: string;
  email?: string;
  time_zone?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  id?: number;
  integration_id?: number;
  status?: string;
  project_id?: number;
  project_type?: string;
  summary?: string;
  details?: string;
  remote_id?: string;
  remote_alternate_id?: string;
  lock_version?: number;
  assignee_ids?: Array<number>;
  completed_at?: string;
  due_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Activity {
  id?: number;
  date?: string;
  created_at?: string;
  updated_at?: string;
  time_slot?: string;
  starts_at?: string;
  user_id?: number;
  project_id?: number;
  task_id?: number;
  keyboard?: number;
  mouse?: number;
  overall?: number;
  tracked?: number;
  billable?: boolean;
  paid?: boolean;
  client_invoiced?: boolean;
  team_invoiced?: boolean;
  immutable?: boolean;
  timesheet_id?: number;
  timesheet_locked?: boolean;
  time_type?: string;
  client?: string;
  }