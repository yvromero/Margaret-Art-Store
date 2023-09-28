import { IUser} from '@/interfaces';
import mongoose, { Schema, model, Model }from 'mongoose';

const userSchema = new Schema({

    name    : { type: String, required: true },
    email   : { type: String, required: true, unique: true },
    password: { type: String, requiered: true },
    role: {
        type: String,
        enum: {
            values: ['admin', 'cliente'],
            message: '{VALUE} no es un rol permitido',
            default: 'client',
            required: true
        }
    }
}, {
    timestamps: true,
})


// Definir el modelo

const User:Model<IUser> = mongoose.models.User || model('User',userSchema);

export default User;