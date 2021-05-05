const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/mernform",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() =>
{
    console.log("Connection success");
}).catch((e) =>
{
    console.log("No Connection")
})
