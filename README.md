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
  <p><b>GET `/charts/:type/:sort/:dir/:quantity`</b> - show trending movies.</p>
  <p>Example: `http://localhost:3002/charts/most_popular_tv/rating/desc/100`</p>
    <table>
		<th>
			<td>Parameter</td>
			<td>Allowed options/format</td>
		</th>
		<tr>
			<td>type</td>
			<td>'most_popular_tv', 'top_rated_tv', 'most_popular_movies', 'top_rated_movies'</td>
		</tr>
		<tr>
			<td>sort</td>
			<td>'rating', 'date', 'place'</td>
		</tr>
		<tr>
			<td>dir</td>
			<td>'asc', 'desc'</td>
		</tr>
		<tr>
			<td>quantity</td>
			<td>type: integer</td>
		</tr>
  </table>
</li>
<li>
  <p><b>GET `/actor/:name`</b> - show actor information by actor name.</p>
  <p>Example: `http://localhost:3002/actor/Tom Hanks`</p>
</li>
<li>
  <p><b>GET `/genre/:name/:quantity`</b> - show trending movies in mentioned genre.</p>
  <p>Example: `http://localhost:3002/genre/comedy/100`</p>
</li>
<li>
  <p><b>GET `/film/basic/:id`</b> - show basic film metadata like genre, runtime, plot etc.</p>
  <p>Example: `http://localhost:3002/film/basic/tt1727824`</p>
</li>
<li>
  <p><b>GET `/film/full/:id`</b> - show full film metadata.</p>
  <p>Example: `http://localhost:3002/film/full/tt1727824`</p>
</li>
<li>
  <p><b>GET `/film/awards/:id`</b> - show list of awards won by the movie.</p>
  <p>Example: `http://localhost:3002/film/basic/tt1727824`</p>
</li>
</ul>
