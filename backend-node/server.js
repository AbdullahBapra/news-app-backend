import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbconnection from './config/db.js';
import { scrapeDawnNews } from './scrapper/dawnscrapper.js';

dotenv.config();


const PORT = process.env.PORT || 5000;

const app = express();


app.use(cors());


app.listen(PORT, async () => { 
    const newsitems = await scrapeDawnNews();
    console.log('Scraped news items:', newsitems);
  console.log(`Server is running on port ${PORT}`);
}
);