"use strict";
const axios = require("axios");

class Hubstaff {
  constructor() {
    this.basePath = "https://api.hubstaff.com/v2";
  }

  getOrganizations() {
    return this.request("/organizations");
  }
  getProjects(id) {
    return this.request("/organizations/" + id + "/projects");
  }

  request(endpoint = "", options = {}) {
    const url = this.basePath + endpoint;

    const config = {
      ...options,
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRlZmF1bHQifQ.eyJqdGkiOiJRMEdMN1lBbSIsImlzcyI6Imh0dHBzOi8vYWNjb3VudC5odWJzdGFmZi5jb20iLCJleHAiOjE2MDg1NzY4OTMsImlhdCI6MTYwODMxNzY5Mywic2NvcGUiOiJodWJzdGFmZjpyZWFkIiwiYXVkIjoic3dhZ2dlclVJIiwic3ViIjoiUHdqNmNPZXVKQkRVcERSeU9HQVpXU1hoeGdSY3FWY21HdVVLX205MGNOZHoxd1pXOGFGVHMtWTYxbmFCRXBhVW9YNVJaRW9VNm1oZ0hrcVFCbkZmNWc9PSJ9.QJK6U-ALm1f9LKXo2QleIXj6kWHEYOBJrdC9BmPvjPGrLd-H1tD3kc8N8-pIn8kh0ey4GSEZysc9f_YSgQsIUAQXOnti8pxh5SUuD4szez-W8zciAHMPYBHT7FXUizisAAhgDqFJBSq6JyxZRo7WJ3mX_L6faAs8k9tsezlsXpQXNFeNSfVX4xuDX6TLh9hZE5NPId_78RBFhXIg6XbaMYC_jKo2s57vAQ33qKuCA1bb72FiBZTb5XXMB17EnnfmZWld9ltcdLR7aowir34XD7wgiqLh4xTt2hUJVDKpj22LaAI8yYvo-4CZVIdVhKS1924Tj15_d5leNNqeaykmOw",
      },
    };

    return axios
      .get(url, config)
      .then((result) => {
        if (result.status === 200) return result.data;
      })
      .catch((error) => {
        const err = {
          status: error.response.status,
          ...error.response.data,
        };
        console.log("err", err);
        // throw new Error(err);
        return err;
      });
  }
}

module.exports = Hubstaff;
