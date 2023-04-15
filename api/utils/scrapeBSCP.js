import cheerio from 'cheerio';
import axios from 'axios';

export const BSCP_ENDPOINT = (search) => `https://www.buscape.com.br/search?q=${search}`;

const scrapeBuscape = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const data = $('.SearchCard_ProductCard_Inner__7JhKb').map((i, element) => {
            const name = $(element).find('.SearchCard_ProductCard_Name__ZaO5o').text();
            const price = $(element).find('.Text_MobileHeadingS__Zxam2').text();
            const img = $(element).find('img').attr('src');

            return { name, price, img, from: 'Buscapé' };
        }).get();

        if ($('.Text_MobileParagraphXs__sLf1r').length) {
            const category = $('.Text_MobileParagraphXs__sLf1r').first().text();
            data.forEach(item => {
                item.category = category;
            });
        } else {
            return [];
        }

        return data;
    } catch (error) {
        console.error('Scraping failed:', error);
        return null;
    }
};

export default scrapeBuscape;
