import Authentication from './controllers/authentication';
import passortService from './services/passport';
import passport from 'passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default function ( app ) {

    app.get( '/', requireAuth, (req, res)=>{
        res.send({ message: 'Some protected message'});
    });

    app.get( '/check_token', requireAuth, (req, res)=>{ res.send({ message: 'OK'}); });
    app.post( '/signin', requireSignin, Authentication.signin );
    app.post( '/signup', Authentication.signup );
}