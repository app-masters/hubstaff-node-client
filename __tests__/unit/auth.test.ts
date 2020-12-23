import Hubstaff from '../../src/Hubstaff';
import { accessToken } from '../variables';

describe('Auth Test', () => {
  it('should fail without the right access token', async () => {
    const hubstaffWrong = new Hubstaff({ accessToken: 'errado' });
    try {
      await hubstaffWrong.getOrganizations();
    } catch (error) {
      expect(error.status).toBe(401);
    }
  });

  it('should give success with the right token', async () => {
    const hubstaff = new Hubstaff({ accessToken });
    expect(hubstaff).toBeDefined();

    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);
  });
});