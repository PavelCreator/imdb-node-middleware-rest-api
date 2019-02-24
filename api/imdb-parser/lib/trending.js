const request = require("./request");
const cheerio = require("cheerio");
const { ifError } = require("./error");
const baseRoute = `https://www.imdb.com`;

/**
 * getFilms - the function provide trending based on type=['movie'.'tv']
 *
 * @param {number} [n=50]       number of result
 * @param {string} [type=movie] type of movie or tv
 *
 * @returns {Promise<Array>} array with result
 */
function getFilms(type, sort, dir, quantity) {
  const urlType = {
    most_popular_tv: "/chart/tvmeter",
    top_rated_tv: "/chart/toptv",
    most_popular_movies: "/chart/moviemeter",
    top_rated_movies: "/chart/top"
  };
  const urlSort = {
    rating: `ir`,
    date: 'us',
    place: 'rk'
  };
  const urlDir = {
    desc: `desc`,
    asc: `asc`
  }
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

  console.log('type =', type);
  console.log('urlType[type] =', urlType[type]);
  console.log('${baseRoute}${urlType[type]}?sort=${urlSort[sort]},${urlDir[dir]} =', `${baseRoute}${urlType[type]}?sort=${urlSort[sort]},${urlDir[dir]}`);

  return request(`${baseRoute}${urlType[type]}?sort=${urlSort[sort]},${urlDir[dir]}`)
    .then(data => {
      const $ = cheerio.load(data);
      let trending = [];
      let i = 1;
      quantity = quantity > quantityMax ? quantityMax : quantity;
      while (i <= quantity) {
        try {
          let queryStart = `.lister-list > tr:nth-child(${i})`;
          let query;

          const film = {
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
          if (query = $(`${queryStart} > .imdbRating > strong`).text()){
            film.rating = query;
          }

          trending.push(film);
          i++;
        } catch (e) {
          i++;
          console.log(e);
        }
      }
      return { trending };
    })
    .catch(ifError);
}

/**
 * getTrendingGenre - Description
 *
 * @param {string} [genre=action] the genere for trending
 * @param {number} [n=7]          the number of result
 *
 * @returns {Promise<Array>} result of array
 */
function getTrendingGenre(genre = "action", n = 7) {
  return request(`https://www.imdb.com/search/title?genres=${genre}`)
    .then(data => {
      let trending = [];
      let i = 1;
      const $ = cheerio.load(data);
      while (i <= n) {
        try {
          trending.push({
            name: $(
              `div.lister-item:nth-child(${i}) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)`
            )[0].attribs.alt,
            poster:
              $(
                `div.lister-item:nth-child(${i}) > div:nth-child(2) > a:nth-child(1) > img:nth-child(1)`
              )[0].attribs.loadlate.split("@._")[0] + "@._V1_QL50.jpg",
            id: $(
              `div.lister-item:nth-child(${i}) > div:nth-child(2) > a:nth-child(1)`
            )[0].attribs.href.split("/")[2]
          });
          i++;
        } catch (e) {
          i++;
        }
      }
      return { trending };
    })
    .catch(ifError);
}
module.exports = { getFilms, getTrendingGenre };
