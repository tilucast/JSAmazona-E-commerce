import { IUserSchema, UserInterface } from "../models/UserInterface";

export default {
    render({_id, name, email, isAdmin}: IUserSchema){
        return { 
            _id, name, email, isAdmin
        }
    },

    renderMany(users: IUserSchema[]){
        return users.map(user => this.render(user))
    }
}