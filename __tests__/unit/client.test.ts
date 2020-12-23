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

describe('Client Test', () => {
  it('should get all clients', async () => {
    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);

    const clients = await hubstaff.getClients(orgs[0].id!);
    expect(clients.length).toBeGreaterThan(0);

  });
});