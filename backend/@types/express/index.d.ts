import {UserInterface} from '../../src/models/UserInterface'

declare global{
    namespace Express {
        interface Request {
            user: UserInterface | string | object
        }
    }
}