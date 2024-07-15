# To-Do List App

This is a to-do list app with an API that allows users to create, delete and update tasks.

## Set Up 

Before the project is run, a database needs to be prepared and necessary dependencies installed.

## Inside pgAdmin 

First, create a user with the following credentials and permissions:

- Username `todo-list`
- Password `todo-list`
- Able to login

Then, create a database called `todo-list`, owned by the user created previously (also called `todo-list`).

### Inside the `backend/` directory

```bash
npm install 
```

### Inside the `frontend/app` directory

```bash
npm install 
```

### Inside the `frontend/web` directory

```bash
npm install 
```

## Running the project 

To run the project locally, the backend directory and the frontend directories need to be started separately. You may choose to run the app and website separately or simultaneously.

### Inside the `backend/src` directory

```bash
nodemon src/app.ts
```

You will see the following message in the console: `Server is live on port 3000`

### Inside the `frontend/web` directory

```bash
npm run dev
```

Open your web browser and navigate to http://localhost:5173 to access the app.

### Inside the `frontend/web` directory

```bash
npm start 
```

Open your web browser and navigate to http://localhost:8081 to access the app.