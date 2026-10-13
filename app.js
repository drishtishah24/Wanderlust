const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");


const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}

app.get("/",(req,res)=>{
    res.send("Hii i m root");
});


app.listen(port, () => {
    console.log("Server is running on port", port);
});