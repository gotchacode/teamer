# Teamer

[![Build Status](https://travis-ci.com/vinitkumar/teamer.svg?branch=master)](https://travis-ci.com/vinitkumar/teamer)

Teamer is neat utility to look at Github organizations and their members details.

![demo](https://cldup.com/hP2x4hEY9K.jpg)

This project is built using following:


- Create React App for scafolding.
- React
- React Router
- GraphQL
- Apollo Client 


All the API calls to Github is made using Github GraphQL API V4.

## Installation

`npm install` to run the app.
`npm test` to run the tests.

## Authentication

For authentication, you need to create a personal token. Follow the steps from here to do so: https://developer.github.com/v4/guides/forming-calls/#authenticating-with-graphql


## Local Environment

Create a file `.env.local` with following:

```
# paste the token here, so that the API call is done with this Auth header
REACT_APP_GITHUB_TOKEN='xadyaahh12334444444'
```