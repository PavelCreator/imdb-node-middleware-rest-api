import {errorCodes} from "../const/error-codes";

const cheerio = require('cheerio');
import {ajax} from '../utils/ajax';
import {VideoOptions} from '../interfaces/video-interfaces';
import {errorHandler} from '../utils/error-handler';
import {routes} from '../const/routes';

function getTitle($: any) {
    try {
        return {
            title: $(".title_wrapper > h1:nth-child(1)")
                .text()
                .split("    ")[0]
                .trim()
        }
    } catch (err) {
        errorHandler(errorCodes.operationFailed('videoParser.getTitle', err));
        return {};
    }
}

function getGenre($: any) {
    try {
        let genres: string[] = [];
        $("div.see-more:nth-child(10) a")
            .each(function () {
                genres.push($(this).text().trim());
            });
        return {genres: genres};
    } catch (err) {
        errorHandler(errorCodes.operationFailed('videoParser.getGenre', err));
        return {};
    }
}

function getStory($: any) {
    try {
        return {
            story: $(
                "div.inline:nth-child(3) > p:nth-child(1) > span:nth-child(1)"
            ).text()
        };
    } catch (err) {
        errorHandler(errorCodes.operationFailed('videoParser.getStory', err));
        return {};
    }
}

function getPro($: any) {
    try {
        let creditDetails: any = {};
        $(".credit_summary_item").each((i: number, elem: any) => {
            let creditText = $(".inline", elem)
                .text()
                .trim()
                .match(/\w*/)[0]
                .toLowerCase();

            creditDetails[creditText] = [];
            creditDetails[creditText].push(
                $("a", elem)
                    .first()
                    .text()
            ); //handle the first person

            //handle rest people  until the 'See more' links
            $("a", elem)
                .nextUntil("span")
                .each(function () {
                    creditDetails[creditText].push($(this).text());
                });
        });
        return creditDetails;
    } catch (err) {
        errorHandler(errorCodes.operationFailed('videoParser.getPro', err));
        return {};
    }
}

function getYear($: any) {
    try {
        return {
            year:
            $(`#titleYear > a:nth-child(1)`).text() ||
            $(`a[title="See more release dates"]`)
                .text()
                .match(/\d{4}/)[0]
        };
    } catch (err) {
        errorHandler(errorCodes.operationFailed('videoParser.getYear', err));
        return {};
    }
}

function getRuntime($: any) {
    try {
        return {
            runtime: $(".subtext time")
                .text()
                .trim()
        };
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getRuntime', err));
        return {};
    }
}

function getEpisodeCount($: any) {
    try {
        let headingText = $(`.bp_heading`)
            .text()
            .trim();
        if (headingText == "Episode Guide") {
            return {
                episodes: $(`.bp_sub_heading`)
                    .text()
                    .trim(),
                seasons: $(`.seasons-and-year-nav > div:nth-child(4) > a:nth-child(1)`)
                    .text()
                    .trim()
            };
        } else {
            return {};
        }
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getEpisodeCount', err));
        return {};
    }
}

function getRating($: any) {
    try {
        return {
            rating: $(".ratingValue > strong:nth-child(1) > span:nth-child(1)").text()
        };
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getRating', err));
        return {};
    }
}

function getStar($: any) {
    try {
        return function () {
            const id = $(this)
                .find(".lister-item-image a")
                .attr("href")
                .replace("/name/", "");
            const name = $(this)
                .find(".lister-item-image a img")
                .attr("alt");
            const photoUrl = $(this)
                .find(".lister-item-image a img")
                .attr("src");
            return {id, name, photoUrl};
        };
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getStar', err));
        return {};
    }
}

function getStars($: any) {
    try {
        const stars = $(".lister-list .lister-item").map(getStar($));
        return Array.from(stars);
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getStars', err));
        return {};
    }
}

function getSimilarMovieTitle($: any) {
    try {
        return function () {
            const id = $(this)
                .find("a")[0]
                .attribs.href.split("/")[2];
            const _data = $(this).find(".rec_poster_img")[0].attribs;
            return {id, poster: _data.loadlate, name: _data.title};
        };
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getSimilarMovieTitle', err));
        return {};
    }
}

function getSimilarMoviesById($: any) {
    try {
        const similarMoviesList = $(".rec_poster").map(getSimilarMovieTitle($));
        return {related: Array.from(similarMoviesList)};
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getSimilarMoviesById', err));
        return {};
    }
}

function getPoster($: any) {
    try {
        return {
            poster:
            $(".poster > a:nth-child(1) > img:nth-child(1)")[0].attribs.src.split(
                "@._"
            )[0] + "@._V1_QL50.jpg"
        };
    } catch (err) {
        errorHandler(errorCodes.operationFailed('getPoster', err));
        return {};
    }
}

const generateVideoObject = ($: any) => {
    return {
        ...getTitle($),
        ...getRuntime($),
        ...getYear($),
        ...getStory($),
        ...getPro($),
        ...getGenre($),
        ...getRating($),
        ...getPoster($),
        ...getEpisodeCount($),
        ...getSimilarMoviesById($)
    };
};

export const videoParser = {
    getVideo: (videoOptions: VideoOptions) => {

        let {id} = videoOptions;

        //imdb request
        return ajax(
            `${routes.imdb}/title/${id}/`
        )
            .then((data: any) => {
                //parsing html
                const $ = cheerio.load(data);
                const video = generateVideoObject($);
                return {video};
            })
            .catch(errorHandler);
    }
};