import Markers from '../models/markers';

export default {
    
    saveMarkers: function (req, res, next) {
        const email = req.user.email;
        const markers = req.body.markers;
        //console.log(markers, email);

        Markers.findOne({ email: email}, (err, doc)=>{
            if (err) { return next(err); }

            if ( doc ) {
                doc.markers = markers;
            } else {
                doc = new Markers({ email, markers });
            }

            doc.save( (err) => {
                if (err) { return next(err); }
                res.status(200).send({ message: 'OK'});
            });

        });
    },

    fetchMarkers: function (req, res, next) {
        const email = req.user.email;

        Markers.findOne({ email: email}, (err, docs)=> {
            if (err) { return next(err); }

            res.status(200).send( docs );
        })
    }
    
}