import Hubstaff from "../../src/Hubstaff";
import { accessToken, refreshToken } from "../variables";

describe("Auth Test", () => {
  it("should fail without the right access token", async () => {
    const hubstaffWrong = new Hubstaff({
      accessToken: "wrong",
      refreshToken: "wrong"
    });
    try {
      await hubstaffWrong.getOrganizations();
    } catch (error) {
      expect(error.message).toContain('Invalid token specified');
    }
  });

  it("should give success with the right token", async () => {
    const hubstaff = new Hubstaff({ accessToken, refreshToken });
    expect(hubstaff).toBeDefined();

    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);
  });
});
