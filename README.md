# imdb-node-middleware-rest-api
<h3>RESTful API middeware for parsing data from IMDb</h3>

<h3>Setup:</h3>
<ul>
  <li>Clone repo</li>
  <li>Run `npm install` and wait until dependencies will be installed</li>
  <li>Run `node index.js`.</li>
  <li>Use API</li>
</ul>

<h3>API Interface:</h3>
  <li>`/trend-films/:quantity` - show trending movies. Example: `http://localhost:3002/trend-films/100`</li>
  <li>`/film/:id` - show basic film metadata like genre, runtime, plot etc. Example: `http://localhost:3002/film/tt1727824`</li>
</ul>
