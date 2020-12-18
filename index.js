const Hubstaff = require("./Hubstaff");

const hubstaff = new Hubstaff();
const main = async () => {
  const result = await hubstaff.getOrganizations();

  try {
    const projects = await hubstaff.getProjects(123); //result.organizations[0].id
    console.log('projects', projects);
  } catch (error) {
      console.log('error')
    console.error(error);
  }
};

main();
