import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'

interface ENVProps{
    MONGODB_URL: string,
    JWT_SECRET: Secret
}

dotenv.config()

export default<ENVProps> {
    MONGODB_URL: process.env.MONGODB_URL !!,
    JWT_SECRET: process.env.JWT_SECRET
}