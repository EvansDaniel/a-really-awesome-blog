const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 14;

// TODO: DeprecationWarning: Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: {unique: true},
        trim: true
    },
    biography: {
        type: Object,
        trim: true,
    },
    photograph: {
        type: String,
        trim: true
    },
    password: {type: String, required: true}
}, {
    timestamps: true
});

// TODO: add something similar for update
// http://mongoosejs.com/docs/api.html#model_Model.update
UserSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            return next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;