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

describe('Organization Test', () => {
  it('should get all organizations', async () => {
    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);
  });

  it('should get all members for an organization', async () => {
    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);

    const members = await hubstaff.getOrganizationMembers(orgs[0].id!);
    expect(members.length).toBeGreaterThan(0);
  }, 10000);
});