# imdb-node-middleware-rest-api
RESTful API middeware for parsing data from IMDb

Setup:
1. Clone repo
2. Run `npm install` and wait until dependencies will be installed
3. Run `node index.js`.
4. Use API

API Interface:
`/trend-films/:quantity` - show trending movies. Example: `http://localhost:3002/trend-films/100`
`/film/:id` - show basic film metadata like genre, runtime, plot etc. Example: `http://localhost:3002/film/tt1727824`