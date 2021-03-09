"use strict";
import axios, { AxiosInstance } from "axios";
import jwtDecode from "jwt-decode";
import {
  HubstaffConfig,
  TasksQuery,
  ProjectsQuery,
  ClientsQuery,
  ActivitiesQuery,
  Project,
  Client,
  User,
  Task,
  Activity,
  Organization,
  OrganizationMember,
  OrganizationMembersQuery,
  DailyActivity,
  DecodedToken,
  PaginationObject,
} from "./types";

const PAGE_LIMIT = 500;

class Hubstaff {
  api: AxiosInstance;
  accessToken: HubstaffConfig["tokens"]["accessToken"];
  refreshToken: HubstaffConfig["tokens"]["refreshToken"];
  refreshCallback: (accessToken: string, refreshToken: string) => void;

  constructor(
    tokens: HubstaffConfig["tokens"],
    refreshCallback: HubstaffConfig["refreshCallback"]
  ) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    this.refreshCallback = refreshCallback;
    this.api = axios.create({
      baseURL: "https://api.hubstaff.com/v2",
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });
  }

  static async getAccessToken(
    refreshToken: string
  ): Promise<HubstaffConfig["tokens"]> {
    try {
      const res = await axios.post(
        "https://account.hubstaff.com/access_tokens",
        {},
        {
          params: {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
          },
        }
      );

      return {
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token,
      };
    } catch (error) {
      console.log("Error getting the access token: ", error.response?.data);
      throw {
        status: error.response?.status,
        ...error.response?.data,
      };
    }
  }

  private unixTimeNow() {
    return Date.now() / 1000;
  }

  async checkToken() {
    if (!this.accessToken) {
      throw new Error(
        "You must set access token. Call Hubstaff.getAccessToken('your-refresh-token')"
      );
    }
    try {
      const decodedToken: DecodedToken = jwtDecode(this.accessToken);
      if (decodedToken.exp < this.unixTimeNow()) {
        // Refresh Token
        const { accessToken, refreshToken } = await Hubstaff.getAccessToken(
          this.refreshToken
        );
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        await this.refreshCallback(this.accessToken, this.refreshToken);
        this.api = axios.create({
          baseURL: "https://api.hubstaff.com/v2",
          headers: {
            Authorization: `Bearer ${this.accessToken}`,
          },
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error("Error checking the token");
    }
  }

  async request(endpoint: string, params?: any) {
    await this.checkToken();
    try {
      const res = await this.api.get(endpoint, { params: params });
      return res.data;
    } catch (error) {
      console.log("Request Error: ", error.response?.data);
      throw {
        status: error.response?.status,
        ...error.response?.data,
      };
    }
  }

  /**
   * Returns a collection of organizations the authenticated user is an active member of.
   * @param {PaginationType} [params]
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/organizations/getV2Organizations}.
   */
  async getOrganizations(): Promise<Organization[]> {
    let organizations: Organization[] | undefined = [];
    let res:
      | { pagination: PaginationObject; organizations: Organization[] }
      | undefined;
    do {
      res = await this.request("/organizations", {
        page_start_id: res?.pagination?.next_page_start_id,
        page_limit: PAGE_LIMIT,
      });
      res?.organizations.forEach((obj) => organizations?.push(obj));
    } while (res?.pagination);
    return organizations;
  }

  /**
   * Returns a collection of users that are a member of the given organization.
   * @param {number} organizationId
   * @param {OrganizationMembersQuery} [params]
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/organizations/getV2OrganizationsOrganizationIdMembers}.
   */
  async getOrganizationMembers(
    organizationId: number,
    params?: OrganizationMembersQuery
  ): Promise<OrganizationMember[]> {
    let members: OrganizationMember[] | undefined = [];
    let res:
      | { pagination: PaginationObject; members: OrganizationMember[] }
      | undefined;
    do {
      res = await this.request(`/organizations/${organizationId}/members`, {
        page_start_id: res?.pagination?.next_page_start_id,
        page_limit: PAGE_LIMIT,
        include_removed: params?.includeRemoved,
        include_projects: params?.includeProjects,
      });
      res?.members.forEach((obj) => members?.push(obj));
    } while (res?.pagination);
    return members;
  }

  /**
   * Returns a collection of projects.
   * @param {number} organizationId
   * @param {ProjectsQuery} [params]
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/projects/getV2OrganizationsOrganizationIdProjects}.
   */
  async getProjects(
    organizationId: number,
    params?: ProjectsQuery
  ): Promise<Project[]> {
    let projects: Project[] | undefined = [];
    let res: { pagination: PaginationObject; projects: Project[] } | undefined;
    do {
      res = await this.request(`/organizations/${organizationId}/projects`, {
        page_start_id: res?.pagination?.next_page_start_id,
        page_limit: PAGE_LIMIT,
        status: params?.status || "active",
      });
      res?.projects.forEach((obj) => projects?.push(obj));
    } while (res?.pagination);
    return projects;
  }

  /**
   * Returns the project with a given ID.
   * @param {number} projectId
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/projects/getV2ProjectsProjectId}.
   */
  async getProject(projectId: number): Promise<Project> {
    const res = await this.request(`projects/${projectId}`);
    return res.project;
  }

  /**
   * Returns a collection of clients that are a member of the given organization
   * @param {number} organizationId
   * @param {ClientsQuery} [params]
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/clients/getV2OrganizationsOrganizationIdClients}.
   */
  async getClients(
    organizationId: number,
    params?: ClientsQuery
  ): Promise<Client[]> {
    let clients: Client[] | undefined = [];
    let res: { pagination: PaginationObject; clients: Client[] } | undefined;
    do {
      res = await this.request(`/organizations/${organizationId}/clients`, {
        page_start_id: res?.pagination?.next_page_start_id,
        page_limit: PAGE_LIMIT,
        status: params?.status || "active",
      });
      res?.clients.forEach((obj) => clients?.push(obj));
    } while (res?.pagination);
    return clients;
  }

  /**
   * Returns the user with a given ID.
   * @param {number} userId
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/users/getV2UsersUserId}
   */
  async getUser(userId: number): Promise<User> {
    const res = await this.request(`/users/${userId}`);
    return res.user;
  }

  /**
   * Returns a collection of tasks. The tasks can optionally be filtered to those of a given organization.
   * @param {number} organizationId
   * @param {TasksQuery} [params]
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/tasks/getV2OrganizationsOrganizationIdTasks}.
   */
  async getTasks(organizationId: number, params?: TasksQuery): Promise<Task[]> {
    let tasks: Task[] | undefined = [];
    let res: { pagination: PaginationObject; tasks: Task[] } | undefined;
    do {
      res = await this.request(`/organizations/${organizationId}/tasks`, {
        page_start_id: res?.pagination?.next_page_start_id,
        page_limit: PAGE_LIMIT,
        status: params?.status,
        user_ids: params?.userIds,
        project_ids: params?.projectIds,
      });
      res?.tasks.forEach((obj) => tasks?.push(obj));
    } while (res?.pagination);
    return tasks;
  }

  /**
   * Returns the task with a given ID.
   * @param {number} taskId
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/tasks/getV2TasksTaskId}.
   */
  async getTask(taskId: number): Promise<Task> {
    const res = await this.request(`tasks/${taskId}`);
    return res.task;
  }

  /**
   * Returns a collection of activities. The activities can optionally be filtered to those of a given organization.
   * The preferred endpoints to fetch data about activities are the daily endpoints.
   * @summary Date range Limit: 7 days
   * @summary Earliest Date: 6 full months
   * @param {number} organizationId
   * @param {ActivitiesQuery} params
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/activities/getV2OrganizationsOrganizationIdActivities}.
   */
  async getActivities(
    organizationId: number,
    params: ActivitiesQuery
  ): Promise<Activity[]> {
    let activities: Activity[] | undefined = [];
    let res:
      | { pagination: PaginationObject; activities: Activity[] }
      | undefined;
    do {
      res = await this.request(`/organizations/${organizationId}/activities`, {
        page_start_id: res?.pagination?.next_page_start_id,
        page_limit: PAGE_LIMIT,
        user_ids: params?.userIds,
        project_ids: params?.projectIds,
        task_ids: params?.taskIds,
        "time_slot[start]": params?.startTime.toISOString(),
        "time_slot[stop]": params?.stopTime.toISOString(),
      });
      res?.activities.forEach((obj) => activities?.push(obj));
    } while (res?.pagination);
    return activities;
  }

  /**
   * Returns a collection of daily activities. Daily activities are aggregated activities by the organization date.
   * The daily activities can optionally be filtered to those of a given organization.
   * @summary Date range Limit: 31 days
   * @summary Earliest Date: 3 full years
   * @param {number} organizationId
   * @param {ActivitiesQuery} params
   * @see See also {@link https://developer.hubstaff.com/docs/hubstaff_v2#!/activities/getV2OrganizationsOrganizationIdActivitiesDaily}.
   */
  async getDailyActivities(
    organizationId: number,
    params: ActivitiesQuery
  ): Promise<DailyActivity[]> {
    let daily_activities: DailyActivity[] | undefined = [];
    let res:
      | { pagination: PaginationObject; daily_activities: DailyActivity[] }
      | undefined;
    do {
      res = await this.request(
        `/organizations/${organizationId}/activities/daily`,
        {
          page_start_id: res?.pagination?.next_page_start_id,
          page_limit: PAGE_LIMIT,
          user_ids: params?.userIds,
          project_ids: params?.projectIds,
          task_ids: params?.taskIds,
          "date[start]": params?.startTime.toISOString(),
          "date[stop]": params?.stopTime.toISOString(),
        }
      );
      res?.daily_activities.forEach((obj) => daily_activities?.push(obj));
    } while (res?.pagination);
    return daily_activities;
  }
}

export = Hubstaff;
