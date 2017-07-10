import express from 'express';
import http from 'http';
import bodyParcer from 'body-parser';
import morgan from 'morgan';
import router from './router';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

mongoose.Promise = global.Promise;

const db = process.env.MONGO_CONNECTION || config.mongo_connection;
mongoose.connect(db, (err) => {
    if (err) {
        console.log(`===>  Error connecting to ${db}`);
        console.log(`Reason: ${err}`);
    } else {
        console.log(`===>  Succeeded in connecting to ${db}`);
    }
});

const app = express();

app.use( morgan('combined') );
app.use( cors() );
app.use( bodyParcer.json({type: '*/*'}) );

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port '+port);
