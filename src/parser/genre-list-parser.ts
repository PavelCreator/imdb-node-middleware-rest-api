const cheerio = require('cheerio');
import {ajax} from '../utils/ajax';
import {errorHandler} from '../utils/error-handler';
import {routes} from '../const/routes';

export const genreListParser = {
    getGenres: () => {

        //imdb request
        return ajax(
            `${routes.imdb}${routes.boxoffice}`
        )
            .then((data: any) => {

                //parsing html
                const $ = cheerio.load(data);

                //collect data into array
                const genres:string[] = [];
                const genreQuery = $(`#sidebar > .aux-content-widget-2:last-child .quicklinks > .subnav_item_main`);
                const quantity:number = genreQuery.length;

                for (let i = 1; i < quantity; i++) {
                    try {
                        const genre = genreQuery.eq(i).text().trim();
                        console.log('genre =', genre);
                        genres.push(genre);
                    } catch (errorHandler) {
                    }
                }
                return {genres};
            })
            .catch(errorHandler);
    }
};