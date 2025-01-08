const asyncHander = (requestHandler) =>{
    return (req,resp,next) =>{
        Promise.resolve(requestHandler(req,resp,next)).catch((error)=>next(error))
    }

}
export {asyncHander}