import {Request, Response, Router} from 'express'
import UserController from './controllers/UserController'
import {data} from './data'
import isAuth from './middlewares/isAuth'

const userController = new UserController()

const router = Router()

router.get("/api/products", (request: Request, response: Response) => {
    return response.json(data)
})

router.get("/api/products/:id", (request: Request, response: Response) => {
    
        const result = data.find(product => product._id === Number(request.params.id))

        if(result) return response.status(200).json(result)

        return response.status(404).json({message: 'Product not found'})
    
})

router.get("/api/find-user", userController.index)

router.get("/api/find-users", userController.show)

router.post("/api/create-user", userController.create)

router.put("/api/update-user/:_id", isAuth, userController.update)

router.post("/api/user-signin", userController.signin)

export default router