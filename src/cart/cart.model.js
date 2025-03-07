import { Schema, model } from "mongoose";

const cartSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
},
{
    versionKey: false,
    timestamps: true
})

cartSchema.methods.toJSON = function(){
    const {__v, _id, ...cart} = this.toObject()
    cart.ccid = cart._id
    return cart
}

export default model('Cart', cartSchema);