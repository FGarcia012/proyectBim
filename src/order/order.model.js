import { Schema, model } from "mongoose";

const orderSchema = Schema({
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
                required: true 
            }
        }
    ],
    total: { 
        type: Number, 
        required: true 
    },
    status: { 
        type: String, 
        default: 'completed' 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
},
{
    versionKey: false,
    timestamps: true
});

orderSchema.methods.toJSON = function(){
    const {__v, createdAt, _id, ...order} = this.toObject()
    order.oid = _id
    return order
}

export default model('Order', orderSchema)