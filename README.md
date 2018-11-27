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
    <p>Request parameters:</p>
    <table>
		<tr>
			<th>Parameter</th>
			<th>Allowed options/format</th>
		</tr>
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
	<p>Response: array of film-short-data objects.</p>
	<p>film-short-data object:</p>
    <table>
		<tr>
			<th>Field</th>
			<th>Type</th>
			<th>Example</th>
		</tr>
		<tr>
			<td>name</td>
			<td>mandatory</td>
			<td>Fantastic Beasts: The Crimes of Grindelwald</td>
		</tr>
		<tr>
			<td>poster</td>
			<td>mandatory</td>
			<td>https://m.media-amazon.com/images/M/MV5BZjFiMGUzMTAtNDAwMC00ZjRhLTk0OTUtMmJiMzM5ZmVjODQxXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_QL50.jpg</td>
		</tr>
		<tr>
			<td>id</td>
			<td>mandatory</td>
			<td>tt4123430</td>
		</tr>
		<tr>
			<td>year</td>
			<td>mandatory</td>
			<td>2018</td>
		</tr>	    
		<tr>
			<td>stars</td>
			<td>mandatory</td>
			<td>David Yates (dir.), Eddie Redmayne, Katherine Waterston</td>
		</tr>		
		<tr>
			<td>place</td>
			<td>mandatory</td>
			<td>1</td>
		</tr>		
		<tr>
			<td>usersRatingBased</td>
			<td>optional</td>
			<td>60,813</td>
		</tr>
		<tr>
			<td>rating</td>
			<td>optional</td>
			<td>7.0</td>
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
