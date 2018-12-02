import express = require('express');
const app = express();

import { router as videoRoutes } from './routes/video-routes'
import { router as chartsRoutes } from './routes/charts-routes';
import { router as genreListRoutes } from './routes/genre-list-routes';
/*const actorRoutes = require('./api/actor')
const genreRoutes = require('./api/genre')*/

app.use(
    (
        req: express.Request,
        res: express.Response,
        next
    ) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
);

app.use('/video', videoRoutes);
app.use('/charts', chartsRoutes);
app.use('/genre-list', genreListRoutes);
/*app.use('/actor', actorRoutes);*/
/*app.use('/genre', genreRoutes);*/

app.listen(3002, () => console.log("Listening on port 3002"));

