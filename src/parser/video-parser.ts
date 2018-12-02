import {errorCodes} from "../const/error-codes";

const cheerio = require('cheerio');
import {ajax} from '../utils/ajax';
import {VideoOptions, Video} from '../interfaces/video-interfaces';
import {errorHandler} from '../utils/error-handler';
import {routes} from '../const/routes';

class VideoParser {
    private getTitle($: any) {
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
    private getRating($: any) {
        try {
            return {
                rating: $(".ratingValue > strong:nth-child(1) > span:nth-child(1)").text()
            };
        } catch (err) {
            errorHandler(errorCodes.operationFailed('getRating', err));
            return {};
        }
    }
    private getPoster($: any) {
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
    private getRuntime($: any) {
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
    private getYear($: any) {
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
    private getStory($: any) {
        try {
            return {
                story: $(
                    "div.inline:nth-child(3) > p:nth-child(1) > span:nth-child(1)"
                ).text().trim()
            };
        } catch (err) {
            errorHandler(errorCodes.operationFailed('videoParser.getStory', err));
            return {};
        }
    }
    private getGenres($: any) {
        try {
            let genres: string[] = [];
            $("div.see-more:nth-child(10) a")
                .each(function () {
                    genres.push($(this).text().trim());
                });
            return {genres: genres};
        } catch (err) {
            errorHandler(errorCodes.operationFailed('videoParser.getGenres', err));
            return {};
        }
    }
    private getPro($: any) {
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
            return {
                directors: "N/A",
                writers: "N/A",
                stars: "NA"
            };
        }
    }
    private getSimilarMovieTitle($: any) {
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
    private getSimilarMoviesById($: any) {
        try {
            const similarMoviesList = $(".rec_poster").map(this.getSimilarMovieTitle($));
            return {similar: Array.from(similarMoviesList)};
        } catch (err) {
            errorHandler(errorCodes.operationFailed('getSimilarMoviesById', err));
            return {};
        }
    }

    private generateVideoObject($: any): Video {
        return {
            ...this.getTitle($),
            ...this.getRating($),
            ...this.getPoster($),
            ...this.getRuntime($),
            ...this.getYear($),
            ...this.getStory($),
            ...this.getGenres($),
            ...this.getPro($),
            ...this.getSimilarMoviesById($)
        };
    };

    public getVideo(videoOptions: VideoOptions) {

        let {id} = videoOptions;

        //imdb request
        return ajax(
            `${routes.imdb}/title/${id}/`
        )
            .then((data: any) => {
                //parsing html
                const $ = cheerio.load(data);
                const video: Video = this.generateVideoObject($);
                return {video};
            })
            .catch(errorHandler);
    }
}

export const videoParser = new VideoParser;
