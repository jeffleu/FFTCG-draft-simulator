import express from 'express';
import path from 'path';
import webpack from 'webpack';
import config from '../../webpack.config';
import { getCardData } from './controllers/apiController';

const app = express();
const port = 3000;

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  path: config.output.path
}));
app.use(require('webpack-hot-middleware')(compiler));

// Render static index route
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.get('/getCardData', getCardData);

app.listen(port, () => { console.log(`server.js has been served on port: ${port}`); });
