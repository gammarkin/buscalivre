import cheerio from 'cheerio';
import axios from 'axios';

export const ML_ENDPOINT = (search) => `https://lista.mercadolivre.com.br/${search}#D[A:${search}]`;

const scrapeML = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const data = $('.ui-search-layout__item').map((i, element) => {
            const name = $(element).find('.ui-search-item__title').text();
            const img = $(element).find('img').attr('src');

            const prices = $(element).find('.price-tag-amount').text();
            const price = `R$${prices.split('$')[1]}`.slice(0, -1);


            return { name, price, img, from: 'Mercado Livre' };
        }).get();

        if ($('.ui-search-rescue__info').length) {
            return [];
        }

        let category = $('.andes-breadcrumb__link').first().text();
        if (category === '') {
            category = $('.andes-breadcrumb__title').first().text();
        }
        data.forEach(item => {
            item.category = category;
        });

        return data;
    } catch (error) {
        console.error('Scraping failed:', error);
        return null;
    }
};

export default scrapeML;
