const videoAllowedTypes = {
    level: ['full'],
};

interface VideoOptions {
    id: string,
    level: 'full'
}

interface Video {
    title: string,
    rating: string,
    poster: string,
    runtime: string,
    year: number,
    story: string,
    genres: string[],
    director: string[],
    writers: string[],
    stars: string[],
    similar: []
}

export {videoAllowedTypes, VideoOptions, Video};