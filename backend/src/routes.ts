import { Router, Request, Response } from "express";
import pool from "./db";

const router = Router();

interface Task {
	id: number;
	name: string;
}

interface NewTask {
	name: string;
}

router.get("/", async (req: Request, res: Response) => {
	try {
		const result = await pool.query("SELECT * FROM tasks");
		const tasks: Task[] = result.rows;
		res.status(200).json(tasks);
	} catch (error) {
		console.error("Error fetching tasks", error);
		res.status(500).json({ error: "Error fetching tasks" });
	}
});

router.post("/add", async (req: Request, res: Response) => {
	const task = req.body.name;
	try {
		const result = await pool.query("INSERT INTO tasks (name) VALUES ($1)", [task]);
		const newTask: NewTask = result.rows[0];
		res.status(201).json({message: 'Post request succesful', task: newTask})
	} catch(error){
		console.error("Error adding todo", error);
		res.status(500).json({error: "Error adding task"})
	}
});

export default router
