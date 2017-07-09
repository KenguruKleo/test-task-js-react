import Authentication from './controllers/authentication';
import Markers from './controllers/markers';
import MarkersByCategory from './controllers/markers_by_category';
import passortService from './services/passport';
import passport from 'passport';

//const requireAuth = passport.authenticate('jwt', { session: false });
const requireAuth = passport.authenticate('basic', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default function ( app ) {

    app.get( '/', requireAuth, (req, res)=>{
        res.send({ message: 'Some protected message'});
    });

    app.get( '/check_token', requireAuth, (req, res)=>{ res.send({ message: 'OK'}); });
    app.post( '/signin', requireSignin, Authentication.signin );
    app.post( '/signup', Authentication.signup );

    app.post( '/markers', requireAuth, Markers.saveMarkers );
    app.get( '/markers', requireAuth, Markers.fetchMarkers );

    app.post( '/markers_by_category', requireAuth, MarkersByCategory.findMarkers );
}