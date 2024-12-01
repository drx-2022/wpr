const fs = require('fs')
const express = require("express");
const app = express();

const multer = require("multer");
// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

const PORT = 3000

app.use(express.static('public'));

function readUser(){
    const data = fs.readFileSync('users.json')
    return JSON.parse(data)
}

app.post("/login",(req,res)=>{

    const {user, password} = req.body
    console.log(user);
    console.log(password);

    const usersData = readUser()

    const foundUser = usersData.find(u => u.username === user && u.password === password)

    if(foundUser){
        res.send('Login successful')
    }else{
        res.send('Invalid username or password')
    }
})


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})