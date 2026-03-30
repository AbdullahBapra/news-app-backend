import mongose from 'mongoose';

const newsSchema = new mongose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    url: {
        type: String,
        unique: true,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isManual: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const News = mongose.model('News', newsSchema);
export default News;