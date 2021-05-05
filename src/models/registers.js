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

// studentSchema.pre("save", async function(next)
// {
//     if(this.isModified("Password"))
//     {
//         console.log(`this is current password is ${this.Password}`)
//         this.Password = await bcrypt.hash(this.Password,10)
//         console.log(`this is current password is ${this.Password}`)
//     }
//     next();
// })

//create collection

const Register = new mongoose.model("Register",studentSchema)
module.exports = Register;
 