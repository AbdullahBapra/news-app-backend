import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';
dotenv.config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

const summarizeNews = async (text) => {
    try {
        const words = text.split(' ');  
        const limitedText = words.slice(0, 300).join(' ');

        const response = await hf.summarization({
            model: 'facebook/bart-large-cnn',
            inputs: limitedText,
            parameters: {
                max_length: 80,
                min_length: 40,
                do_sample: false
            }
        });

        
        if (response && Array.isArray(response) && response[0]?.summary_text) {
            return response[0].summary_text;
        } else if (response?.summary_text) {
            return response.summary_text;
        } else {
            return limitedText;
        }

    } catch (error) {
        console.error('Error summarizing news:', error);
        return text;
    }
};

export default summarizeNews;