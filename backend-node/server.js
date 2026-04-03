import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { scrapeDawnNews } from './scrapper/dawnscrapper.js';

dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors());


app.use(express.json());

// app.use('/api', newsrouter);

app.listen(PORT, async () => { 
  const article = await scrapeDawnNews();
  console.log(article);
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
}
);