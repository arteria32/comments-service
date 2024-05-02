import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import CommentsRouter from './routes/comments.router';

// make sure to create an .env file in the root of the project!
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Init Routes
app.use('/comments', CommentsRouter);
//
app.get('/', async (req: Request, res: Response) => {
  res.send(`
		<h1>Welcome to Node Express TS API Server!!! </h1>
		<p>
		POSTGRES_DB: ${process.env.POSTGRES_DB}
		NODE_ENV: ${process.env.NODE_ENV}
		PORT: ${port}
		</p>
	`);
});

app.listen(port, async () => {
  console.log(`Node.JS-Express API 📀 listening at http://localhost:${port}`);
});
