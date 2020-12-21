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