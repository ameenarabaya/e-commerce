import express from 'express';
import 'dotenv/config'
import initApp from './src/initApp.js';
const app = express();
initApp(app,express);
const PORT  = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`success connected at ${PORT}`)
})