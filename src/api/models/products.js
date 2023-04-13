import { model as mongooseCreateModel, Schema } from 'mongoose';
import scrapeML, { ML_ENDPOINT } from '../../utils/scrapeML.js';

const ProductsSchema = new Schema(
    {
        name: { type: String },
        from: { type: String },
        price: { type: String },
        category: { type: String },
        description: { type: String },
    },
    { versionKey: false }
);

const model = mongooseCreateModel('products', ProductsSchema);

const read = async () => {
    const results = await model.find({});
    const ENDPOINT = ML_ENDPOINT('notebook');

    if (!results || results.length === 0) {
        const data = await scrapeML(ENDPOINT);
        await model.insertMany(data);

        return await model.find({});
    };

    return results;
};

const createMany = async (obj) => {
    return model.insertMany(obj);
};

export default {
    read,
    createMany,
};
