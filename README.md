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

## Assumptions made
-

## Improvements
### Bugs / limitations
- Remove npm workspaces since it's not working with NestJS
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