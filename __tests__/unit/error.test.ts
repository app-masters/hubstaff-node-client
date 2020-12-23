import Hubstaff from "../../src/Hubstaff";
import { accessToken } from "../variables";

let hubstaff: import("../../src/Hubstaff");
beforeAll(async () => {
  try {
    hubstaff = new Hubstaff({ accessToken });
    expect(hubstaff).not.toBeUndefined();
  } catch (error) {
    console.log("error", error.response.message);
  }
});

describe('Auth Test', () => {
  it('Error Status 401', async () => {
    const hubstaffWrong = new Hubstaff({ accessToken: 'errado' });
    try {
      await hubstaffWrong.getOrganizations();
    } catch (error) {
      expect(error.status).toBe(401);
    }
  }, 10000);

  it('Error Status 404', async () => {
    try {
      await hubstaff.getUsers(163542);
    } catch (error) {
      expect(error.status).toBe(404);
    }
  });
});