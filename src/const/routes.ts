export const routes = {
    imdb: 'https://www.imdb.com',
    charts: {
        type: {
            most_popular_tv: '/chart/tvmeter',
            top_rated_tv: '/chart/toptv',
            most_popular_movies: '/chart/moviemeter',
            top_rated_movies: '/chart/top'
        },
        sort: {
            rating: `ir`,
            date: 'us',
            place: 'rk'
        },
        dir: {
            desc: `desc`,
            asc: `asc`
        }
    },
    boxoffice: '/chart/boxoffice'
};