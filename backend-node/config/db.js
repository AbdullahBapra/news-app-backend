import moongose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

moongose.set("strictQuery", false);



const dbconnection = async () => {
    try{
       await moongose.connect(MONGO_URI);
        console.log('Database connected successfully');

    } catch(error) {
        console.error('Database connection error:', error);
    }
}

export default dbconnection;