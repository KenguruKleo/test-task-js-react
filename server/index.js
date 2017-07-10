import express from 'express';
import http from 'http';
import bodyParcer from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost/site_db', {
//mongoose.connect('mongodb://192.168.99.100/site_db', {
mongoose.connect(config.mongo_connection, {
    useMongoClient: true,
}).then( db => {} );

const app = express();

app.use( morgan('combined') );
app.use( cors() );
app.use( bodyParcer.json({type: '*/*'}) );

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port '+port);
