"use strict";
import axios, { AxiosInstance } from "axios";
import { HubstaffConfig, TasksQuery, ProjectsQuery, PaginationType, ClientsQuery, ActivitiesQuery } from "./types";

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

  getOrganizations(params: PaginationType) {
    return this.request("/organizations", {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
    });
  }

  getProjects(
    organizationId: number,
    {status = 'active', ...params}: ProjectsQuery
  ) {
    return this.request(`/organizations/${organizationId}/projects`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      status: status
    });
  }

  getClients(organizationId: number, {status = 'active', ...params}: ClientsQuery) {
    return this.request(`/organizations/${organizationId}/clients`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      status: status
    });
  }

  getUsers(userId: number) {
    return this.request(`/users/${userId}`);
  }

  getTasks(
    organizationId: number,
    params?: TasksQuery
  ) {
    return this.request(`/organizations/${organizationId}/tasks`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      status: params?.status,
      user_ids: params?.userIds,
      project_ids: params?.projectIds,
    });
  }

  getActivities(organizationId: number, params: ActivitiesQuery) {
    return this.request(`/organizations/${organizationId}/activities`, {
      page_start_id: params?.pageStartId,
      page_limit: params?.pageLimit,
      user_ids: params?.userIds,
      project_ids: params?.projectIds,
      task_ids: params?.taskIds,
      'time_slot[start]': params.startTime.toISOString(),
      'time_slot[stop]': params.stopTime.toISOString()
    });
  }
}

export default Hubstaff;
