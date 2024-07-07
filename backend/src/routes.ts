import { Router, Request, Response } from "express";
import pool from "./db";

const router = Router();

interface Task {
	id: number;
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

export default router
