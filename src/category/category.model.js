import { Schema, model } from "mongoose"

const categorySchema = Schema ({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    }
},
{
    versionKey: false,
    timestamps: true
})

categorySchema.methods.toJSON = function(){
    const {__v, name, _id, ...category} = this.toObject()
    category.cid = category._id
    return category
}

export default model("Category", categorySchema)