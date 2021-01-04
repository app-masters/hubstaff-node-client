import Hubstaff from '../../src/Hubstaff';
import { accessToken, refreshToken } from '../variables';

let hubstaff: import("../../src/Hubstaff");
beforeAll(async () => {
  try {
    hubstaff = new Hubstaff({ accessToken, refreshToken });
    expect(hubstaff).not.toBeUndefined();
  } catch (error) {
    console.log('error', error.response)
  }
});

describe('Project Test', () => {
  it('should get all projects', async () => {
    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);

    const projects = await hubstaff.getProjects(orgs[0].id!);
    expect(projects.length).toBeGreaterThan(0);
  }, 10000);
});