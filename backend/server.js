const app=require("./app")
const dotenv = require("dotenv")

//Handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log("Shutting down the server due to uncaught exception");
    process.exit(1);
})


dotenv.config({path:"backend/config/config.env"})
require("./database/connection");


//Hanlding the Unhandled Promise Rejection error
// process.on("unhandledRejection",(err)=>{
//     console.log(`Error : ${err.message}`);
//     console.log("Shutting down the server due to unhandled Promise Rejection");

//     server.close(()=>{
//         process.exit(1);
//     })
// })

app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})