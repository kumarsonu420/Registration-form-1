const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")


const studentSchema= new mongoose.Schema({

        name:{
        type:"string",
        require: true
    },
    
    email:{
        type:"string",
        require: true
    },

    password:{
        type:"string",
        require: true
    },
    confirmpassword:{
        type:"string",
        require: true
    },
})

//Hashing password 

studentSchema.pre("save", async function(next)
{
    if(this.isModified("password"))
    {
        console.log(`this is current password is ${this.password}`)
        this.password = await bcrypt.hash(this.password,10)
        console.log(`this is current passwordis ${this.password}`)

        //cpassword is undefined because of it should not shown on database
        this.confirmpassword= undefined
    }
    next();
})

//create collection

const Register = new mongoose.model("Register",studentSchema)
module.exports = Register;
 