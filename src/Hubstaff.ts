"use strict";
import axios, { AxiosInstance } from "axios";
import {
  HubstaffConfig,
  TasksQuery,
  ProjectsQuery,
  PaginationType,
  ClientsQuery,
  ActivitiesQuery,
  Organization,
  Project,
  Client,
  User,
  Task,
  Activity,
} from "./types";

class Hubstaff {
  api: AxiosInstance | undefined;
  accessToken: string = "";
  refreshToken: string;

  constructor(config: HubstaffConfig) {
    this.refreshToken = config.refreshToken;
  }

  async getAccessToken() {
    const res = await axios.post(
      "https://account.hubstaff.com/access_tokens",
      {},
      {
        params: {
          grant_type: "refresh_token",
          refresh_token: this.refreshToken,
        },
      }
    );
    this.accessToken = res.data.access_token;
    this.refreshToken = res.data.refresh_token;

    this.api = axios.create({
      baseURL: "https://api.hubstaff.com/v2",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  async request(endpoint: string, params?: any) {
    try {
      if (!this.accessToken) {
        await this.getAccessToken();
      }
      const res = await this.api!.get(endpoint, { params: params });
      return res.data;
    } catch (error) {
      console.log("Request Error: ", error);
      throw {
        status: error.response.status,
        ...error.response.data,
      };
    }
  }

  getOrganizations(params?: PaginationType): Promise<Array<Organization>> {
    return this.request("/organizations", {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
    });
  }

  getProjects(
    organizationId: number,
    { status = "active", ...params }: ProjectsQuery
  ): Promise<Array<Project>> {
    return this.request(`/organizations/${organizationId}/projects`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      status: status,
    });
  }

  getClients(
    organizationId: number,
    { status = "active", ...params }: ClientsQuery
  ): Promise<Array<Client>> {
    return this.request(`/organizations/${organizationId}/clients`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      status: status,
    });
  }

  getUsers(userId: number): Promise<User> {
    return this.request(`/users/${userId}`);
  }

  getTasks(organizationId: number, params?: TasksQuery): Promise<Array<Task>> {
    return this.request(`/organizations/${organizationId}/tasks`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      status: params?.status,
      user_ids: params?.userIds,
      project_ids: params?.projectIds,
    });
  }

  getActivities(organizationId: number, params: ActivitiesQuery): Promise<Array<Activity>> {
    return this.request(`/organizations/${organizationId}/activities`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      user_ids: params?.userIds,
      project_ids: params?.projectIds,
      task_ids: params?.taskIds,
      "time_slot[start]": params.startTime.toISOString(),
      "time_slot[stop]": params.stopTime.toISOString(),
    });
  }
}

export default Hubstaff;
