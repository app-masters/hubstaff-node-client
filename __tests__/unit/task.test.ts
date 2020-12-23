import Hubstaff from '../../src/Hubstaff';
import { accessToken } from '../variables';

let hubstaff: import("../../src/Hubstaff");
beforeAll(async () => {
  try {
    hubstaff = new Hubstaff({ accessToken });
    expect(hubstaff).not.toBeUndefined();
  } catch (error) {
    console.log('error', error.response.message)
  }
});

describe('Task Test', () => {
  it('should get all tasks', async () => {
    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);

    const tasks = await hubstaff.getTasks(orgs[0].id!);
    expect(tasks.length).toBeGreaterThan(0);

  }, 10000);
});