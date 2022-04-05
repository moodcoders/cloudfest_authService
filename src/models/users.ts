import { Schema, model } from 'mongoose';

const providerSchema: Schema = new Schema({
    name: {
        type: String,
        enum: [
            "GOOGLE",
            "MOBILE"
        ],
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    data: Object
});

providerSchema.index({ name: 1, uid: 1 }, { unique: true })

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

const customerSchema: Schema = new Schema({
    name: {
        type: String,
    },
    gender: {
        type: String,
        enum: [
            "MALE",
            "FEMALE",
            "TRANSGENDER"
        ]
    },
    isDisabled: {
        type: Boolean,
        default: false
    },
    email: String,
    DOB: Date,
    mobile: String,
    addresses: [addressSchema],
    providers: {
        type: [providerSchema],
        required: true
    }
});

export default model('customer', customerSchema);