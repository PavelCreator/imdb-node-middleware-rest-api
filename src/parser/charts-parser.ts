const request = require("../utils/request");
const cheerio = require("cheerio");
const {ifError} = require("../utils/error");
const baseRoute = `https://www.imdb.com`;
import {ChartFilm, ChartsOptions} from '../interfaces/charts-interfaces';

class ChartsParser {
    public getCharts(chartOptions: ChartsOptions) {
        const type = chartOptions.type;
        const sort = chartOptions.sort;
        const dir = chartOptions.dir;
        let quantity = chartOptions.quantity;
        //const [type, sort, dir, quantity] = chartOptions;
        const urlType = {
            most_popular_tv: "/chart/tvmeter",
            top_rated_tv: "/chart/toptv",
            most_popular_movies: "/chart/moviemeter",
            top_rated_movies: +"/chart/top"
        };
        const urlSort = {
            rating: `ir`,
            date: 'us',
            place: 'rk'
        };
        const urlDir = {
            desc: `desc`,
            asc: `asc`
        };
        let quantityMax: number;
        switch (type) {
            case `most_popular_tv`:
            case `most_popular_movies`:
                quantityMax = 100;
                break;

            case `top_rated_tv`:
            case `top_rated_movies`:
                quantityMax = 250;
                break;
        }

        return request(`${baseRoute}${urlType[type]}?sort=${urlSort[sort]},${urlDir[dir]}`)
            .then((data: any) => {
                const $ = cheerio.load(data);
                let trending = [];
                let i = 1;
                quantity = quantity > quantityMax ? quantityMax : quantity;
                while (i <= quantity) {
                    try {
                        let queryStart = `.lister-list > tr:nth-child(${i})`;
                        let query;

                        const film: ChartFilm = {
                            name: $(`${queryStart} > .titleColumn > a`)
                                .text(),
                            poster: $(`${queryStart} > .posterColumn > a > img`)
                                .attr(`src`).split(`@._`)[0] + `@._V1_QL50.jpg`,
                            id: $(`${queryStart} > .posterColumn > a`)
                                .attr(`href`).split(`/`)[2],
                            year: $(`${queryStart} > .titleColumn > .secondaryInfo`)
                                .text().trim().replace(`(`, ``).replace(`)`, ``),
                            stars: $(`${queryStart} > .titleColumn > a`)
                                .attr(`title`)
                        }

                        switch (type) {
                            case `most_popular_tv`:
                            case `most_popular_movies`:
                                film.place = $(`${queryStart} > .titleColumn > .velocity`)
                                    .text().split(`\n`)[0].trim();
                                break;

                            case `top_rated_tv`:
                            case `top_rated_movies`:
                                film.place = $(`${queryStart} > .titleColumn`)
                                    .text().split(`\n`)[1].trim().replace(`.`, ``);
                                break;
                        }
                        if (query = $(`${queryStart} > .imdbRating > strong`).attr(`title`)) {
                            film.usersRatingBased = query.split(`based on `)[1].split(` user ratings`)[0]
                        }
                        if (query = $(`${queryStart} > .imdbRating > strong`).text()) {
                            film.rating = query;
                        }

                        trending.push(film);
                        i++;
                    } catch (e) {
                        i++;
                        console.log(e);
                    }
                }
                return {trending};
            })
            .catch(ifError);
    }
}

export const chartsParser = new ChartsParser;