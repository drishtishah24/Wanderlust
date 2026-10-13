const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Listing= require("./models/listings.js");
const path=require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));

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

//Index Route
app.get("/Listings",async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("Listings/index.ejs",{allListings});
});
//New route
app.get("/Listings/new",(req,res)=>{
    res.render("Listings/new.ejs");
});

//Show Route
app.get("/Listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("Listings/show.ejs",{Listing: listing});
});



// app.get("/testlisting",async(req,res)=>{
//     let sampleListing=new Listing({
//         title: "My new villa",
//         description:"by the beach",
//         price: 2000,
//         location: "calangute, goa",
//         country: "India"
//     });
//     await sampleListing.save();
//     res.send("sample listing saved");
// });



app.listen(port, () => {
    console.log("Server is running on port", port);
});