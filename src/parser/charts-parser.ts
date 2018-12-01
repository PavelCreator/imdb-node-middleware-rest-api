const request = require('../utils/request');
const cheerio = require('cheerio');
import {ChartVideo, ChartsOptions} from '../interfaces/charts-interfaces';
import {errorHandler} from '../utils/error-handler';
import {routes} from '../const/routes';

const limitMaxQuantity = (quantity: number, type: string) => {
    let quantityMax: number = 0;
    switch (type) {
        case 'most_popular_tv':
        case 'most_popular_movies':
            quantityMax = 100;
            break;

        case 'top_rated_tv':
        case 'top_rated_movies':
            quantityMax = 250;
            break;
    }
    return quantity > quantityMax ? quantityMax : quantity;
};

const generateVideoObject = (i: number, $: any, type: string) => {
    let queryStart = `.lister-list > tr:nth-child(${i})`;
    let elExist;

    const video: ChartVideo = {
        name: $(`${queryStart} > .titleColumn > a`)
            .text(),
        poster: $(`${queryStart} > .posterColumn > a > img`)
            .attr('src').split('@._')[0] + '@._V1_QL50.jpg',
        id: $(`${queryStart} > .posterColumn > a`)
            .attr('href').split('/')[2],
        year: $(`${queryStart} > .titleColumn > .secondaryInfo`)
            .text().trim().replace('(', '').replace(')', ''),
        stars: $(`${queryStart} > .titleColumn > a`)
            .attr('title')
    };

    switch (type) {
        case 'most_popular_tv':
        case 'most_popular_movies':
            video.place = $(`${queryStart} > .titleColumn > .velocity`)
                .text().split('\n')[0].trim();
            break;

        case 'top_rated_tv':
        case 'top_rated_movies':
            video.place = $(`${queryStart} > .titleColumn`)
                .text().split('\n')[1].trim().replace('.', '');
            break;
    }
    if (elExist = $(`${queryStart} > .imdbRating > strong`).attr('title')) {
        video.usersRatingBased = elExist.split('based on ')[1].split(' user ratings')[0]
    }
    if (elExist = $(`${queryStart} > .imdbRating > strong`).text()) {
        video.rating = elExist;
    }
    return video;
};

export const chartsParser = {
    getCharts: (chartOptions: ChartsOptions) => {

        let {type, sort, dir, quantity} = chartOptions;
        quantity = limitMaxQuantity(quantity, type);

        //imdb request
        return request(
            `${routes.imdb}${routes.charts.type[type]}?sort=${routes.charts.sort[sort]},${routes.charts.dir[dir]}`
        )
            .then((data: string) => {

                //parsing html
                const $ = cheerio.load(data);

                //collect data into array
                let charts = [];

                for (let i = 1; i < quantity; i++) {
                    try {
                        const video = generateVideoObject(i, $, type);
                        charts.push(video);
                    } catch (errorHandler) {
                    }
                }
                return {charts};
            })
            .catch(errorHandler);
    }
};