import express from "express";
import bodyParser from "body-parser";
import routes from "./routes"
import cors from "cors";
import router from "./routes";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use("/", routes, router)

app.listen(port, () => {
  console.log(`Server is live on port ${port}`)
});
