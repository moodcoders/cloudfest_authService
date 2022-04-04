import { Schema, model } from "mongoose";

const experienceSchema: Schema = new Schema({
    yearsOfExperience: {
        type: Number
    }
})

const serviceSchema: Schema = new Schema({
    name: {
        type: String,
    },
    uid: {
        type: String
    },
    experience: [experienceSchema]
})

const addressSchema: Schema = new Schema({
    street: String,
    houseNo: String,
    pincode: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    tag: {
        type: String
    }
});

const handymanSchema: Schema = new Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    gender: {
        type: String,
        enum: [
            "MALE",
            "FEMALE",
            "OTHERS"
        ]
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    email: String,
    DOB: String,
    mobile: String,
    price: Number,
    rating: Number,
    addresses: [addressSchema],
    providedServices: [serviceSchema],
    isVerified: {
        type: Boolean,
        default: false
    },
})

export default model('handyman', handymanSchema)