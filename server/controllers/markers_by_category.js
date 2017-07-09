import fetch from 'node-fetch';
import config from '../config';

export default {
    findMarkers: function (req, res, next) {
        const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
        const key = config.google_api;
        const location = `${req.body.center[0]},${req.body.center[1]}`;
        const rankby = "distance";
        const type = req.body.category;

        const finalUrl = `${url}?key=${key}&location=${location}&rankby=${rankby}&type=${type}`;

        console.log(finalUrl);
        fetch( finalUrl, {
            method: 'get'
        }).then( response => {
            if(response.status === 200){
                response.json().then( data => {
                    res.send(data);
                });
            } else {
                res.status(500).end();
            }
        });

    }
}