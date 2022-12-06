const mongoose = require("mongoose");

const connection = async ()=>{
    try {
      await mongoose.connect(process.env.DB_URI);
      console.log('database connected successfully');
    } catch (error) {
      console.log(error);
    }
  }
  connection();
  