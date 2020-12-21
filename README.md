# Hubstaff Node Client

Simple library to access [hubstaff](https://hubstaff.com/) API V2, developed by [App Masters](https://appmasters.io/).

References: [Hubstaff developer portal](https://developer.hubstaff.com/)

# How to use


- Access https://developer.hubstaff.com/personal_access_tokens
- Create your own access token, e copy the `refresh_token` that will be generated.
- Send in the Hubstaff instance:

  ```js
  import Hubstaff from '@app-masters/hubstaff-node-client';

  const hubstaff = new Hubstaff({ refresh_token: 'your-refresh-token' });
  //...
  ```
- By now you can access the methods.
Simple exemple:


```
// Setup your account

// Get organizations

// Get projects

// Get tasks

// Get activities

```

# How to contribute

We focused just on some enbpoints we need to use, but is really simple to add any other. 

Feel free to contribute, start by opening a issue please.
