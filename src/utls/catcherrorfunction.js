 const asyncHandelr =(fun)=>{
    return async (req,res,next)=>{

        return fun(req,res,next).catch((err)=> res.json(err))
    }
}
export default asyncHandelr;