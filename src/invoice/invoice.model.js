import { Schema, model } from "mongoose";

const invoiceSchema = Schema({
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
    ],
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
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

invoiceSchema.methods.toJSON = function() {
    const { __v, _id, ...invoice } = this.toObject();
    invoice.iid = _id;
    return invoice;
};

export default model('Invoice', invoiceSchema);