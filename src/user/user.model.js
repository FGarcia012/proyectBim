import { model, Schema } from "mongoose"

const userSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, 'Name cannot exceed 25 characters']
    },
    surname:{
        type: String,
        required: [true, 'Surname is required'],
        maxLength: [25, 'Surname cannot exceed 25 characters']
    },
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'The password must contain a minimum length of 8 characters, one lowercase letter, one uppercase letter, one number and one symbol.'],
    },
    profilePicture:{
        type: String,
    },
    phone:{
        type: String,
        minLength: 8,
        maxLength: 8,
        requierd: true
    },
    role:{
        type: String,
        default: 'USER',
        enum: ['USER', 'ADMIN']
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

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)