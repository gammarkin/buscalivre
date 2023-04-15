import puppeteer from 'puppeteer';

export const BSCP_ENDPOINT = (search) => `https://www.buscape.com.br/search?q=${search}`;

const scrapeBuscape = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url);

        const data = await page.$$eval('.SearchCard_ProductCard_Inner__7JhKb', (elements) => {
            const items = [];

            if (!document.querySelector('.Text_MobileParagraphXs__sLf1r')) {
                return [];
            }

            const category = document.querySelector('.Text_MobileParagraphXs__sLf1r').innerText;

            elements.forEach((element) => {
                const name = element.querySelector('.SearchCard_ProductCard_Name__ZaO5o').innerText;
                const price = element.querySelector('.Text_MobileHeadingS__Zxam2').innerText;
                const img = element.querySelector('img').src;

                items.push({ name, price, category, img, from: 'Buscapé' });
            });

            return items;
        });

        await browser.close();

        return data;
    } catch (error) {
        console.error('Scraping failed:', error);
        return null;
    }
};

export default scrapeBuscape;