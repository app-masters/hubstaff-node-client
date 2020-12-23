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

describe("Activity Test", () => {
  it("should get all activities", async () => {
    const orgs = await hubstaff.getOrganizations();
    expect(orgs.length).toBeGreaterThan(0);

    const activities = await hubstaff.getActivities(orgs[0].id!, {
      startTime: new Date("Wed Dec 22 2020 10:32:04 GMT-0300"),
      stopTime: new Date("Wed Dec 23 2020 10:32:04 GMT-0300"),
    });
    expect(activities.length).toBeGreaterThan(0);
  }, 10000);
});
