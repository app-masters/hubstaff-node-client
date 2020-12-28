# Hubstaff Node Client

Simple library to access [hubstaff](https://hubstaff.com/) API V2, developed by [App Masters](https://appmasters.io/).

References: [Hubstaff developer portal](https://developer.hubstaff.com/)

# ▶ How to use

- Send the `accessToken` and the `refreshToken` in the Hubstaff instance:

```js
import Hubstaff from '@app-masters/hubstaff-node-client';

const hubstaff = new Hubstaff({ accessToken: "your-access-token", refreshToken: "your-refresh-token" });
//...
```
- By now you can access the methods.

Simple exemple:

```js
import Hubstaff from '@app-masters/hubstaff-node-client';

// Setup your account
const hubstaff = new Hubstaff({ tokenObject: 'your-token-object' });

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

# ⚙ How to get the access and refresh token: 
- Access https://developer.hubstaff.com/personal_access_tokens
- Create your own access token and copy the `refresh_token` that will be generated.
```js
import Hubstaff from '@app-masters/hubstaff-node-client';

const tokenObj = Hubstaff.getTokenObject('your-refresh-token');
console.log(tokenObj.accessToken); // Output: 'your-access-token'
console.log(tokenObj.refreshToken); // Output: 'your-refresh-token'
```

# ✅ How to test 

- Copy the `variables.examples.ts` file and create a new file `variables.ts` inside folder `__tests__`.
- In that new file assign your access_token to the `accessToken` variable that is already declared. 
```js
  accessToken: 'your-access-token',
  refreshToken: '', // you can leave it blank (only for test)
```
- Now you can run the tests with this command on terminal:
  ```bash
  yarn run test
  # or 
  npm run test
  ```

# ⚠ Caveats

- This client makes the pagination by itself, so if the method has more than 500 records the method will make the pagination and return all of them.

# 🛂 How to contribute

We focused just on some endpoints we need to use, but is really simple to add any other. 

Feel free to contribute, start by opening a issue please.
