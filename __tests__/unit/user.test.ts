import Hubstaff from '../../src/Hubstaff';
import { accessToken, refreshToken } from '../variables';

let hubstaff: import("../../src/Hubstaff");
beforeAll(async () => {
  try {
    hubstaff = new Hubstaff({ accessToken, refreshToken });
    expect(hubstaff).not.toBeUndefined();
  } catch (error) {
    console.log('error', error.response.message)
  }
});

describe('User Test', () => {
  it('should get a user by id', async () => {
    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);

    const user = await hubstaff.getUser(977326);
    expect(user).toBeDefined();
  });
});