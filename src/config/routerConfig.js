import userRouter from "../router/user.routes.js";
import chatRouter from "../router/chat.routes.js";
import sessionRouter from "../router/session.routes.js";
import viewsRouter from "../router/views.routes.js";
import cartRouter from "../router/cart.routes.js"
import productRouter from "../router/product.routes.js"
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./docConfig.js";

function routerConfig(app){
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
    app.use('/chat', chatRouter)
    app.use('/', viewsRouter)
    app.use('/api/sessions', sessionRouter)
    app.use('/api/session', sessionRouter)
    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);
    app.use('/', userRouter);
    app.use('/api/user', userRouter)
    app.use('/api/users', userRouter)
}

export default routerConfig