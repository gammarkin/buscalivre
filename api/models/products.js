import { model as mongooseCreateModel, Schema } from 'mongoose';
import scrapeML, { ML_ENDPOINT } from '../utils/scrapeML.js';
import scrapeBSCP, { BSCP_ENDPOINT } from '../utils/scrapeBSCP.js';

const ProductsSchema = new Schema(
    {
        name: { type: String },
        from: { type: String },
        price: { type: String },
        category: { type: String },
        img: { type: String },
    },
    { versionKey: false }
);

const model = mongooseCreateModel('products', ProductsSchema);

const read = async () => {
    const results = await model.find({});
    const ENDPOINT_BSCP = BSCP_ENDPOINT('Geladeiras');
    const ENDPOINT_ML = ML_ENDPOINT('Geladeiras');

    if (!results || results.length === 0) {
        let data = await scrapeML(ENDPOINT_ML);
        data = await scrapeBSCP(ENDPOINT_BSCP).concat(data);

        await model.insertMany(data);

        return await model.find({});
    };

    return results;
};

const createMany = async (obj) => {
    return model.insertMany(obj);
};

const destroyAll = async () => {
    return model.deleteMany({});
};

const readSpecific = async (category) => {
    const ENDPOINT_BSCP = BSCP_ENDPOINT(category);
    const ENDPOINT_ML = ML_ENDPOINT(category);

    let data = await scrapeML(ENDPOINT_ML);
    const dataBSCP = await scrapeBSCP(ENDPOINT_BSCP);

    if (!data || !dataBSCP) {
        return []
    }

    data = dataBSCP.concat(data);

    await model.deleteMany({});
    await model.insertMany(data);

    return data
}

export default {
    read,
    createMany,
    destroyAll,
    readSpecific,
};
