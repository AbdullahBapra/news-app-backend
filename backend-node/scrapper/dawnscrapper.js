import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';
import summarizeNews from '../ai_models/news-summarizer.js';

const feedUrl = 'https://www.dawn.com/feeds/';

export const scrapeDawnNews = async () => {
    const parser = new Parser();
    const newsItems = [];

    try {
        // Parse the RSS feed
        const feed = await parser.parseURL(feedUrl);

        for (let item of feed.items) {
            const title = item.title;
            const Desc = item.contentSnippet || '';
            const link = item.link;
  
            newsItems.push({
                title,
                description: Desc, 
                source: 'Dawn',
                url: link
            });
        }

        return newsItems;
    } catch (error) {
        console.error('Error scraping Dawn news:', error);
        return [];
    }
};