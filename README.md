# imdb-node-middleware-rest-api
<h3>RESTful API middeware for parsing data from IMDb</h3>

<h3>Setup:</h3>
<ul>
  <li>Clone repo</li>
  <li>Run <b>npm install</b> and wait until dependencies will be installed</li>
  <li>Run <b>node index.js</b></li>
  <li>Use API</li>
</ul>

<h3>API Interface:</h3>
<ul>
<li>
  <p>GET `/trend-films/:quantity` - show trending movies.</p>
  <p>Example: `http://localhost:3002/trend-films/100`</p>
</li>
<li>
  <p>GET `/actor/by-name/:name` - show actor information by actor name.</p>
  <p>Example: `http://localhost:3002/actor/by-name/Tom Hanks`</p>
</li>
<li>
  <p>GET `/genre/:name/:quantity` - show trending movies in mentioned genre.</p>
  <p>Example: `http://localhost:3002/genre/comedy/100`</p>
</li>
<li>
  <p>GET `/film/basic/:id` - show basic film metadata like genre, runtime, plot etc.</p>
  <p>Example: `http://localhost:3002/film/basic/tt1727824`</p>
</li>
<li>
  <p>GET `/film/full/:id` - show full film metadata.</p>
  <p>Example: `http://localhost:3002/film/full/tt1727824`</p>
</li>
<li>
  <p>GET `/film/awards/:id` - show list of awards won by the movie.</p>
  <p>Example: `http://localhost:3002/film/basic/tt1727824`</p>
</li>
</ul>
