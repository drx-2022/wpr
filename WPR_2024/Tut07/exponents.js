const express = require('express')
const app = express()

app.get("/math/power/:base/:exponents",(req,res)=>{
    const base = parseFloat(req.params.base)
    const exponents = parseFloat(req.params.exponents)

    const result = Math.pow(base,exponents)
    const response = {'result': result}

    if(req.query.root){
        const root = Math.sqrt(base)
        response.root = root
    }
    res.json(response)
})
const PORT = 8000
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})