import mongoose from 'mongoose';
import { Schema } from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Define our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
});

//On save Hook, encrypt password
userSchema.pre('save', function(next) {
   const user = this;

   bcrypt.genSalt( 10, (err, salt)=>{
       if (err) { return next(err); }

       bcrypt.hash( user.password, salt, null, (err, hash)=>{
           if (err) { return next(err); }

           user.password = hash;
           next();
       })
   });
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) { return callback(err) }

        callback(null, isMatch);
    })
};

// Create the model class
const modelUser = mongoose.model('user', userSchema);

// Export the model
export default modelUser;
