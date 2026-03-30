import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbconnection from './config/db.js';
import { scrapeDawnNews } from './scrapper/dawnscrapper.js';
import News from './models/news.js';
dotenv.config();

const app = express();



app.post('/summarize', async (req, res) => {
   try {
    const fullarticle = await scrapeDawnNews();
   const link = fullarticle.map(item => item.url);
   const existingNews = await News.find({ url: { $in: link } }).select('url');
   const existingLinks = existingNews.map(item => item.url);
   const newArticles = fullarticle.filter(item => !existingLinks.includes(item.url));
    if (newArticles.length > 0) {
        await News.insertMany(newArticles);
    }

    res.status(200).json({ message: 'News articles scraped and stored successfully' });
   } catch (error) {
    console.error('Error scraping and storing news:', error);
    res.status(500).json({ message: 'An error occurred while scraping and storing news' }); 
   }
});
