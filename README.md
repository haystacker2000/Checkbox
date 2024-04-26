# Task management app

## Overview
There are two apps in this repository, the API and the Task Manager App (UI). The code for each lives in it's respective directory under the 
/applications directory. 

## Getting started
### API
1. Make sure you are using NodeJS version 20.x.x (The tool [nvm](https://github.com/nvm-sh/nvm) is useful for managing NodeJS versions)
2. Run (in root directory)
    ```sh
    npm i
    ```
    to install all required dependencies for the api (this is using npm workspaces)
3. Run
    ```sh
    npm run test
    ```
    to check that it's all working properly
4. Run 
    ```sh
    npm run start
    ```
    to start the API on http://localhost:4000
### Task Manager App (UI)
1. Make sure you are using NodeJS version 20.x.x (The tool [nvm](https://github.com/nvm-sh/nvm) is useful for managing NodeJS versions)
2. Navigate to the /applications/task-manager-app directory
3. Run
    ```sh
    npm i
    ```
    to install all required dependencies for the api (NextJS doesn't play well with npm workspaces)
4. Run 
    ```sh
    npm run dev
    ```
    to start the UI on http://localhost:3000

## Design choices
Used simple express app for API. Added error middleware, and async handling wrapper so errors thrown from async functions will
be caught. Picked prisma for the database ORM for easy setup, define a schema and it will generate migrations. Used SQLite for
easy development DB setup. Used Jest to create unit and integration tests. 

Tried NextJS for the UI, added in Next UI for the table. Learned about the difference between server and client components and how
to refresh cached data. 

## Assumptions made
- Users are controlled elsewhere 

## Improvements
### Bugs / limitations
- Remove npm workspaces since it's not working with NextJS
- Add Update flow
- User ID is hard coded
- Doing update by replacement (have to pass all editable task fields on update)
- Create doesn't return data update
- Add pagination to the UI (add pages to table and use in API as query params)
- Add update to the UI (re-use task create modal and optionally pass in a task)

### Next steps
- Users should be able to update tasks
- Users should be able to mark tasks as completed
- Users should be able to archive / delete tasks
- Add proper auth tokens to get User Ids from, need login flow
- Figure out how it should be deployed (API in Lambda?)
- Add UI tests
- Switch to postgres, setup local docker container with postgres instance for local DB dev.

### How to approach additional tasks
#### Sorting
Add query params to support sorting on the desired fields in either 'ASC' or 'DESC', prisma API supports this
Use 
```ts
type sort { 'field': 'asc' | 'desc' }[]
```
as a query param

### Searching by name
For basic searching use ILIKE on the database, prisma supports this with the `contains` property in the where parameter.