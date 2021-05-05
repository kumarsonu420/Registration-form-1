const express = require("express")
const app= express();
const path= require("path")
const hbs =require("hbs")
require("./db/conn")
const Register= require("./models/registers");
const bcrypt = require("bcryptjs");

app.use(express.json());
app.use(express.urlencoded({extended:false}))

const port = process.env.PORT || 8000
const static_path=(path.join(__dirname,"../public"))
const template_path=(path.join(__dirname,"../templete/views"))
const partial_path=(path.join(__dirname,"../templete/partials"))

app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials(partial_path)

app.get("/",(req,res)=>
{
    res.render("index")
})

app.get("/register",(req,res)=>
{
    res.render("register")
})

app.get("/login",(req,res) =>{
    res.render("login")
})

//crearte a new user in our database

app.post("/register",async(req,res) =>{
    try{
        const password = req.body.password
        const cpassword= req.body.confirmpassword;
        if(password === cpassword)
        {
            const registrationStudent= new Register({
                name: req.body.name,
                email: req.body.email,
                password:password,
                confirmpassword:cpassword,                
            })
            console.log(registrationStudent.save());
            res.status(201).render("index")
        }else{
            console.log(res.send("Password not matcp"));
        }
    }catch(e)
    {
        res.status(400).send(e)
    }
})

//login check

app.post("/login",async(req, res)=>{
    try{
        const email= req.body.email;
        const password = req.body.password;

        const useremail = await Register.findOne({email:email});
    
//hasing of login 

        const isMatch= await bcrypt.compare(password, useremail.password)
        
       if(isMatch)
       {
           res.status(201).render("index");
       }else{
           res.send("password not match")
       }
    }catch(error)
    {
        res.status(400).send("invaild")
    }
})

app.listen(port,() =>{
    console.log(`server side ${port}`)
})