import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
        },
        lastname: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be at least 6 characters long"],
        select: false, // Do not return password in queries by default.
    },
    socketId: {
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [3, "Color must be at least 3 characters long"],
        },
        plate: {
            type: String,
            required: true,
            unique: true,
            minlength: [3, "Plate number must be at least 3 characters long"],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, "Capacity must be at least 1 person"],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'bike', 'auto'],
        },
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
        }
    }
});

captainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Token expires in 1 day
    });
    return token;
};  

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};      

captainSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};  

export default mongoose.model('Captain', captainSchema);