import { model, Schema } from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, 'Name cannot exceed 25 characters']
    },
    description:{
        type: String,
        required: [true, 'Description is required'],
        maxLength: [255, 'Description cannot exceed 255 characters']
    },
    price:{
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: [true, 'Category is required']
    },
    image:{
        type: String,
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
   versionKey: false,
   timestamps: true
})

productSchema.methods.toJSON = function(){
   const {__v, _id, ...producto} = this.toObject()
   producto.pid = _id
   return producto
}

export default model("Product", productSchema)