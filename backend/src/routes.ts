import {Router} from 'express'
import OrderController from './controllers/OrderController'
import ProductsController from './controllers/ProductsController'
import UserController from './controllers/UserController'
import isAuth from './middlewares/isAuth'
import uploadConfig from './config/upload'
import multer from 'multer'

const userController = new UserController()
const orderController = new OrderController()
const productsController = new ProductsController()

const router = Router()
const upload = multer(uploadConfig)

router.post("/api/product", upload.single('path'), productsController.create)
router.get("/api/products", productsController.index)
router.get("/api/products/:id", productsController.show)
router.delete("/api/products/:_id", isAuth, productsController.delete)
router.put("/api/products/:_id", productsController.update)

router.get("/api/find-user", userController.index)
router.get("/api/find-users", userController.show)
router.post("/api/create-user", userController.create)
router.put("/api/update-user/:_id", isAuth, userController.update)

router.post("/api/user-signin", userController.signin)

router.post("/api/orders", isAuth, orderController.create)
router.put("/api/orders/:_id", isAuth, orderController.update)
router.get("/api/orders", isAuth, orderController.show)
router.get("/api/orders/all", isAuth, orderController.getOrders)
router.get("/api/orders/:id", isAuth, orderController.index)
router.get("/api/orders/paypal/clientId", isAuth, orderController.paypal)

export default router