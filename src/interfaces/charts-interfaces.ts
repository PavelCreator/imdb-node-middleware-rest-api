const chartsAllowedTypes = {
    type: ['most_popular_tv', 'top_rated_tv', 'most_popular_movies', 'top_rated_movies'],
    sort: ['rating', 'date', 'place'],
    dir: ['asc', 'desc']
}

interface ChartsOptions {
    type: 'most_popular_tv' | 'top_rated_tv' | 'most_popular_movies' | 'top_rated_movies',
    sort: 'rating' | 'date' | 'place',
    dir: 'asc' | 'desc',
    quantity: number
}

interface ChartFilm {
    name: string,
    poster: string,
    id: number,
    year: number,
    stars: string
    place?: string,
    usersRatingBased?: string,
    rating?: string
}

export { chartsAllowedTypes, ChartsOptions, ChartFilm };