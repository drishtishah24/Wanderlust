const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title: {
        type: String,
        required: true},
    description: String,
    image: {
        filename: String,url: {
        type:String,
        //for undefined used ->default when intially data saved in db from developer side
      default: "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
            set: (v) => (!v || v === "") ? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60" : v,  //ternary operation
    }
},
    price: Number,
    location: String,
    country: String

});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;