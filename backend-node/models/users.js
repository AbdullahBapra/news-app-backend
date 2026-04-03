import moongose from 'mongoose';

const userSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        default: null   
    },
    otpExpires: {
        type: Date,
        default: null
    },
    intrests: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

const User = moongose.model('User', userSchema);
export default User;