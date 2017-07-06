import Markers from '../models/markers';

export default {
    
    saveMarkers: function (req, res, next) {
        const email = req.user.email;
        console.log(req.body.markers, req.user.email);

        Markers.findOne({ email: email}, (err, markers)=>{
            if (err) { return next(err); }

            const markersData = {
                email: email,
                markers: req.body.markers
            };

            console.log(markers);
            if (! markers) {
                markers = new Markers(markersData);
                markers.save( (err) => {
                    if (err) { return next(err); }
                });
            } else {
                Markers.update({ email: email}, markersData, (err) => {
                    if (err) { return next(err); }
                });
            }

            res.send({ message: 'OK'});

        });
    }
    
}