import express from 'express';
import path from 'path';
import webpack from 'webpack';
import config from '../../webpack.config';

const app = express();
const port = 3000;

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
  path: config.output.path
}));
app.use(require('webpack-hot-middleware')(compiler));

// Render static index route
app.use(express.static(path.join(__dirname, '../client')));

app.listen(port, () => { console.log(`server.js has been served on port: ${port}`); });
