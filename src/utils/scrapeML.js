import puppeteer from 'puppeteer';

export const ML_ENDPOINT = (search) => `https://lista.mercadolivre.com.br/${search}#D[A:${search}]`;

const scrapeML = async (url) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(url);

        const data = await page.$$eval('.ui-search-layout__item', (elements) => {
            if (document.querySelector('.ui-search-rescue__info')) {
                return [];
            }

            const items = [];
            let category = document.querySelector('.andes-breadcrumb__link');
            category = category ? category.firstChild.innerText : '';

            elements.forEach((element) => {
                const name = element.querySelector('.ui-search-item__title').innerText;
                const img = element.querySelector('img').src;

                const priceFraction = element.querySelector('.price-tag-fraction').innerText;
                const priceCents = element.querySelector('.price-tag-cents');
                const price = priceCents ? `${priceFraction},${priceCents.innerText}` : priceFraction;

                items.push({ name, price, category, img, from: 'Mercado Livre' });
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

export default scrapeML;
