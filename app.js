const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const Listing= require("./models/listings.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate"); //helps to create layout like includes/partials
const wrapAsync = require("./utils/wrapAsync");
const ExpressError=require("./utils/ExpressError");
const listingSchema = require("./schema.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const validateListing= (req,res,next) =>{
    const error=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map(el)= el.message.joi(",");
        throw new ExpressError(400,errMsg);
    }
    next();
}

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
app.get("/Listings",wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("Listings/index.ejs",{allListings});
}));
//New route
app.get("/Listings/new",(req,res)=>{
    res.render("Listings/new.ejs");
});

//Show Route
app.get("/Listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("Listings/show.ejs",{Listing: listing});
}));

//create route
app.post("/Listings",validateListing,wrapAsync(async(req,res)=>{
    
    // let {title,description, image, price, location, country}=req.body;
    const newListing=new Listing(req.body.Listing);
    
    await newListing.save();
    res.redirect("/Listings");
}));

app.get("/Listings/:id/edit",wrapAsync(async(req,res)=>{
     let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("Listings/edit.ejs",{Listing: listing});
}));

//update route
app.put("/Listings/:id",validateListing,wrapAsync(async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/Listings/${id}`);
}));

app.delete("/Listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/Listings");
}));

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

app.all("*path",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong"}=err;
    res.status(statusCode).render("error.ejs",{err});
    // res.status(statusCode).send(message);
})


app.listen(port, () => {
    console.log("Server is running on port", port);
});