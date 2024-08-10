import connection from "../DB/connection.js";
import cors from 'cors' ;
import categoryRouter from './modules/categories/categories.router.js';
import UserRouter from './modules/user/user.router.js';
import subCategoryRouter from './modules/subCategory/subcategory.router.js';
import productRouter from './modules/product/product.router.js';
import cartRouter from './modules/cart/cart.router.js';
import orderRouter from './modules/order/order.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import authRouter from './modules/auth/auth.router.js';
import reviewRouter from './modules/review/review.router.js';
const initApp = (app,express)=>{
    connection();
    app.use(cors());
    app.use(express.json());
app.get('/',(req,res)=>{
    return res.status(200).json({message:"success"});
})
app.use('/auth',authRouter);
app.use('/subCategory',subCategoryRouter)
app.use('/category',categoryRouter);
app.use('/user',UserRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.use('/order',orderRouter);
app.use('/coupon',couponRouter);
app.use('/review',reviewRouter);
app.use('*',(req,res)=>{
    return res.status(404).json({message:"page not found"})
})
app.use((err,req,res,next)=>{
     res.status(err.statusCode).json({message:err.message})
})
}
export default initApp;
