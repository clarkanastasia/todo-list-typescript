import { Pool } from "pg";

const pool = new Pool({
    user: "todo-list",
    host: "localhost",
    database: "todo-list",
    password: "todo-list",
    port: 5432, 
});

export default pool;
