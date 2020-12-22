# Hubstaff Node Client

Simple library to access [hubstaff](https://hubstaff.com/) API V2, developed by [App Masters](https://appmasters.io/).

References: [Hubstaff developer portal](https://developer.hubstaff.com/)

# How to use


- Access https://developer.hubstaff.com/personal_access_tokens
- Create your own access token, e copy the `refresh_token` that will be generated.
- Send in the Hubstaff instance:

  ```js
  import Hubstaff from '@app-masters/hubstaff-node-client';

  const hubstaff = new Hubstaff({ refreshToken: 'your-refresh-token' });
  //...
  ```
- By now you can access the methods.

Simple exemple:


```js
import Hubstaff from '@app-masters/hubstaff-node-client';

// Setup your account
const hubstaff = new Hubstaff({ refreshToken: 'your-refresh-token' });

// Get organizations
const orgs = hubstaff.getOrganizations();
console.log(orgs); 
/* Output: 
[
  {
    id: 55426,
    name: 'App Masters',
    status: 'active',
    created_at: '2017-06-05T12:21:08.432670Z',
    updated_at: '2020-12-07T17:00:04.712558Z',
    metadata: {},
    invite_url: 'https://app.hubstaff.com/organizations/invite/CaGUpl-P_j8WexfImdk6Sg'
  }
]
*/

// Get projects
const projects = hubstaff.getProjects(orgs[0].id);
console.log(projects); // Output: Project[]

// Get tasks
const tasks = hubstaff.getTasks(orgs[0].id);
console.log(tasks); // Output: Task[]

// Get activities
const activities = hubstaff.getActivities(orgs[0].id);
console.log(activities); // Output: Activity[]
```

# How to contribute

We focused just on some endpoints we need to use, but is really simple to add any other. 

Feel free to contribute, start by opening a issue please.
