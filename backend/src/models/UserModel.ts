import mongoose, {Schema} from 'mongoose'
import { IUserSchema } from './UserInterface'


const UserSchema: Schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, index: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true, default: false}
})

const UserModel = mongoose.model<IUserSchema>('User', UserSchema)

export default UserModel