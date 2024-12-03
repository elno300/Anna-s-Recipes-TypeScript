import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import recipesRoutes from './routes/recipesRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(recipesRoutes);

app.listen(3000, () => {
	console.log('Webbtjänsten kan nu ta emot anrop.');
});
